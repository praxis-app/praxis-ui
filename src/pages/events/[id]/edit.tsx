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
import { getEventPath } from "../../../utils/event.utils";

const EditEvent: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEditEventQuery({
    variables: { id },
    skip: !id,
  });
  const event = data?.event;
  const group = event?.group;

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

  if (!group?.myPermissions.manageEvents) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

  const breadcrumbs = [
    {
      label: truncate(event.name, {
        length: isDesktop ? TruncationSizes.Small : TruncationSizes.ExtraSmall,
      }),
      href: getEventPath(event.id),
    },
    {
      label: t("events.actions.editEvent"),
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
