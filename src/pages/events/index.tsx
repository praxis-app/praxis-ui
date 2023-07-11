import {
  Card,
  CardContent as MuiCardContent,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EventsInput, useEventsLazyQuery } from "../../apollo/gen";
import Event from "../../components/Events/Event";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import {
  NavigationPaths,
  TAB_QUERY_PARAM,
} from "../../constants/common.constants";
import { redirectTo } from "../../utils/common.utils";

enum EventTabs {
  Past = "past",
  Future = "future",
  ThisWeek = "this-week",
  Online = "online",
}

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 16,
  },
}));

const EventsIndex: NextPage = () => {
  const [getEvents, { data, loading, error }] = useEventsLazyQuery();
  const [tab, setTab] = useState(0);

  const { t } = useTranslation();
  const { query } = useRouter();

  useEffect(() => {
    let filter: EventsInput = {};
    if (!query.tab) {
      filter = { timeFrame: EventTabs.Future };
    }
    if (query.tab === EventTabs.ThisWeek) {
      filter = { timeFrame: EventTabs.ThisWeek };
      setTab(1);
    }
    if (query.tab === EventTabs.Online) {
      filter = { timeFrame: EventTabs.Future, online: true };
      setTab(2);
    }
    if (query.tab === EventTabs.Past) {
      filter = { timeFrame: EventTabs.Past };
      setTab(3);
    }
    getEvents({ variables: { filter } });
  }, [query.tab, setTab, getEvents]);

  const pathPrefix = `${NavigationPaths.Events}${TAB_QUERY_PARAM}`;
  const thisWeekTabPath = `${pathPrefix}${EventTabs.ThisWeek}`;
  const onlineTabPath = `${pathPrefix}${EventTabs.Online}`;
  const pastTabPath = `${pathPrefix}${EventTabs.Past}`;

  const handleTabChange = async (_: any, value: number) => setTab(value);

  return (
    <>
      <LevelOneHeading header>
        {t("events.headers.discoverEvents")}
      </LevelOneHeading>

      <Card>
        <Tabs textColor="inherit" value={tab} onChange={handleTabChange}>
          <Tab
            label={t("events.labels.upcoming")}
            onClick={() => redirectTo(NavigationPaths.Events)}
          />
          <Tab
            label={t("events.labels.thisWeek")}
            onClick={() => redirectTo(thisWeekTabPath)}
          />
          <Tab
            label={t("events.labels.online")}
            onClick={() => redirectTo(onlineTabPath)}
          />
          <Tab
            label={t("events.labels.past")}
            onClick={() => redirectTo(pastTabPath)}
          />
        </Tabs>
      </Card>

      {error && <Typography>{t("errors.somethingWentWrong")}</Typography>}
      {loading && <ProgressBar />}

      {!!data?.events.length && (
        <Card>
          <CardContent>
            {data.events.map((event, index) => (
              <Event
                key={event.id}
                event={event}
                isLast={index + 1 === data.events.length}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default EventsIndex;
