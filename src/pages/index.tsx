import { useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import { isLoggedInVar } from "../apollo/cache";
import { useHomePageQuery } from "../apollo/gen";
import Feed from "../components/Shared/Feed";
import ProgressBar from "../components/Shared/ProgressBar";
import ToggleForms from "../components/Shared/ToggleForms";

const Home: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, loading } = useHomePageQuery({ skip: !isLoggedIn });

  if (loading) {
    return <ProgressBar />;
  }

  if (!data?.me) {
    return null;
  }

  const { me } = data;
  const { homeFeed } = me;

  return (
    <>
      {isLoggedIn && <ToggleForms me={me} />}
      <Feed feed={homeFeed} />
    </>
  );
};

export default Home;
