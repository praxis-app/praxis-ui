import { useReactiveVar } from "@apollo/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { isLoggedInVar } from "../../apollo/cache";
import GroupProfile from "../../components/Groups/GroupProfile";
import PublicGroupProfile from "../../components/Groups/PublicGroupProfile";

const GroupPage: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  if (!isLoggedIn) {
    return <PublicGroupProfile name={name} />;
  }
  return <GroupProfile name={name} />;
};

export default GroupPage;
