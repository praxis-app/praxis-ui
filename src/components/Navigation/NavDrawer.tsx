import { useReactiveVar } from "@apollo/client";
import {
  AccountBox,
  Article as DocsIcon,
  Close,
  ExitToApp as SessionIcon,
  Link as InvitesIcon,
  PersonAdd as SignUpIcon,
  SupervisedUserCircle as UsersIcon,
} from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText as MuiListItemText,
} from "@mui/material";
import { styled, SxProps } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLogOutMutation } from "../../apollo/auth/generated/LogOut.mutation";
import {
  inviteTokenVar,
  isLoggedInVar,
  isNavDrawerOpenVar,
} from "../../apollo/cache";
import { useIsFirstUserQuery } from "../../apollo/users/generated/IsFirstUser.query";
import { useMeQuery } from "../../apollo/users/generated/Me.query";
import { NavigationPaths } from "../../constants/common.constants";
import { redirectTo as commonRedirectTo } from "../../utils/common.utils";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import UserAvatar from "../Users/UserAvatar";
import { handleLogOutComplete } from "./TopNavDropdown";

const USER_AVATAR_STYLES: SxProps = {
  width: 21,
  height: 21,
  marginLeft: 0.25,
};

const CLOSE_BUTTON_FLEX_STYLES: SxProps = {
  marginY: 0.5,
  marginRight: 0.5,
};

const ListItemText = styled(MuiListItemText)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const NavDrawer = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const inviteToken = useReactiveVar(inviteTokenVar);
  const open = useReactiveVar(isNavDrawerOpenVar);

  const { data: meData } = useMeQuery({ skip: !isLoggedIn });
  const { data: isFirstUserData } = useIsFirstUserQuery({ skip: isLoggedIn });
  const [logOut] = useLogOutMutation();

  const router = useRouter();
  const { t } = useTranslation();

  const handleLogOutClick = async () =>
    await logOut({
      onCompleted: handleLogOutComplete,
      update: (cache) => cache.reset(),
    });

  const redirectTo = (path: string) => () => {
    handleClose();
    commonRedirectTo(path);
  };

  const handleClose = () => isNavDrawerOpenVar(false);

  useEffect(() => {
    handleClose();
  }, [router.pathname]);

  const renderDocsButton = () => (
    <ListItemButton onClick={redirectTo(NavigationPaths.Docs)}>
      <ListItemIcon>
        <DocsIcon />
      </ListItemIcon>
      <ListItemText primary={t("navigation.docs")} />
    </ListItemButton>
  );

  const renderList = () => {
    if (!meData?.me) {
      const signUpPath = isFirstUserData?.isFirstUser
        ? NavigationPaths.SignUp
        : `/signup/${inviteToken}`;

      return (
        <>
          {renderDocsButton()}

          <ListItemButton onClick={redirectTo(NavigationPaths.LogIn)}>
            <ListItemIcon>
              <SessionIcon />
            </ListItemIcon>
            <ListItemText primary={t("users.actions.logIn")} />
          </ListItemButton>

          {(inviteToken || isFirstUserData?.isFirstUser) && (
            <ListItemButton onClick={redirectTo(signUpPath)}>
              <ListItemIcon>
                <SignUpIcon />
              </ListItemIcon>
              <ListItemText primary={t("users.actions.signUp")} />
            </ListItemButton>
          )}
        </>
      );
    }

    const { me } = meData;
    const userProfilePath = getUserProfilePath(me.name);

    const { removeMembers, manageRoles, createInvites, manageInvites } =
      me.serverPermissions;

    return (
      <>
        <ListItemButton onClick={redirectTo(userProfilePath)}>
          <ListItemIcon>
            <UserAvatar user={me} sx={USER_AVATAR_STYLES} />
          </ListItemIcon>
          <ListItemText primary={me.name} />
        </ListItemButton>

        {manageRoles && (
          <ListItemButton onClick={redirectTo(NavigationPaths.Roles)}>
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText primary={t("navigation.roles")} />
          </ListItemButton>
        )}

        {removeMembers && (
          <ListItemButton onClick={redirectTo(NavigationPaths.Users)}>
            <ListItemIcon>
              <UsersIcon />
            </ListItemIcon>
            <ListItemText primary={t("navigation.users")} />
          </ListItemButton>
        )}

        {(createInvites || manageInvites) && (
          <ListItemButton onClick={redirectTo(NavigationPaths.Invites)}>
            <ListItemIcon>
              <InvitesIcon />
            </ListItemIcon>
            <ListItemText primary={t("navigation.invites")} />
          </ListItemButton>
        )}

        {renderDocsButton()}

        <ListItemButton
          onClick={() =>
            window.confirm(t("users.prompts.logOut")) && handleLogOutClick()
          }
        >
          <ListItemIcon>
            <SessionIcon />
          </ListItemIcon>
          <ListItemText primary={t("users.actions.logOut")} />
        </ListItemButton>
      </>
    );
  };

  return (
    <Drawer
      anchor="right"
      onClick={handleClose}
      onClose={handleClose}
      open={open}
    >
      <main role="main">
        <Flex flexEnd sx={CLOSE_BUTTON_FLEX_STYLES}>
          <IconButton>
            <Close />
          </IconButton>
        </Flex>

        <Divider />

        <List sx={{ minWidth: "50vw" }}>{renderList()}</List>
      </main>
    </Drawer>
  );
};

export default NavDrawer;
