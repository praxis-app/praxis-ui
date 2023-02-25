import { ApolloCache, useReactiveVar } from "@apollo/client";
import {
  Box,
  Card,
  CardContent,
  CardHeader as MuiCardHeader,
  CardProps,
  styled,
  Typography,
} from "@mui/material";
import produce from "immer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import {
  GroupCardFragment,
  GroupsDocument,
  GroupsQuery,
  useDeleteGroupMutation,
} from "../../apollo/gen";
import {
  MIDDOT_WITH_SPACES,
  TypeNames,
} from "../../constants/common.constants";
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

export const removeGroup = (id: number) => (cache: ApolloCache<any>) => {
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

  const { id, name, description, members, memberRequestCount } = group;
  const currentMember = isLoggedIn
    ? members.find(({ user }) => currentUserId === user.id)
    : undefined;

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

  return (
    <Card {...cardProps}>
      <CardHeader
        avatar={<GroupAvatar group={group} />}
        title={<Link href={groupPath}>{name}</Link>}
        action={
          // TODO: Add permission logic for edit and delete
          currentMember && (
            <ItemMenu
              anchorEl={menuAnchorEl}
              deleteItem={handleDelete}
              deletePrompt={deleteGroupPrompt}
              editPath={editGroupPath}
              itemId={id}
              setAnchorEl={setMenuAnchorEl}
              canDelete
              canEdit
            />
          )
        }
      />
      <CardContent>
        <Typography sx={{ marginBottom: 1.25 }}>{description}</Typography>

        <Box sx={{ marginBottom: 1.75 }}>
          <Link href={groupMembersPath}>
            {t("groups.labels.members", { count: members.length })}
          </Link>
          {currentMember && (
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
