// TODO: Add basic functionality for events - below is a WIP

import { Typography } from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "../../../components/Shared/Breadcrumbs";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop } from "../../../hooks/common.hooks";
import { getGroupPath } from "../../../utils/group.utils";

const EventsIndex: NextPage = () => {
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  const { query } = useRouter();
  const name = String(query?.name || "");

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
      <Typography marginTop={3}>{t("prompts.inDev")}</Typography>
    </>
  );
};

export default EventsIndex;
