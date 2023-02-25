// TODO: Ensure EditGroup page is unreachable without role

import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEditGroupQuery } from "../../../apollo/gen";
import GroupForm from "../../../components/Groups/GroupForm";
import ProgressBar from "../../../components/Shared/ProgressBar";

const EditGroup: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useEditGroupQuery({
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

  return <GroupForm editGroup={data.group} />;
};

export default EditGroup;
