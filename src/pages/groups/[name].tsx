// TODO: Add remaining layout and functionality - below is a WIP

import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import { useGroupProfileQuery } from "../../apollo/gen";
import GroupProfileCard from "../../components/Groups/GroupProfileCard";
import Feed from "../../components/Shared/Feed";
import ProgressBar from "../../components/Shared/ProgressBar";
import ToggleForms from "../../components/Shared/ToggleForms";
import { isDeniedAccess } from "../../utils/error.utils";

const GroupPage: NextPage = () => {
  const [tab, setTab] = useState(0);

  const { query } = useRouter();
  const name = String(query?.name || "");
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, loading, error } = useGroupProfileQuery({
    variables: { name, isLoggedIn },
    errorPolicy: "all",
    skip: !name,
  });

  const { t } = useTranslation();

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    if (isDeniedAccess(error)) {
      return <Typography>{t("prompts.permissionDenied")}</Typography>;
    }

    if (error) {
      return <Typography>{t("errors.somethingWentWrong")}</Typography>;
    }
    return null;
  }

  const { group, me } = data;
  const currentMemberId = me
    ? group.members.find((member) => member.id === me.id)?.id
    : undefined;

  return (
    <>
      <GroupProfileCard
        currentMemberId={currentMemberId}
        group={group}
        setTab={setTab}
        tab={tab}
      />

      {tab === 0 && (
        <>
          {me && currentMemberId && <ToggleForms groupId={group.id} me={me} />}
          <Feed feed={group.feed} />
        </>
      )}

      {tab === 1 && <Typography marginTop={5}>{t("prompts.inDev")}</Typography>}
      {tab === 2 && <Typography marginTop={5}>{t("prompts.inDev")}</Typography>}
      {tab === 3 && <Typography marginTop={5}>{t("prompts.inDev")}</Typography>}
    </>
  );
};

export default GroupPage;
