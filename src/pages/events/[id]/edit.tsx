// TODO: Add update functionality - below is a WIP

import { Typography } from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEditEventQuery } from "../../../apollo/gen";
import EventForm from "../../../components/Events/EventForm";
import Breadcrumbs from "../../../components/Shared/Breadcrumbs";
import Card from "../../../components/Shared/Card";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop } from "../../../hooks/common.hooks";
import { getGroupPath } from "../../../utils/group.utils";

const EditEvent: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEditEventQuery({
    variables: { id },
    skip: !id,
  });
  const event = data?.event;

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!event) {
    return null;
  }

  // TODO: Uncomment when permissions are implemented
  // if (!event.group?.myPermissions?.manageEvents) {
  //   return <Typography>{t("prompts.permissionDenied")}</Typography>;
  // }

  const breadcrumbs = [
    {
      label: truncate(event.name, {
        length: isDesktop ? TruncationSizes.Small : TruncationSizes.ExtraSmall,
      }),
      href: getGroupPath(event.name),
    },
    {
      label: t("groups.actions.edit"),
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Card>
        <EventForm editEvent={event} />
      </Card>
    </>
  );
};

export default EditEvent;
