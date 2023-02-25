import {
  Box,
  Card,
  CardContent as MuiCardContent,
  CardHeader as MuiCardHeader,
  CardProps,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  ProposalCardFragment,
  useDeleteProposalMutation,
  useMeQuery,
} from "../../apollo/gen";
import {
  MIDDOT_WITH_SPACES,
  NavigationPaths,
} from "../../constants/common.constants";
import { ProposalActionTypes } from "../../constants/proposal.constants";
import { redirectTo } from "../../utils/common.utils";
import { getGroupPath } from "../../utils/group.utils";
import { getProposalActionLabel } from "../../utils/proposal.utils";
import { timeAgo } from "../../utils/time.utils";
import { getUserProfilePath } from "../../utils/user.utils";
import GroupItemAvatar from "../Groups/GroupItemAvatar";
import AttachedImage from "../Images/AttachedImage";
import AttachedImageList from "../Images/AttachedImageList";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";
import { removeProposal } from "./DeleteProposalButton";
import ProposalCardFooter from "./ProposalCardFooter";

const CardHeader = styled(MuiCardHeader)(() => ({
  paddingBottom: 0,
  "& .MuiCardHeader-avatar": {
    marginRight: 11,
  },
  "& .MuiCardHeader-title": {
    fontSize: 15,
  },
}));

const CardContent = styled(MuiCardContent)(() => ({
  paddingBottom: 0,
  "&:last-child": {
    paddingBottom: 0,
  },
}));

interface Props extends CardProps {
  proposal: ProposalCardFragment;
}

const ProposalCard = ({ proposal, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const [deleteProposal] = useDeleteProposalMutation();
  const { data } = useMeQuery();

  const { asPath } = useRouter();
  const { t } = useTranslation();

  const {
    action: { actionType, groupDescription, groupName, groupCoverPhoto },
    body,
    createdAt,
    group,
    id,
    images,
    user,
    voteCount,
  } = proposal;

  const me = data && data.me;
  const isMe = me?.id === user.id;
  const formattedDate = timeAgo(createdAt);

  const groupPath = getGroupPath(group?.name || "");
  const isGroupPage = asPath.includes(NavigationPaths.Groups);
  const isProposalPage = asPath.includes(NavigationPaths.Proposals);
  const proposalPath = `${NavigationPaths.Proposals}/${id}`;
  const userProfilePath = getUserProfilePath(user?.name);

  const bodyStyles = {
    marginBottom:
      groupName || groupDescription || groupCoverPhoto || images.length
        ? 2.5
        : 3.5,
  };
  const cardContentStyles = {
    paddingTop: images.length && !body ? 2.5 : 3,
  };
  const imageListStyles = {
    marginBottom: me ? 1.9 : 0,
  };

  const handleDelete = async (id: number) => {
    if (isProposalPage) {
      await redirectTo(NavigationPaths.Home);
    }
    await deleteProposal({
      variables: { id },
      update: removeProposal(id),
      onError(err) {
        toastVar({
          status: "error",
          title: err.message,
        });
      },
    });
  };

  const renderAvatar = () => {
    if (group && !isGroupPage) {
      return <GroupItemAvatar user={user} group={group} />;
    }
    return <UserAvatar user={user} withLink />;
  };

  const renderTitle = () => {
    const actionLabel = getProposalActionLabel(actionType, t);
    const showGroup = group && !isGroupPage;

    return (
      <Box marginBottom={showGroup ? -0.5 : 0}>
        {showGroup && (
          <Link href={groupPath}>
            <Typography color="primary" lineHeight={1} fontSize={15}>
              {group.name}
            </Typography>
          </Link>
        )}
        <Box fontSize={14}>
          <Link
            href={userProfilePath}
            sx={showGroup ? { color: "inherit" } : undefined}
          >
            {user?.name}
          </Link>
          {MIDDOT_WITH_SPACES}

          {isGroupPage && (
            <>
              <Link href={proposalPath} sx={{ color: "inherit", fontSize: 13 }}>
                {actionLabel}
              </Link>
              {MIDDOT_WITH_SPACES}
            </>
          )}

          <Link href={proposalPath} sx={{ color: "inherit", fontSize: 13 }}>
            {formattedDate}
          </Link>
        </Box>
      </Box>
    );
  };

  const renderMenu = () => {
    if (voteCount) {
      return null;
    }
    const editPath = `${NavigationPaths.Proposals}/${id}${NavigationPaths.Edit}`;
    const deletePrompt = t("prompts.deleteItem", { itemType: "proposal" });
    return (
      <ItemMenu
        anchorEl={menuAnchorEl}
        canDelete={isMe}
        canEdit={isMe}
        deleteItem={handleDelete}
        deletePrompt={deletePrompt}
        editPath={editPath}
        itemId={id}
        setAnchorEl={setMenuAnchorEl}
      />
    );
  };

  return (
    <Card {...cardProps}>
      <CardHeader
        action={renderMenu()}
        avatar={renderAvatar()}
        title={renderTitle()}
      />

      <CardContent sx={cardContentStyles}>
        {body && <Typography sx={bodyStyles}>{body}</Typography>}

        <Link href={proposalPath}>
          {actionType === ProposalActionTypes.ChangeName && (
            <Typography marginBottom={3.5}>
              {t("proposals.labels.newGroupName")}: {groupName}
            </Typography>
          )}

          {actionType === ProposalActionTypes.ChangeDescription && (
            <Typography marginBottom={3.5}>
              {t("proposals.labels.newGroupDescription")}: {groupDescription}
            </Typography>
          )}

          {actionType === ProposalActionTypes.ChangeCoverPhoto &&
            groupCoverPhoto && (
              <Box marginBottom="20px">
                <Typography gutterBottom fontSize={14}>
                  {t("proposals.labels.proposedGroupCoverPhoto")}:
                </Typography>
                <AttachedImage image={groupCoverPhoto} width="55%" />
              </Box>
            )}

          {!!images.length && (
            <AttachedImageList images={images} sx={imageListStyles} />
          )}
        </Link>
      </CardContent>

      {me && <ProposalCardFooter proposal={proposal} currentUserId={me.id} />}
    </Card>
  );
};

export default ProposalCard;
