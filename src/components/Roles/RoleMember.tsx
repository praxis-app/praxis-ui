import { Reference } from "@apollo/client";
import { RemoveCircle } from "@mui/icons-material";
import { IconButton, styled, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  RoleMemberFragment,
  useDeleteGroupRoleMemberMutation,
  useDeleteServerRoleMemberMutation,
} from "../../apollo/gen";
import {
  FORBIDDEN,
  NavigationPaths,
  TypeNames,
} from "../../constants/common.constants";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

const OuterFlex = styled(Flex)(() => ({
  marginBottom: 12,
  "&:last-child": {
    marginBottom: 0,
  },
}));

interface Props {
  roleMember: RoleMemberFragment;
  roleId: number;
}

const RoleMember = ({ roleMember, roleId }: Props) => {
  const { asPath } = useRouter();
  const { t } = useTranslation();

  const isGroupRole = asPath.includes(NavigationPaths.Groups);
  const userProfilePath = getUserProfilePath(roleMember.name);

  const [deleteRoleMember] = (
    isGroupRole
      ? useDeleteGroupRoleMemberMutation
      : useDeleteServerRoleMemberMutation
  )();

  const handleDelete = async () =>
    await deleteRoleMember({
      variables: {
        roleMemberData: {
          userId: roleMember.id,
          roleId,
        },
      },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const role =
          "deleteGroupRoleMember" in data
            ? data.deleteGroupRoleMember.groupRole
            : data.deleteServerRoleMember.serverRole;
        const { availableUsersToAdd } = role;

        cache.modify({
          id: cache.identify({
            id: roleId,
            __typename: isGroupRole
              ? TypeNames.GroupRole
              : TypeNames.ServerRole,
          }),
          fields: {
            members(existingRefs: Reference[], { readField }) {
              return existingRefs.filter(
                (ref) => readField("id", ref) !== roleMember.id
              );
            },
            availableUsersToAdd(_, { toReference }) {
              return availableUsersToAdd.map((user) => toReference(user));
            },
            memberCount(existingCount: number) {
              return existingCount - 1;
            },
          },
        });
      },
      onError(error) {
        toastVar({
          status: "error",
          title:
            error.message === FORBIDDEN
              ? t("prompts.permissionDenied")
              : error.message,
        });
      },
    });

  const handleClickWithConfirm = () =>
    window.confirm(t("prompts.removeItem", { itemType: "role member" })) &&
    handleDelete();

  return (
    <OuterFlex justifyContent="space-between">
      <Link href={userProfilePath}>
        <Flex>
          <UserAvatar user={roleMember} sx={{ marginRight: 1.5 }} />
          <Typography color="primary" sx={{ marginTop: 1 }}>
            {roleMember.name}
          </Typography>
        </Flex>
      </Link>

      <IconButton onClick={handleClickWithConfirm}>
        <RemoveCircle />
      </IconButton>
    </OuterFlex>
  );
};

export default RoleMember;
