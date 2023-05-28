import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import { useGroupsQuery, usePublicGroupsQuery } from "../../apollo/gen";
import GroupCard from "../../components/Groups/GroupCard";
import GroupForm from "../../components/Groups/GroupForm";
import GroupTipsCard from "../../components/Groups/GroupTipsCard";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { isDeniedAccess } from "../../utils/error.utils";

const GroupsIndex: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const {
    data: groupsData,
    loading: groupsLoading,
    error: groupsError,
  } = useGroupsQuery({
    errorPolicy: "all",
    skip: !isLoggedIn,
  });

  const {
    data: publicGroupsData,
    loading: publicGroupsLoading,
    error: publicGroupsError,
  } = usePublicGroupsQuery({
    errorPolicy: "all",
    skip: isLoggedIn,
  });

  const { t } = useTranslation();

  if (groupsLoading || publicGroupsLoading) {
    return <ProgressBar />;
  }

  // TODO: See if there's a better way to handle partial data with errors
  if (!groupsData && !publicGroupsData) {
    if (isDeniedAccess(groupsError || publicGroupsError)) {
      return <Typography>{t("prompts.permissionDenied")}</Typography>;
    }

    if (groupsError) {
      return <Typography>{t("errors.somethingWentWrong")}</Typography>;
    }
    return null;
  }

  if (!isLoggedIn && publicGroupsData) {
    return (
      <>
        <GroupTipsCard />

        {publicGroupsData.publicGroups.map((group) => (
          <GroupCard group={group} key={group.id} />
        ))}
      </>
    );
  }

  if (!groupsData) {
    return null;
  }

  const { groups, me } = groupsData;

  return (
    <>
      <LevelOneHeading header>
        {t("groups.headers.discoverGroups")}
      </LevelOneHeading>

      <GroupForm />

      {groups.map((group) => (
        <GroupCard group={group} currentUserId={me?.id} key={group.id} />
      ))}
    </>
  );
};

export default GroupsIndex;
