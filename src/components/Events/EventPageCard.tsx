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
import CoverPhoto from "../Images/CoverPhoto";

export const enum EventTabs {
  About = "about",
  Discussion = "discussion",
}

const NameText = styled(Typography)(() => ({
  fontFamily: "Inter Bold",
  marginBottom: 7.5,
}));
const CardContent = styled(MuiCardContent)(() => ({
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

  const { id, name, coverPhoto } = event;
  const eventPagePath = `${NavigationPaths.Events}/${id}`;
  const discussionTabPath = `${eventPagePath}${TAB_QUERY_PARAM}${EventTabs.Discussion}`;

  const getNameTextWidth = () => {
    if (isAboveMedium) {
      return "75%";
    }
    if (isAboveSmall) {
      return "70%";
    }
    return "100%";
  };

  const nameTextStyles: SxProps = {
    width: getNameTextWidth(),
    marginBottom: 1,
  };

  return (
    <Card>
      <CoverPhoto imageId={coverPhoto?.id} />
      <CardContent>
        <NameText color="primary" variant="h6" sx={nameTextStyles}>
          {name}
        </NameText>
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
