import { useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import { isLoggedInVar } from "../../apollo/cache";
import GroupsList from "../../components/Groups/GroupsList";
import PublicGroupsList from "../../components/Groups/PublicGroupsList";

const GroupsIndex: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  if (!isLoggedIn) {
    return <PublicGroupsList />;
  }
  return <GroupsList />;
};

export default GroupsIndex;
