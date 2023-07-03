// TODO: Add basic functionality for events - below is a WIP

import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { useEventsQuery } from "../../apollo/gen";
import Event from "../../components/Events/Event";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";

const EventsIndex: NextPage = () => {
  const { data, loading, error } = useEventsQuery();
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

  return (
    <>
      <LevelOneHeading header>
        {t("events.headers.discoverEvents")}
      </LevelOneHeading>

      {data.events.map((event) => (
        <Event key={event.id} event={event} />
      ))}
    </>
  );
};

export default EventsIndex;
