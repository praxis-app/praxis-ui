// TODO: Add remaining tabs functionality

import {
  Card,
  CardContent as MuiCardContent,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useEventsQuery } from "../../apollo/gen";
import Event from "../../components/Events/Event";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 16,
  },
}));

const EventsIndex: NextPage = () => {
  const [tab, setTab] = useState(0);
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

  const { events } = data;

  const handleTabChange = (_: any, value: number) => setTab(value);

  return (
    <>
      <LevelOneHeading header>
        {t("events.headers.discoverEvents")}
      </LevelOneHeading>

      <Card>
        <Tabs textColor="inherit" value={tab} onChange={handleTabChange}>
          <Tab label={t("events.labels.upcoming")} />
          <Tab label={t("events.labels.thisWeek")} />
          <Tab label={t("events.labels.online")} />
          <Tab label={t("events.labels.past")} />
        </Tabs>
      </Card>

      <Card>
        <CardContent>
          {events.map((event, index) => (
            <Event
              key={event.id}
              event={event}
              isLast={index + 1 === events.length}
            />
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default EventsIndex;
