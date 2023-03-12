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
import { useIsFirstUserQuery, useMeQuery } from "../../apollo/gen";
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
  flexGrow: 1,
  justifyContent: "space-between",
  height: 41.75,
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

  const { data: isFirstUserData } = useIsFirstUserQuery({ skip: isLoggedIn });
  const { data: meData, loading } = useMeQuery({ skip: !isLoggedIn });

  const { t } = useTranslation();

  const me = meData?.me;
  const isFirstUser = isFirstUserData?.isFirstUser;
  const showAuthLinks = !isLoggedIn && !isAuthLoading && !isRefreshingToken;

  const userProfilePath = getUserProfilePath(me?.name);
  const signUpPath = isFirstUser
    ? NavigationPaths.SignUp
    : `/signup/${inviteToken}`;

  const handleMenuButtonClick = (event: MouseEvent<HTMLButtonElement>) =>
    setMenuAnchorEl(event.currentTarget);

  const handleClose = () => setMenuAnchorEl(null);

  if (loading) {
    return null;
  }

  return (
    <Flex sx={TOP_NAV_STYLES}>
      {!isAuthLoading && <SearchBar />}

      {me && (
        <Flex>
          <Link href={userProfilePath}>
            <Button
              aria-label={t("navigation.profile")}
              sx={PROFILE_BUTTON_STYLES}
            >
              <UserAvatar user={me} sx={USER_AVATAR_STYLES} />
              {me.name}
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
            user={me}
          />
        </Flex>
      )}

      {showAuthLinks && (
        <Flex>
          <Button onClick={() => redirectTo(NavigationPaths.LogIn)}>
            {t("users.actions.logIn")}
          </Button>

          {(inviteToken || isFirstUser) && (
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
