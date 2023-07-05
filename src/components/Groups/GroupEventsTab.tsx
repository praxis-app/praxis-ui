import { Event as CalendarIcon } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useGroupEventsTabQuery } from "../../apollo/gen";
import { DarkMode } from "../../styles/theme";
import Event from "../Events/Event";
import EventForm from "../Events/EventForm";
import Center from "../Shared/Center";
import GhostButton from "../Shared/GhostButton";
import Modal from "../Shared/Modal";
import ProgressBar from "../Shared/ProgressBar";

interface Props {
  groupId: number;
}

const GroupEventsTab = ({ groupId }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, loading, error } = useGroupEventsTabQuery({
    variables: { groupId },
  });

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

  const {
    group: { name, upcomingEvents },
  } = data;

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant="h6">
              {t("events.headers.upcomingEvents")}
            </Typography>
          }
          action={
            <GhostButton
              onClick={() => setIsModalOpen(true)}
              sx={{ marginRight: 0.5, marginTop: 0.5 }}
            >
              {t("events.actions.createEvent")}
            </GhostButton>
          }
        />
        <CardContent>
          {!upcomingEvents.length && (
            <>
              <Center marginBottom={1} marginTop={2}>
                <CalendarIcon sx={{ fontSize: 80, color: DarkMode.Liver }} />
              </Center>
              <Typography textAlign="center" marginBottom={4}>
                {t("events.prompts.noUpcomingEvents")}
              </Typography>
            </>
          )}

          {upcomingEvents.map((event, index) => (
            <Event
              key={event.id}
              event={event}
              isLast={index + 1 === upcomingEvents.length}
            />
          ))}
        </CardContent>
      </Card>

      <Modal
        subtext={name}
        title={t("events.actions.createEvent")}
        onClose={() => setIsModalOpen(false)}
        open={isModalOpen}
      >
        <EventForm groupId={groupId} />
      </Modal>
    </>
  );
};

export default GroupEventsTab;
