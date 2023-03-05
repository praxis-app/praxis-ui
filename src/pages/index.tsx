import { useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import { isLoggedInVar } from "../apollo/cache";
import { useHomePageQuery } from "../apollo/gen";
import WelcomeCard from "../components/About/WelcomeCard";
import Feed from "../components/Shared/Feed";
import ProgressBar from "../components/Shared/ProgressBar";
import ToggleForms from "../components/Shared/ToggleForms";

const Home: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, loading } = useHomePageQuery({ skip: !isLoggedIn });

  if (loading) {
    return <ProgressBar />;
  }

  if (!isLoggedIn) {
    return <WelcomeCard />;
  }

  if (!data?.me) {
    return null;
  }

  const { me } = data;
  const { homeFeed } = me;

  return (
    <>
      <ToggleForms me={me} />
      <Feed feed={homeFeed} />
    </>
  );
};

export default Home;
