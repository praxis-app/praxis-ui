import { Flag, Language, Place, Timer } from "@mui/icons-material";
import { Box, Divider, SxProps, Typography } from "@mui/material";
import dayjs from "dayjs";
import humanizeDuration from "humanize-duration";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProposalActionEventFragment } from "../../../apollo/gen";
import { useAboveBreakpoint, useIsDesktop } from "../../../hooks/common.hooks";
import { getGroupEventsTabPath } from "../../../utils/group.utils";
import { formatDateTime } from "../../../utils/time.utils";
import EventAvatar from "../../Events/EventAvatar";
import CoverPhoto from "../../Images/CoverPhoto";
import Accordion, {
  AccordionDetails,
  AccordionSummary,
} from "../../Shared/Accordion";
import ExternalLink from "../../Shared/ExternalLink";
import Link from "../../Shared/Link";

interface Props {
  event: ProposalActionEventFragment;
}

const ProposalActionEvent = ({ event }: Props) => {
  const [showEvent, setShowEvent] = useState(false);

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();
  const isAboveSmall = useAboveBreakpoint("sm");

  const {
    name,
    description,
    externalLink,
    location,
    online,
    endsAt,
    startsAt,
    proposalAction,
    coverPhoto,
  } = event;

  const {
    proposal: { group },
  } = proposalAction;

  const groupEventsTabPath = getGroupEventsTabPath(group?.name || "");

  const startsAtFormatted = formatDateTime(startsAt);
  const endsAtFormatted = dayjs(endsAt).format(" [-] h:mm a");
  const startsAtWithEndsAt = `${startsAtFormatted}${endsAtFormatted}`;
  const isSameDay = endsAt && dayjs(startsAt).isSame(endsAt, "day");

  const difference = dayjs(endsAt).diff(startsAt);
  const duration = humanizeDuration(difference)
    .replace(/,/g, "")
    .replace(/hours|hour/g, t("time.hr"))
    .replace(/minutes|minute/g, t("time.min"));

  const accordionStyles: SxProps = {
    backgroundColor: "rgb(0, 0, 0, 0.1)",
    borderRadius: 2,
    paddingX: 2,
  };
  const iconStyles: SxProps = {
    fontSize: 20,
    marginBottom: "-0.3ch",
    marginRight: "0.8ch",
  };
  const eventAvatarStyles: SxProps = {
    marginTop: 0.6,
    marginRight: 0.7,
    marginLeft: 0.2,
  };

  const getNameTextWidth = () => {
    if (isDesktop) {
      return "75%";
    }
    if (isAboveSmall) {
      return "70%";
    }
    return "100%";
  };

  return (
    <Box marginBottom={2.5}>
      <Accordion
        expanded={showEvent}
        onChange={() => setShowEvent(!showEvent)}
        sx={accordionStyles}
      >
        <AccordionSummary>
          <Typography marginRight="0.5ch" fontFamily="Inter Bold">
            Proposed event:
          </Typography>
          <EventAvatar event={event} size={15} sx={eventAvatarStyles} />
          {name}
        </AccordionSummary>

        <AccordionDetails sx={{ marginBottom: isDesktop ? 2.5 : 3 }}>
          <CoverPhoto
            imageId={coverPhoto?.id}
            sx={{ marginBottom: 2.1, height: 125 }}
            rounded
          />

          <Typography
            color="#dd3f4f"
            fontSize="14px"
            fontFamily="Inter Bold"
            textTransform="uppercase"
            marginBottom={0.9}
          >
            {isSameDay ? startsAtWithEndsAt : startsAtFormatted}
          </Typography>

          <Typography
            color="primary"
            variant="h5"
            width={getNameTextWidth()}
            marginBottom={1.3}
          >
            {name}
          </Typography>

          {group && (
            <Typography color="text.secondary" gutterBottom>
              <Flag sx={iconStyles} />
              {t("events.labels.eventBy")}
              <Link href={groupEventsTabPath} sx={{ marginLeft: "0.4ch" }}>
                {group.name}
              </Link>
            </Typography>
          )}

          {location && (
            <Typography color="text.secondary" gutterBottom>
              <Place sx={iconStyles} />
              {location}
            </Typography>
          )}

          {endsAt && (
            <Typography color="text.secondary" gutterBottom>
              <Timer sx={iconStyles} />
              {t("events.labels.duration", { duration })}
            </Typography>
          )}

          {online && (
            <Typography color="text.secondary">
              <Language sx={iconStyles} />
              {externalLink
                ? t("events.labels.onlineWithColon") + " "
                : t("events.labels.onlineEvent")}
              {externalLink && (
                <ExternalLink href={externalLink}>{externalLink}</ExternalLink>
              )}
            </Typography>
          )}

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h6" gutterBottom>
            {t("events.headers.whatToExpect")}
          </Typography>

          <Typography>{description}</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProposalActionEvent;
