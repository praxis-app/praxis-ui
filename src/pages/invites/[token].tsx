import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { inviteTokenVar, isLoggedInVar } from "../../apollo/cache";
import { useServerInviteQuery } from "../../apollo/gen";
import PublicGroupsFeed from "../../components/Groups/PublicGroupsFeed";
import ProgressBar from "../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../constants/common.constants";
import { INVITE_TOKEN } from "../../constants/server-invite.constants";
import { redirectTo, setLocalStorageItem } from "../../utils/common.utils";

const ServerInvitePage: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const { query } = useRouter();
  const token = String(query?.token || "");
  const { loading: serverInviteLoading, error: serverInviteError } =
    useServerInviteQuery({
      onCompleted({ serverInvite }) {
        inviteTokenVar(serverInvite.token);
        setLocalStorageItem(INVITE_TOKEN, serverInvite.token);
      },
      variables: { token },
      skip: isLoggedIn || !token,
    });

  const { t } = useTranslation();

  useEffect(() => {
    if (isLoggedIn) {
      redirectTo(NavigationPaths.Home);
    }
  }, [isLoggedIn]);

  if (!token) {
    return <Typography>{t("invites.prompts.inviteRequired")}</Typography>;
  }
  if (serverInviteError) {
    return <Typography>{t("invites.prompts.expiredOrInvalid")}</Typography>;
  }
  if (serverInviteLoading || isLoggedIn) {
    return <ProgressBar />;
  }

  return <PublicGroupsFeed />;
};

export default ServerInvitePage;
