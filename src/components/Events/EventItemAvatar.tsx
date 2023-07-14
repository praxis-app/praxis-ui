import { Avatar, Box, SxProps, useTheme } from "@mui/material";
import { EventItemAvatarFragment, UserAvatarFragment } from "../../apollo/gen";
import { getEventPath } from "../../utils/event.utils";
import { getImagePath } from "../../utils/image.utils";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

interface Props {
  event: EventItemAvatarFragment;
  user: UserAvatarFragment;
}

const EventItemAvatar = ({ user, event }: Props) => {
  const theme = useTheme();

  const eventPagePath = getEventPath(event.id);
  const imagePath = event.coverPhoto
    ? getImagePath(event.coverPhoto.id)
    : undefined;

  const avatarStyles: SxProps = {
    border: `2px solid ${theme.palette.background.paper}`,
    position: "absolute",
    top: 18.5,
    left: 22,
  };

  return (
    <Box position="relative" marginRight={0.25}>
      <Link href={eventPagePath}>
        <Avatar src={imagePath} alt={event.name} />
      </Link>
      <UserAvatar sx={avatarStyles} size={24} user={user} withLink />
    </Box>
  );
};

export default EventItemAvatar;
