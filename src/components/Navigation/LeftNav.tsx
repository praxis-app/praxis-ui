import { useReactiveVar } from "@apollo/client";
import {
  AccountBox as RolesIcon,
  EventNote as EventsIcon,
  Link as InvitesIcon,
  Group as GroupsIcon,
  Home as HomeIcon,
  SupervisedUserCircle as UsersIcon,
} from "@mui/icons-material";
import {
  List,
  ListItemButton as MuiListItemButton,
  ListItemIcon as MuiListItemIcon,
  ListItemText as MuiListItemText,
  ListItemTextProps as MuiListItemTextProps,
} from "@mui/material";
import { styled, SxProps } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import { useMeQuery } from "../../apollo/gen";
import { NavigationPaths } from "../../constants/common.constants";
import { ServerPermissions } from "../../constants/role.constants";
import Link from "../Shared/Link";

interface ListItemTextProps extends MuiListItemTextProps {
  isActive?: boolean;
}

const ListItemText = styled(MuiListItemText, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<ListItemTextProps>(({ isActive }) => ({
  "& .MuiListItemText-primary": {
    fontSize: 20,
    ...(isActive && {
      fontFamily: "Inter Bold",
    }),
  },
}));

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
  borderRadius: 9999,
  color: theme.palette.text.primary,
}));

const ListItemIcon = styled(MuiListItemIcon)(() => ({
  justifyContent: "center",
  marginRight: 10,
  minWidth: 40,
}));

const LeftNav = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, loading } = useMeQuery({ skip: !isLoggedIn });

  const { asPath } = useRouter();
  const { t } = useTranslation();

  const me = data?.me;
  const canBanUsers = me?.serverPermissions.includes(
    ServerPermissions.BanMembers
  );
  const canManageRoles = me?.serverPermissions.includes(
    ServerPermissions.ManageRoles
  );
  const canCreateInvites = me?.serverPermissions.includes(
    ServerPermissions.CreateInvites
  );
  const canManageInvites = me?.serverPermissions.includes(
    ServerPermissions.ManageInvites
  );

  const listStyles: SxProps = {
    position: "fixed",
    left: 100,
    top: 110,
    width: 160,
  };

  const getIconStyle = (path: NavigationPaths) => {
    const transition = { transition: "0.2s ease" };
    if (asPath === path) {
      return { fontSize: 28, ...transition };
    }
    return transition;
  };

  const isActive = (path: NavigationPaths) => path === asPath;

  if (loading) {
    return null;
  }

  // TODO: Determine whether or not to refactor to use Stack instead of List
  // https://mui.com/material-ui/react-stack
  return (
    <List component={"div"} role="navigation" sx={listStyles}>
      <Link href={NavigationPaths.Home}>
        <ListItemButton>
          <ListItemIcon>
            <HomeIcon sx={getIconStyle(NavigationPaths.Home)} />
          </ListItemIcon>
          <ListItemText
            isActive={isActive(NavigationPaths.Home)}
            primary={t("navigation.home")}
          />
        </ListItemButton>
      </Link>

      <Link href={NavigationPaths.Groups}>
        <ListItemButton>
          <ListItemIcon>
            <GroupsIcon sx={getIconStyle(NavigationPaths.Groups)} />
          </ListItemIcon>
          <ListItemText
            isActive={isActive(NavigationPaths.Groups)}
            primary={t("navigation.groups")}
          />
        </ListItemButton>
      </Link>

      <Link href={NavigationPaths.Events}>
        <ListItemButton>
          <ListItemIcon>
            <EventsIcon sx={getIconStyle(NavigationPaths.Events)} />
          </ListItemIcon>
          <ListItemText
            isActive={isActive(NavigationPaths.Events)}
            primary={t("navigation.events")}
          />
        </ListItemButton>
      </Link>

      {canManageRoles && (
        <Link href={NavigationPaths.Roles}>
          <ListItemButton>
            <ListItemIcon>
              <RolesIcon sx={getIconStyle(NavigationPaths.Roles)} />
            </ListItemIcon>
            <ListItemText
              isActive={isActive(NavigationPaths.Roles)}
              primary={t("navigation.roles")}
            />
          </ListItemButton>
        </Link>
      )}

      {canBanUsers && (
        <Link href={NavigationPaths.Users}>
          <ListItemButton>
            <ListItemIcon>
              <UsersIcon sx={getIconStyle(NavigationPaths.Users)} />
            </ListItemIcon>
            <ListItemText
              isActive={isActive(NavigationPaths.Users)}
              primary={t("navigation.users")}
            />
          </ListItemButton>
        </Link>
      )}

      {(canCreateInvites || canManageInvites) && (
        <Link href={NavigationPaths.Invites}>
          <ListItemButton>
            <ListItemIcon>
              <InvitesIcon sx={getIconStyle(NavigationPaths.Invites)} />
            </ListItemIcon>
            <ListItemText
              isActive={isActive(NavigationPaths.Invites)}
              primary={t("navigation.invites")}
            />
          </ListItemButton>
        </Link>
      )}
    </List>
  );
};

export default LeftNav;
