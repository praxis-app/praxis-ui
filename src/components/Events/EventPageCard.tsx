import { Flag, Place } from "@mui/icons-material";
import {
  Card,
  CardContent as MuiCardContent,
  CardProps,
  Divider,
  styled,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
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
  event: { id, name, coverPhoto, startsAt, endsAt, location, group },
  setTab,
  tab,
}: Props) => {
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
  const showEndsAt = endsAt && dayjs(startsAt).isSame(endsAt, "day");

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
          color="text.secondary"
          fontSize="14px"
          lineHeight={1}
          variant="overline"
        >
          {showEndsAt ? startsAtWithEndsAt : startsAtFormatted}
        </Typography>
        <NameText
          color="primary"
          variant="h6"
          width={getNameTextWidth()}
          marginBottom={1}
          marginTop={0.3}
        >
          {name}
        </NameText>

        {location && (
          <Typography color="text.secondary" gutterBottom>
            <Place
              sx={{
                marginRight: "0.8ch",
                marginBottom: "-0.3ch",
              }}
              fontSize="small"
            />
            {location}
          </Typography>
        )}

        {group && (
          <Typography color="text.secondary">
            <Flag
              sx={{
                marginRight: "0.8ch",
                marginBottom: "-0.3ch",
              }}
              fontSize="small"
            />
            {t("events.labels.eventBy")}
            <Link href={groupPagePath} sx={{ marginLeft: "0.4ch" }}>
              {group.name}
            </Link>
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
