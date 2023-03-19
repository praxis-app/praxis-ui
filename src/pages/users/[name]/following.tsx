// TODO: Add remaining layout and functionality - below is a WIP

import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useFollowingQuery } from "../../../apollo/gen";
import ProgressBar from "../../../components/Shared/ProgressBar";

const Following: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useFollowingQuery({
    variables: { name },
    skip: !name,
  });

  const { t } = useTranslation();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  return <>{JSON.stringify(data)}</>;
};

export default Following;
