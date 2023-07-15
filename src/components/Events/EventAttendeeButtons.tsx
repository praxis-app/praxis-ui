import { ApolloCache } from "@apollo/client";
import { CheckCircle, Star } from "@mui/icons-material";
import {
  Button as MuiButton,
  ButtonProps,
  Stack,
  StackProps,
  styled,
} from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  EventAttendeeButtonsFragment,
  useCreateEventAttendeeMutation,
  useDeleteEventAttendeeMutation,
  useUpdateEventAttendeeMutation,
} from "../../apollo/gen";
import GhostButton from "../Shared/GhostButton";
import { BLURPLE_BUTTON_COLORS } from "../Shared/PrimaryActionButton";

enum EventAttendeeStatus {
  CoHost = "co-host",
  Going = "going",
  Host = "host",
  Interested = "interested",
}

const PrimaryButton = styled(MuiButton)(({ theme }) => ({
  ...BLURPLE_BUTTON_COLORS,
  color: theme.palette.text.primary,
  fontFamily: "Inter Bold",
  letterSpacing: "0.3px",
  padding: "6px 16px",
  textTransform: "none",
  borderRadius: 8,
}));

interface Props extends StackProps {
  event: EventAttendeeButtonsFragment;
  withGoingButton?: boolean;
  itemMenu?: ReactNode;
}

const EventAttendeeButtons = ({
  event: { id, attendingStatus, __typename },
  withGoingButton = true,
  itemMenu,
  ...stackProps
}: Props) => {
  const [createEventAttendee, { loading: createAttendeeLoading }] =
    useCreateEventAttendeeMutation();
  const [deleteEventAttendee, { loading: deleteAttendeeLoading }] =
    useDeleteEventAttendeeMutation();
  const [updateEventAttendee, { loading: updateAttendeeLoading }] =
    useUpdateEventAttendeeMutation();

  const { t } = useTranslation();

  const isLoading =
    createAttendeeLoading || updateAttendeeLoading || deleteAttendeeLoading;

  const isGoing = attendingStatus === EventAttendeeStatus.Going;
  const isHosting = attendingStatus === EventAttendeeStatus.Host;
  const isInterested = attendingStatus === EventAttendeeStatus.Interested;

  const GoingButton = isGoing ? PrimaryButton : GhostButton;
  const InterestedButton = isInterested ? PrimaryButton : GhostButton;

  const removeAttendee = (cache: ApolloCache<any>) => {
    cache.modify({
      id: cache.identify({ id, __typename }),
      fields: { attendingStatus: () => null },
    });
  };

  const handleInterestedButtonClick = async () => {
    if (isInterested) {
      await deleteEventAttendee({
        variables: { eventId: id },
        update: removeAttendee,
      });
      return;
    }
    const variables = {
      eventAttendeeData: {
        status: EventAttendeeStatus.Interested,
        eventId: id,
      },
    };
    if (isGoing) {
      await updateEventAttendee({ variables });
      return;
    }
    await createEventAttendee({ variables });
  };

  const handleGoingButtonClick = async () => {
    if (isGoing) {
      await deleteEventAttendee({
        variables: { eventId: id },
        update: removeAttendee,
      });
      return;
    }
    const variables = {
      eventAttendeeData: {
        status: EventAttendeeStatus.Going,
        eventId: id,
      },
    };
    if (isInterested) {
      await updateEventAttendee({ variables });
      return;
    }
    await createEventAttendee({ variables });
  };

  const interestedButtonProps: ButtonProps = {
    disabled: isLoading || isHosting,
    onClick: handleInterestedButtonClick,
    startIcon: <Star />,
  };

  if (!withGoingButton) {
    return (
      <InterestedButton {...interestedButtonProps}>
        {t("events.labels.interested")}
      </InterestedButton>
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
      <InterestedButton {...interestedButtonProps}>
        {t("events.labels.interested")}
      </InterestedButton>

      <GoingButton
        disabled={isLoading || isHosting}
        onClick={handleGoingButtonClick}
        startIcon={<CheckCircle />}
      >
        {t("events.labels.going")}
      </GoingButton>

      {itemMenu}
    </Stack>
  );
};

export default EventAttendeeButtons;
