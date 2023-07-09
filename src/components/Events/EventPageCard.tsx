import { CheckCircle, Flag, Place, Star, Timer } from "@mui/icons-material";
import {
  Card,
  CardContent as MuiCardContent,
  CardProps,
  Divider,
  Stack,
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
import {
  EventPageCardFragment,
  useCreateEventAttendeeMutation,
  useDeleteEventAttendeeMutation,
} from "../../apollo/gen";
import {
  NavigationPaths,
  TAB_QUERY_PARAM,
} from "../../constants/common.constants";
import { useAboveBreakpoint } from "../../hooks/common.hooks";
import { redirectTo } from "../../utils/common.utils";
import { formatDateTime } from "../../utils/time.utils";
import CoverPhoto from "../Images/CoverPhoto";
import GhostButton from "../Shared/GhostButton";
import Link from "../Shared/Link";

export enum EventAttendeeStatus {
  CoHost = "co-host",
  Going = "going",
  Host = "host",
  Interested = "interested",
}

export const enum EventTabs {
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

const EventPageCard = ({
  event: {
    id,
    name,
    attendingStatus,
    coverPhoto,
    endsAt,
    group,
    location,
    startsAt,
  },
  setTab,
  tab,
}: Props) => {
  const [createEventAttendee, { loading: createAttendeeLoading }] =
    useCreateEventAttendeeMutation();
  const [deleteEventAttendee, { loading: deleteAttendeeLoading }] =
    useDeleteEventAttendeeMutation();

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

  const isLoading = createAttendeeLoading || deleteAttendeeLoading;
  const isHost = attendingStatus === EventAttendeeStatus.Host;

  const iconStyles: SxProps = {
    fontSize: 20,
    marginBottom: "-0.3ch",
    marginRight: "0.8ch",
  };

  const handleGoingButtonClick = async () => {
    if (attendingStatus === EventAttendeeStatus.Going) {
      await deleteEventAttendee({ variables: { eventId: id } });
      return;
    }
    if (attendingStatus === EventAttendeeStatus.Interested) {
      // TODO: Add update logic here
      return;
    }
    await createEventAttendee({
      variables: {
        eventAttendeeData: {
          status: EventAttendeeStatus.Going,
          eventId: id,
        },
      },
    });
  };

  const handleInterestedButtonClick = async () => {
    if (attendingStatus === EventAttendeeStatus.Interested) {
      await deleteEventAttendee({ variables: { eventId: id } });
      return;
    }
    if (attendingStatus === EventAttendeeStatus.Going) {
      // TODO: Add update logic here
      return;
    }
    await createEventAttendee({
      variables: {
        eventAttendeeData: {
          status: EventAttendeeStatus.Interested,
          eventId: id,
        },
      },
    });
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

        <Stack direction="row" spacing={1} marginBottom={2} marginTop={1.5}>
          <GhostButton
            disabled={isLoading || isHost}
            onClick={handleInterestedButtonClick}
            startIcon={<Star />}
          >
            {t("events.labels.interested")}
          </GhostButton>
          <GhostButton
            disabled={isLoading || isHost}
            onClick={handleGoingButtonClick}
            startIcon={<CheckCircle />}
          >
            {t("events.labels.going")}
          </GhostButton>
        </Stack>

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
