import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import { useGroupsQuery } from "../../apollo/gen";
import GroupCard from "../../components/Groups/GroupCard";
import GroupForm from "../../components/Groups/GroupForm";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { isDeniedAccess } from "../../utils/error.utils";

const GroupsIndex: NextPage = () => {
  const { data, loading, error } = useGroupsQuery();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { t } = useTranslation();

  if (isDeniedAccess(error)) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  const { groups, me } = data;

  return (
    <>
      <LevelOneHeading header>
        {t("groups.headers.discoverGroups")}
      </LevelOneHeading>

      {isLoggedIn && <GroupForm />}

      {groups.map((group) => (
        <GroupCard group={group} currentUserId={me?.id} key={group.id} />
      ))}
    </>
  );
};

export default GroupsIndex;
