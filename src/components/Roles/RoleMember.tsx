import { RemoveCircle } from "@mui/icons-material";
import { IconButton, styled, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  RoleMemberFragment,
  useDeleteRoleMemberMutation,
} from "../../apollo/gen";
import { FORBIDDEN, TypeNames } from "../../constants/common.constants";
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

const RoleMember = ({
  roleMember: { id, user, __typename },
  roleId,
}: Props) => {
  const [deleteRoleMember] = useDeleteRoleMemberMutation();
  const { t } = useTranslation();

  const userProfilePath = getUserProfilePath(user.name);

  const handleDelete = async () =>
    await deleteRoleMember({
      variables: { id },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          deleteRoleMember: {
            role: { availableUsersToAdd },
          },
        } = data;
        cache.modify({
          id: cache.identify({ id: roleId, __typename: TypeNames.Role }),
          fields: {
            availableUsersToAdd(_, { toReference }) {
              return availableUsersToAdd.map((user) => toReference(user));
            },
            memberCount(existingCount: number) {
              return existingCount - 1;
            },
          },
        });
        const cacheId = cache.identify({ id, __typename });
        cache.evict({ id: cacheId });
        cache.gc();
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
          <UserAvatar user={user} sx={{ marginRight: 1.5 }} />
          <Typography color="primary" sx={{ marginTop: 1 }}>
            {user.name}
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
