import { CheckCircle } from "@mui/icons-material";
import { ButtonProps, Stack, StackProps } from "@mui/material";
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
  const isGoing = attendingStatus === EventAttendeeStatus.Going;
  const isHosting = attendingStatus === EventAttendeeStatus.Host;
  const isInterested = attendingStatus === EventAttendeeStatus.Interested;

  const handleInterestedButtonClick = async () => {
    if (isInterested) {
      await deleteEventAttendee({ variables: { eventId: id } });
      return;
    }
    if (isGoing) {
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
    if (isGoing) {
      await deleteEventAttendee({ variables: { eventId: id } });
      return;
    }
    if (isInterested) {
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

  const interestedButtonProps: ButtonProps = {
    disabled: isLoading || isHosting,
    onClick: handleInterestedButtonClick,
    startIcon: <CheckCircle />,
  };

  if (!withGoingButton) {
    return (
      <GhostButton {...interestedButtonProps}>
        {t("events.labels.interested")}
      </GhostButton>
    );
  }

  return (
    <Stack
      direction="row"
      marginBottom={2}
      marginTop={1.5}
      spacing={1}
      {...stackProps}
    >
      <GhostButton {...interestedButtonProps}>
        {t("events.labels.interested")}
      </GhostButton>

      <GhostButton
        disabled={isLoading || isHosting}
        onClick={handleGoingButtonClick}
        startIcon={<CheckCircle />}
      >
        {t("events.labels.going")}
      </GhostButton>
    </Stack>
  );
};

export default EventAttendeeButtons;
