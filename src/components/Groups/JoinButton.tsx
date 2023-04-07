import { styled } from "@mui/material";
import produce from "immer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  MemberRequestDocument,
  MemberRequestQuery,
  MemberRequestQueryVariables,
  MemberRequestsDocument,
  MemberRequestsQuery,
  MemberRequestsQueryVariables,
  useCancelMemberRequestMutation,
  useCreateMemberRequestMutation,
  useLeaveGroupMutation,
  useMemberRequestQuery,
} from "../../apollo/gen";
import { TypeNames } from "../../constants/common.constants";
import GhostButton from "../Shared/GhostButton";

const Button = styled(GhostButton)(() => ({
  marginRight: 8,
  minWidth: 80,
}));

interface Props {
  groupId: number;
  currentMemberId?: number;
}

const JoinButton = ({ groupId, currentMemberId }: Props) => {
  const { data, loading } = useMemberRequestQuery({
    variables: { groupId },
  });
  const [createMemberRequest, { loading: createLoading }] =
    useCreateMemberRequestMutation();
  const [cancelMemberRequest, { loading: cancelLoading }] =
    useCancelMemberRequestMutation();
  const [leaveGroup, { loading: leaveGroupLoading }] = useLeaveGroupMutation();
  const [isHovering, setIsHovering] = useState(false);

  const { t } = useTranslation();

  if (!data) {
    return <Button disabled>{t("groups.actions.join")}</Button>;
  }

  const { memberRequest } = data;

  const getButtonText = () => {
    if (currentMemberId) {
      if (isHovering) {
        return t("groups.actions.leave");
      }
      return t("groups.labels.joined");
    }
    if (!memberRequest) {
      return t("groups.actions.join");
    }
    return t("groups.actions.cancelRequest");
  };

  const handleJoin = async () =>
    await createMemberRequest({
      variables: { groupId },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          createMemberRequest: { memberRequest },
        } = data;
        cache.writeQuery<MemberRequestQuery, MemberRequestQueryVariables>({
          query: MemberRequestDocument,
          variables: { groupId },
          data: { memberRequest },
        });
        cache.updateQuery<MemberRequestsQuery, MemberRequestsQueryVariables>(
          {
            query: MemberRequestsDocument,
            variables: {
              groupName: memberRequest.group.name,
            },
          },
          (memberRequestsData) =>
            produce(memberRequestsData, (draft) => {
              draft?.group.memberRequests?.unshift(memberRequest);
            })
        );
        cache.modify({
          id: cache.identify(memberRequest.group),
          fields: {
            memberRequestCount(existingCount: number) {
              return existingCount + 1;
            },
          },
        });
      },
    });

  const handleCancelRequest = async (id: number) =>
    await cancelMemberRequest({
      variables: { id },
      update(cache) {
        cache.writeQuery<MemberRequestQuery, MemberRequestQueryVariables>({
          query: MemberRequestDocument,
          variables: { groupId },
          data: { memberRequest: null },
        });
        cache.evict({
          id: cache.identify({ id, __typename: TypeNames.MemberRequest }),
        });
        cache.gc();
      },
    });

  const handleLeave = async () =>
    await leaveGroup({
      variables: { id: groupId },
      update(cache) {
        cache.writeQuery<MemberRequestQuery, MemberRequestQueryVariables>({
          query: MemberRequestDocument,
          variables: { groupId },
          data: { memberRequest: null },
        });
        cache.modify({
          id: cache.identify({ id: groupId, __typename: TypeNames.Group }),
          fields: {
            memberCount(existingCount: number) {
              return existingCount - 1;
            },
          },
        });
      },
    });

  const handleButtonClick = async () => {
    try {
      if (currentMemberId) {
        await handleLeave();
        return;
      }
      if (!memberRequest) {
        await handleJoin();
        return;
      }
      await handleCancelRequest(memberRequest.id);
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
    }
  };

  const handleButtonClickWithConfirm = () =>
    window.confirm(t("groups.prompts.confirmLeave")) && handleButtonClick();

  return (
    <Button
      disabled={cancelLoading || createLoading || leaveGroupLoading || loading}
      onClick={
        currentMemberId ? handleButtonClickWithConfirm : handleButtonClick
      }
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {getButtonText()}
    </Button>
  );
};

export default JoinButton;
