import { AccountBox, ExitToApp, Person, Settings } from "@mui/icons-material";
import { Menu, MenuItem, SvgIconProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLogOutMutation } from "../../apollo/auth/generated/LogOut.mutation";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../../apollo/cache";
import { TopNavDropdownFragment } from "../../apollo/users/generated/TopNavDropdown.fragment";
import { NavigationPaths } from "../../constants/common.constants";
import { inDevToast, redirectTo } from "../../utils/common.utils";

export const handleLogOutComplete = () => {
  isLoggedInVar(false);
  isAuthLoadingVar(false);
  isRefreshingTokenVar(false);
  redirectTo(NavigationPaths.LogIn);
};

const ICON_PROPS: SvgIconProps = {
  fontSize: "small",
  sx: {
    marginRight: 1,
  },
};

interface Props {
  anchorEl: null | HTMLElement;
  handleClose: () => void;
  user: TopNavDropdownFragment;
}

const TopNavDropdown = ({
  anchorEl,
  handleClose,
  user: { name, serverPermissions },
}: Props) => {
  const [logOut] = useLogOutMutation();
  const { t } = useTranslation();

  const handleLogOutButtonClick = () =>
    window.confirm(t("users.prompts.logOut")) &&
    logOut({
      onCompleted: handleLogOutComplete,
      update: (cache) => cache.reset(),
    });

  const handleEditProfileButtonClick = () => {
    const path = `${NavigationPaths.Users}/${name}/edit`;
    redirectTo(path);
  };

  const handleRolesButtonClick = () => redirectTo(NavigationPaths.Roles);

  return (
    <Menu
      anchorEl={anchorEl}
      onClick={handleClose}
      onClose={handleClose}
      open={Boolean(anchorEl)}
      anchorOrigin={{
        horizontal: "right",
        vertical: "bottom",
      }}
      transformOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      keepMounted
    >
      <MenuItem onClick={handleEditProfileButtonClick}>
        <Person {...ICON_PROPS} />
        {t("users.actions.editProfile")}
      </MenuItem>

      <MenuItem onClick={inDevToast}>
        <Settings {...ICON_PROPS} />
        {t("navigation.preferences")}
      </MenuItem>

      {serverPermissions.manageRoles && (
        <MenuItem onClick={handleRolesButtonClick}>
          <AccountBox {...ICON_PROPS} />
          {t("roles.actions.manageRoles")}
        </MenuItem>
      )}

      <MenuItem onClick={handleLogOutButtonClick}>
        <ExitToApp {...ICON_PROPS} />
        {t("users.actions.logOut")}
      </MenuItem>
    </Menu>
  );
};

export default TopNavDropdown;
