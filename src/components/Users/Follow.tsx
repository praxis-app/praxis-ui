import { Typography } from "@mui/material";
import { FollowFragment } from "../../apollo/gen";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import FollowButton from "./FollowButton";
import UserAvatar from "./UserAvatar";

interface Props {
  follow: FollowFragment;
  currentUserId: number;
}

const Follow = ({ follow: { user }, currentUserId }: Props) => {
  const isMe = user.id === currentUserId;
  return (
    <>
      <Link href={getUserProfilePath(user.name)}>
        <Flex>
          <UserAvatar user={user} sx={{ marginRight: 1.5 }} />
          <Typography sx={{ marginTop: 1 }}>{user.name}</Typography>
        </Flex>
      </Link>

      {!isMe && <FollowButton user={user} currentUserId={currentUserId} />}
    </>
  );
};

export default Follow;
