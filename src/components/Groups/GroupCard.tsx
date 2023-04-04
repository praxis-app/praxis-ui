import { ApolloCache, FetchResult, useReactiveVar } from "@apollo/client";
import { AccountBox } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader as MuiCardHeader,
  CardProps,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import produce from "immer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isLoggedInVar, toastVar } from "../../apollo/cache";
import {
  DeleteGroupMutation,
  GroupCardFragment,
  GroupsDocument,
  GroupsQuery,
  useDeleteGroupMutation,
} from "../../apollo/gen";
import {
  MIDDOT_WITH_SPACES,
  NavigationPaths,
  TypeNames,
} from "../../constants/common.constants";
import { GroupPermissions } from "../../constants/role.constants";
import { redirectTo } from "../../utils/common.utils";
import {
  getEditGroupPath,
  getGroupMembersPath,
  getGroupPath,
  getMemberRequestsPath,
} from "../../utils/group.utils";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import GroupAvatar from "./GroupAvatar";
import JoinButton from "./JoinButton";

export const removeGroup =
  (id: number) =>
  (cache: ApolloCache<any>, { errors }: FetchResult<DeleteGroupMutation>) => {
    if (errors) {
      toastVar({ status: "error", title: errors[0].message });
      return;
    }
    cache.updateQuery<GroupsQuery>({ query: GroupsDocument }, (groupsData) =>
      produce(groupsData, (draft) => {
        if (!draft) {
          return;
        }
        const index = draft.groups.findIndex((p) => p.id === id);
        draft.groups.splice(index, 1);
      })
    );
    const cacheId = cache.identify({ id, __typename: TypeNames.Group });
    cache.evict({ id: cacheId });
    cache.gc();
  };

const CardHeader = styled(MuiCardHeader)(() => ({
  paddingBottom: 0,
}));

interface Props extends CardProps {
  currentUserId?: number;
  group: GroupCardFragment;
}

const GroupCard = ({ group, currentUserId, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [deleteGroup] = useDeleteGroupMutation();

  const { t } = useTranslation();

  const { id, name, description, members, memberRequestCount, myPermissions } =
    group;
  const currentMember = isLoggedIn
    ? members.find(({ user }) => currentUserId === user.id)
    : undefined;

  const canApproveMemberRequests = myPermissions.includes(
    GroupPermissions.ApproveMemberRequests
  );

  const editGroupPath = getEditGroupPath(name);
  const groupMembersPath = getGroupMembersPath(name);
  const groupPath = getGroupPath(name);
  const memberRequestsPath = getMemberRequestsPath(name);

  const deleteGroupPrompt = t("prompts.deleteItem", { itemType: "group" });

  const handleDelete = async (id: number) =>
    await deleteGroup({
      variables: { id },
      update: removeGroup(id),
    });

  const handleRolesButtonClick = async () => {
    const groupRolesPath = `${NavigationPaths.Groups}/${name}/roles`;
    await redirectTo(groupRolesPath);
  };

  const renderItemMenu = () => {
    const canDeleteGroup = myPermissions.includes(GroupPermissions.DeleteGroup);
    const canUpdateGroup = myPermissions.includes(GroupPermissions.UpdateGroup);
    const canManageRoles = myPermissions.includes(GroupPermissions.ManageRoles);
    if (!canDeleteGroup && !canUpdateGroup && !canManageRoles) {
      return null;
    }

    return (
      <ItemMenu
        itemId={id}
        anchorEl={menuAnchorEl}
        canDelete={canDeleteGroup}
        canUpdate={canUpdateGroup}
        deleteItem={handleDelete}
        deletePrompt={deleteGroupPrompt}
        editPath={editGroupPath}
        setAnchorEl={setMenuAnchorEl}
      >
        {canManageRoles && (
          <MenuItem onClick={handleRolesButtonClick}>
            <AccountBox fontSize="small" sx={{ marginRight: 1 }} />
            {t("roles.actions.manageRoles")}
          </MenuItem>
        )}
      </ItemMenu>
    );
  };

  return (
    <Card {...cardProps}>
      <CardHeader
        action={renderItemMenu()}
        avatar={<GroupAvatar group={group} />}
        title={<Link href={groupPath}>{name}</Link>}
      />
      <CardContent>
        <Typography sx={{ marginBottom: 1.25 }}>{description}</Typography>

        <Box sx={{ marginBottom: 1.75 }}>
          <Link href={groupMembersPath}>
            {t("groups.labels.members", { count: members.length })}
          </Link>

          {canApproveMemberRequests && typeof memberRequestCount === "number" && (
            <>
              {MIDDOT_WITH_SPACES}
              <Link href={memberRequestsPath}>
                {t("groups.labels.requests", { count: memberRequestCount })}
              </Link>
            </>
          )}
        </Box>

        {isLoggedIn && (
          <JoinButton groupId={id} currentMember={currentMember} />
        )}
      </CardContent>
    </Card>
  );
};

export default GroupCard;
