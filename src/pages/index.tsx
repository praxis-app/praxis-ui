import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../apollo/cache";
import { useHomePageQuery, usePublicHomePageQuery } from "../apollo/gen";
import WelcomeCard from "../components/About/WelcomeCard";
import Feed from "../components/Shared/Feed";
import ProgressBar from "../components/Shared/ProgressBar";
import ToggleForms from "../components/Shared/ToggleForms";
import { isDeniedAccess } from "../utils/error.utils";

const Home: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const {
    data: homePageData,
    loading: homePageLoading,
    error: homePageError,
  } = useHomePageQuery({ skip: !isLoggedIn });

  const {
    data: publicHomePageData,
    loading: publicHomePageLoading,
    error: publicHomePageError,
  } = usePublicHomePageQuery({
    errorPolicy: "all",
    skip: isLoggedIn,
  });

  const { t } = useTranslation();

  if (!homePageData && !publicHomePageData) {
    if (isDeniedAccess(homePageError || publicHomePageError)) {
      return <Typography>{t("prompts.permissionDenied")}</Typography>;
    }

    if (homePageError || publicHomePageError) {
      return <Typography>{t("errors.somethingWentWrong")}</Typography>;
    }
    return null;
  }

  if (homePageLoading || publicHomePageLoading) {
    return <ProgressBar />;
  }

  if (!isLoggedIn && publicHomePageData) {
    return (
      <>
        <WelcomeCard />
        <Feed feed={publicHomePageData.publicGroupsFeed} />
      </>
    );
  }

  if (!homePageData?.me) {
    return null;
  }

  const { me } = homePageData;
  const { homeFeed } = me;

  return (
    <>
      <ToggleForms me={me} />
      <Feed feed={homeFeed} />
    </>
  );
};

export default Home;
