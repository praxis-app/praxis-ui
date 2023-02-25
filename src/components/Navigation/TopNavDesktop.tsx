import { useReactiveVar } from "@apollo/client";
import { ArrowDropDown } from "@mui/icons-material";
import { Button, IconButton, SxProps } from "@mui/material";
import { MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  inviteTokenVar,
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../../apollo/cache";
import { useMeQuery } from "../../apollo/gen";
import { NavigationPaths } from "../../constants/common.constants";
import { redirectTo } from "../../utils/common.utils";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import SearchBar from "../Shared/SearchBar";
import UserAvatar from "../Users/UserAvatar";
import TopNavDropdown from "./TopNavDropdown";

const PROFILE_BUTTON_STYLES: SxProps = {
  fontSize: 17,
  fontWeight: "bold",
  textTransform: "none",
};

const TOP_NAV_STYLES: SxProps = {
  justifyContent: "space-between",
  flexGrow: 1,
  marginLeft: 3,
};

const USER_AVATAR_STYLES: SxProps = {
  marginRight: 1.3,
  height: 24,
  width: 24,
};

const TopNavDesktop = () => {
  const inviteToken = useReactiveVar(inviteTokenVar);
  const isAuthLoading = useReactiveVar(isAuthLoadingVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isRefreshingToken = useReactiveVar(isRefreshingTokenVar);

  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const { data, loading } = useMeQuery({ skip: !isLoggedIn });

  const { t } = useTranslation();

  const showLoginAndSignUp =
    !isLoggedIn && !isAuthLoading && !isRefreshingToken;
  const userProfilePath = getUserProfilePath(data?.me?.name);
  const signUpPath = `/i/${inviteToken}`;

  const handleMenuButtonClick = (event: MouseEvent<HTMLButtonElement>) =>
    setMenuAnchorEl(event.currentTarget);

  const handleClose = () => setMenuAnchorEl(null);

  if (loading) {
    return null;
  }

  return (
    <Flex sx={TOP_NAV_STYLES}>
      {!isAuthLoading && <SearchBar />}

      {data?.me && (
        <Flex>
          <Link href={userProfilePath}>
            <Button
              aria-label={t("navigation.profile")}
              sx={PROFILE_BUTTON_STYLES}
            >
              <UserAvatar user={data.me} sx={USER_AVATAR_STYLES} />
              {data.me.name}
            </Button>
          </Link>

          <IconButton
            aria-label={t("labels.menuButton")}
            edge="end"
            onClick={handleMenuButtonClick}
          >
            <ArrowDropDown />
          </IconButton>

          <TopNavDropdown
            anchorEl={menuAnchorEl}
            handleClose={handleClose}
            user={data.me}
          />
        </Flex>
      )}

      {showLoginAndSignUp && (
        <Flex sx={{ height: 41.75 }}>
          <Button onClick={() => redirectTo(NavigationPaths.LogIn)}>
            {t("users.actions.logIn")}
          </Button>

          {inviteToken && (
            <Button onClick={() => redirectTo(signUpPath)}>
              {t("users.actions.signUp")}
            </Button>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default TopNavDesktop;
