// TODO: Add remaining layout and functionality - below is a WIP

import { useReactiveVar } from "@apollo/client";
import { HowToVote } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent as MuiCardContent,
  CardHeader as MuiCardHeader,
  CardProps,
  styled,
  SxProps,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import {
  CurrentMemberFragment,
  GroupProfileCardFragment,
  useDeleteGroupMutation,
} from "../../apollo/gen";
import {
  MIDDOT_WITH_SPACES,
  NavigationPaths,
} from "../../constants/common.constants";
import { useAboveBreakpoint } from "../../hooks/common.hooks";
import { redirectTo } from "../../utils/common.utils";
import {
  getEditGroupPath,
  getGroupMembersPath,
  getMemberRequestsPath,
} from "../../utils/group.utils";
import CoverPhoto from "../Images/CoverPhoto";
import Flex from "../Shared/Flex";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import { removeGroup } from "./GroupCard";
import JoinButton from "./JoinButton";

const NameText = styled(Typography)(() => ({
  fontFamily: "Inter Bold",
  marginBottom: 7.5,
}));
const DetailsBox = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
const CardHeader = styled(MuiCardHeader)(() => ({
  marginTop: 7.5,
  paddingBottom: 0,
  paddingRight: 22,
}));
const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 16,
  },
}));

interface Props extends CardProps {
  group: GroupProfileCardFragment;
  currentMember?: CurrentMemberFragment;
}

const GroupProfileCard = ({ group, currentMember, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [deleteGroup] = useDeleteGroupMutation();

  const { t } = useTranslation();
  const isAboveMedium = useAboveBreakpoint("md");
  const isAboveSmall = useAboveBreakpoint("sm");

  const { id, name, coverPhoto, members, memberRequestCount } = group;
  const editGroupPath = getEditGroupPath(name);
  const groupMembersPath = getGroupMembersPath(name);
  const memberRequestsPath = getMemberRequestsPath(name);

  const deleteGroupPrompt = t("prompts.deleteItem", { itemType: "group" });

  const showCardHeader = isLoggedIn && isAboveSmall;

  const getNameTextWidth = () => {
    if (isAboveMedium) {
      return "75%";
    }
    if (isAboveSmall) {
      return "70%";
    }
    return "100%";
  };

  const nameTextStyles: SxProps = {
    fontSize: isAboveSmall ? 25 : 23,
    marginTop: showCardHeader ? -7 : -0.3,
    width: getNameTextWidth(),
  };
  const voteIconStyles: SxProps = {
    marginBottom: -0.5,
    marginRight: "0.2ch",
  };

  const handleDelete = async (id: number) => {
    await redirectTo(NavigationPaths.Groups);
    await deleteGroup({
      variables: { id },
      update: removeGroup(id),
    });
  };

  const renderCardActions = () => (
    <>
      <JoinButton groupId={id} currentMember={currentMember} />

      {currentMember && (
        <ItemMenu
          anchorEl={menuAnchorEl}
          buttonStyles={{ paddingX: 0, minWidth: 38 }}
          deleteItem={handleDelete}
          deletePrompt={deleteGroupPrompt}
          editPath={editGroupPath}
          itemId={id}
          setAnchorEl={setMenuAnchorEl}
          variant="ghost"
          canDelete
          canEdit
        />
      )}
    </>
  );

  return (
    <Card {...cardProps}>
      <CoverPhoto imageId={coverPhoto?.id} />
      {showCardHeader && <CardHeader action={renderCardActions()} />}
      <CardContent>
        <NameText color="primary" variant="h2" sx={nameTextStyles}>
          {name}
        </NameText>

        <DetailsBox fontSize={isAboveSmall ? undefined : 15}>
          <Link href={"/"} disabled>
            <HowToVote sx={voteIconStyles} />
            {t("groups.labels.majority")}
          </Link>
          {MIDDOT_WITH_SPACES}
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
        </DetailsBox>

        {isLoggedIn && !isAboveSmall && (
          <Flex sx={{ justifyContent: "right", marginTop: 2 }}>
            {renderCardActions()}
          </Flex>
        )}
      </CardContent>
    </Card>
  );
};

export default GroupProfileCard;
