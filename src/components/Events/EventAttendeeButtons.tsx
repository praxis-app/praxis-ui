import { CheckCircle, Star } from "@mui/icons-material";
import { Stack, StackProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  EventAttendeeButtonsFragment,
  useCreateEventAttendeeMutation,
  useDeleteEventAttendeeMutation,
} from "../../apollo/gen";
import GhostButton from "../Shared/GhostButton";

enum EventAttendeeStatus {
  CoHost = "co-host",
  Going = "going",
  Host = "host",
  Interested = "interested",
}

interface Props extends StackProps {
  event: EventAttendeeButtonsFragment;
  withGoingButton?: boolean;
}

const EventAttendeeButtons = ({
  event: { id, attendingStatus },
  withGoingButton = true,
  ...stackProps
}: Props) => {
  const [createEventAttendee, { loading: createAttendeeLoading }] =
    useCreateEventAttendeeMutation();
  const [deleteEventAttendee, { loading: deleteAttendeeLoading }] =
    useDeleteEventAttendeeMutation();

  const { t } = useTranslation();

  const isLoading = createAttendeeLoading || deleteAttendeeLoading;
  const isHost = attendingStatus === EventAttendeeStatus.Host;

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

  return (
    <Stack
      direction="row"
      marginBottom={2}
      marginTop={1.5}
      spacing={1}
      {...stackProps}
    >
      <GhostButton
        disabled={isLoading || isHost}
        onClick={handleInterestedButtonClick}
        startIcon={<Star />}
      >
        {t("events.labels.interested")}
      </GhostButton>

      {withGoingButton && (
        <GhostButton
          disabled={isLoading || isHost}
          onClick={handleGoingButtonClick}
          startIcon={<CheckCircle />}
        >
          {t("events.labels.going")}
        </GhostButton>
      )}
    </Stack>
  );
};

export default EventAttendeeButtons;
