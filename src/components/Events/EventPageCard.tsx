import { Flag, Place, Timer } from "@mui/icons-material";
import {
  Card,
  CardContent as MuiCardContent,
  CardProps,
  Divider,
  styled,
  SxProps,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import humanizeDuration from "humanize-duration";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { EventPageCardFragment } from "../../apollo/gen";
import {
  NavigationPaths,
  TAB_QUERY_PARAM,
} from "../../constants/common.constants";
import { useAboveBreakpoint } from "../../hooks/common.hooks";
import { redirectTo } from "../../utils/common.utils";
import { formatDateTime } from "../../utils/time.utils";
import CoverPhoto from "../Images/CoverPhoto";
import Link from "../Shared/Link";
import EventAttendeeButtons from "./EventAttendeeButtons";

enum EventTabs {
  About = "about",
  Discussion = "discussion",
}

const NameText = styled(Typography)(() => ({
  fontFamily: "Inter Bold",
  marginBottom: 7.5,
}));
const CardContent = styled(MuiCardContent)(() => ({
  paddingTop: 14,
  "&:last-child": {
    paddingBottom: 16,
  },
}));

interface Props extends CardProps {
  event: EventPageCardFragment;
  setTab(tab: number): void;
  tab: number;
}

const EventPageCard = ({ event, setTab, tab }: Props) => {
  const { query } = useRouter();
  const { t } = useTranslation();
  const isAboveMedium = useAboveBreakpoint("md");
  const isAboveSmall = useAboveBreakpoint("sm");

  useEffect(() => {
    if (!query.tab) {
      return;
    }
    if (query.tab === EventTabs.Discussion) {
      setTab(1);
    }
  }, [query.tab, setTab]);

  const { id, name, coverPhoto, endsAt, group, location, startsAt } = event;

  const eventPagePath = `${NavigationPaths.Events}/${id}`;
  const groupPagePath = `${NavigationPaths.Groups}/${group?.name}`;
  const discussionTabPath = `${eventPagePath}${TAB_QUERY_PARAM}${EventTabs.Discussion}`;

  const startsAtFormatted = formatDateTime(startsAt);
  const endsAtFormatted = dayjs(endsAt).format(" [-] h:mm a");
  const startsAtWithEndsAt = `${startsAtFormatted}${endsAtFormatted}`;
  const isSameDay = endsAt && dayjs(startsAt).isSame(endsAt, "day");

  const difference = dayjs(endsAt).diff(startsAt);
  const duration = humanizeDuration(difference)
    .replace(/,/g, "")
    .replace(/hours|hour/g, t("time.hr"))
    .replace(/minutes|minute/g, t("time.min"));

  const iconStyles: SxProps = {
    fontSize: 20,
    marginBottom: "-0.3ch",
    marginRight: "0.8ch",
  };

  const getNameTextWidth = () => {
    if (isAboveMedium) {
      return "75%";
    }
    if (isAboveSmall) {
      return "70%";
    }
    return "100%";
  };

  return (
    <Card>
      <CoverPhoto imageId={coverPhoto?.id} />
      <CardContent>
        <Typography
          color="#dd3f4f"
          fontSize="14px"
          lineHeight={1}
          variant="overline"
          fontFamily="Inter Bold"
        >
          {isSameDay ? startsAtWithEndsAt : startsAtFormatted}
        </Typography>
        <NameText
          color="primary"
          variant="h5"
          width={getNameTextWidth()}
          marginTop={0.5}
        >
          {name}
        </NameText>

        <EventAttendeeButtons event={event} />

        {location && (
          <Typography color="text.secondary" gutterBottom>
            <Place sx={iconStyles} />
            {location}
          </Typography>
        )}

        {group && (
          <Typography color="text.secondary" gutterBottom>
            <Flag sx={iconStyles} />
            {t("events.labels.eventBy")}
            <Link href={groupPagePath} sx={{ marginLeft: "0.4ch" }}>
              {group.name}
            </Link>
          </Typography>
        )}

        {endsAt && (
          <Typography color="text.secondary">
            <Timer sx={iconStyles} />
            {t("events.labels.duration", { duration })}
          </Typography>
        )}
      </CardContent>

      <Divider sx={{ marginX: "16px", marginBottom: 0.25 }} />

      <Tabs
        onChange={(_: any, value: number) => setTab(value)}
        textColor="inherit"
        value={tab}
      >
        <Tab
          label={t("events.tabs.about")}
          onClick={() => redirectTo(eventPagePath)}
        />
        <Tab
          label={t("events.tabs.discussion")}
          onClick={() => redirectTo(discussionTabPath)}
        />
      </Tabs>
    </Card>
  );
};

export default EventPageCard;
