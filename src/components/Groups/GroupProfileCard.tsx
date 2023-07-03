// TODO: Add remaining layout and functionality - below is a WIP

import { useReactiveVar } from "@apollo/client";
import { AccountBox, Lock, Public, Settings } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent as MuiCardContent,
  CardHeader as MuiCardHeader,
  CardProps,
  Divider,
  MenuItem,
  styled,
  SxProps,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import {
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
  getGroupPath,
  getMemberRequestsPath,
} from "../../utils/group.utils";
import CoverPhoto from "../Images/CoverPhoto";
import Flex from "../Shared/Flex";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import { removeGroup } from "./GroupCard";
import JoinButton from "./JoinButton";

export const TAB_QUERY_PARAM = "?tab=";

export const enum GroupTabs {
  About = "about",
  Events = "events",
  Proposals = "proposals",
}

const NameText = styled(Typography)(() => ({
  fontFamily: "Inter Bold",
  marginBottom: 7.5,
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
  currentMemberId?: number;
  group: GroupProfileCardFragment;
  setTab(tab: number): void;
  tab: number;
}

const GroupProfileCard = ({
  currentMemberId,
  group,
  setTab,
  tab,
  ...cardProps
}: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [deleteGroup] = useDeleteGroupMutation();

  const { query } = useRouter();
  const { t } = useTranslation();
  const isAboveMedium = useAboveBreakpoint("md");
  const isAboveSmall = useAboveBreakpoint("sm");

  useEffect(() => {
    if (query.tab) {
      switch (query.tab) {
        case GroupTabs.Proposals:
          setTab(1);
          break;
        case GroupTabs.Events:
          setTab(2);
          break;
        case GroupTabs.About:
          setTab(3);
      }
    }
  }, [query.tab, setTab]);

  const {
    id,
    coverPhoto,
    memberRequestCount,
    members,
    myPermissions,
    name,
    settings,
  } = group;

  const canApproveMemberRequests = myPermissions?.approveMemberRequests;
  const showCardHeader = isLoggedIn && isAboveSmall;

  const groupPath = getGroupPath(name);
  const editGroupPath = getEditGroupPath(name);
  const groupMembersPath = getGroupMembersPath(name);
  const memberRequestsPath = getMemberRequestsPath(name);
  const deleteGroupPrompt = t("prompts.deleteItem", { itemType: "group" });

  const groupPagePath = `${NavigationPaths.Groups}/${name}`;
  const aboutTabPath = `${groupPagePath}${TAB_QUERY_PARAM}${GroupTabs.About}`;
  const eventsTabPath = `${groupPagePath}${TAB_QUERY_PARAM}${GroupTabs.Events}`;
  const proposalsTabPath = `${groupPagePath}${TAB_QUERY_PARAM}${GroupTabs.Proposals}`;

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
    width: getNameTextWidth(),
    fontSize: isAboveSmall ? 25 : 23,
    marginTop: showCardHeader ? -7 : -0.3,
    marginBottom: 1,
  };
  const iconStyles: SxProps = {
    marginBottom: -0.5,
    marginRight: "0.3ch",
    fontSize: 20,
  };

  const handleDelete = async (id: number) => {
    await redirectTo(NavigationPaths.Groups);
    await deleteGroup({
      variables: { id },
      update: removeGroup(id),
    });
  };

  const handleRolesButtonClick = async () => {
    const groupRolesPath = `${NavigationPaths.Groups}/${name}/roles`;
    await redirectTo(groupRolesPath);
  };

  const handleSettingsButtonClick = async () => {
    const settingsPath = `${NavigationPaths.Groups}/${name}/settings`;
    await redirectTo(settingsPath);
  };

  const handleTabsChange = (_: React.SyntheticEvent, newValue: number) =>
    setTab(newValue);

  const renderCardActions = () => {
    const canDeleteGroup = myPermissions?.deleteGroup;
    const canManageRoles = myPermissions?.manageRoles;
    const canManageSettings = myPermissions?.manageSettings;
    const canUpdateGroup = myPermissions?.updateGroup;

    const showMenuButton =
      canDeleteGroup || canUpdateGroup || canManageRoles || canManageSettings;

    return (
      <>
        <JoinButton groupId={id} currentMemberId={currentMemberId} />

        {showMenuButton && (
          <ItemMenu
            anchorEl={menuAnchorEl}
            buttonStyles={{ paddingX: 0, minWidth: 38 }}
            canDelete={canDeleteGroup}
            canUpdate={canUpdateGroup}
            deleteItem={handleDelete}
            deletePrompt={deleteGroupPrompt}
            editPath={editGroupPath}
            itemId={id}
            setAnchorEl={setMenuAnchorEl}
            variant="ghost"
          >
            {canManageSettings && (
              <MenuItem onClick={handleSettingsButtonClick}>
                <Settings fontSize="small" sx={{ marginRight: 1 }} />
                {t("groups.labels.settings")}
              </MenuItem>
            )}
            {canManageRoles && (
              <MenuItem onClick={handleRolesButtonClick}>
                <AccountBox fontSize="small" sx={{ marginRight: 1 }} />
                {t("roles.actions.manageRoles")}
              </MenuItem>
            )}
          </ItemMenu>
        )}
      </>
    );
  };

  return (
    <Card {...cardProps}>
      <CoverPhoto imageId={coverPhoto?.id} />
      {showCardHeader && <CardHeader action={renderCardActions()} />}
      <CardContent>
        <NameText color="primary" variant="h2" sx={nameTextStyles}>
          {name}
        </NameText>

        <Box fontSize={isAboveSmall ? undefined : 15}>
          <Link href={"/"} disabled>
            {settings.isPublic ? (
              <>
                <Public sx={iconStyles} />
                {t("groups.labels.public")}
              </>
            ) : (
              <>
                <Lock sx={iconStyles} />
                {t("groups.labels.private")}
              </>
            )}
          </Link>

          {MIDDOT_WITH_SPACES}

          <Link href={isLoggedIn ? groupMembersPath : groupPath}>
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

        {isLoggedIn && !isAboveSmall && (
          <Flex sx={{ justifyContent: "right", marginTop: 2 }}>
            {renderCardActions()}
          </Flex>
        )}
      </CardContent>

      <Divider sx={{ marginX: "16px", marginBottom: 0.25 }} />

      <Tabs
        onChange={handleTabsChange}
        textColor="inherit"
        value={tab}
        centered
      >
        <Tab
          label={t("groups.tabs.feed")}
          onClick={() => redirectTo(groupPagePath)}
        />
        <Tab
          label={t("groups.tabs.proposals")}
          onClick={() => redirectTo(proposalsTabPath)}
        />
        <Tab
          label={t("groups.tabs.events")}
          onClick={() => redirectTo(eventsTabPath)}
        />
        <Tab
          label={t("groups.tabs.about")}
          onClick={() => redirectTo(aboutTabPath)}
        />
      </Tabs>
    </Card>
  );
};

export default GroupProfileCard;
