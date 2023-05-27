// TODO: Add basic functionality for events - below is a WIP

import { Typography } from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useGroupSettingsQuery } from "../../../apollo/gen";
import Breadcrumbs from "../../../components/Shared/Breadcrumbs";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop } from "../../../hooks/common.hooks";
import { getGroupPath } from "../../../utils/group.utils";

const GroupSettings: NextPage = () => {
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  const { query } = useRouter();
  const name = String(query?.name || "");

  const { data, loading, error } = useGroupSettingsQuery({
    variables: { name },
    skip: !name,
  });

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  const breadcrumbs = [
    {
      label: truncate(name, {
        length: isDesktop ? TruncationSizes.Small : TruncationSizes.ExtraSmall,
      }),
      href: getGroupPath(name),
    },
    {
      label: t("groups.labels.groupSettings"),
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Typography marginTop={3}>
        {JSON.stringify(data.group.settings)}
      </Typography>
    </>
  );
};

export default GroupSettings;
