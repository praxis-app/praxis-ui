import { Box, Typography } from "@mui/material";
import { CommentFragment } from "../../apollo/gen";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

interface Props {
  comment: CommentFragment;
}

const Comment = ({ comment: { user, body } }: Props) => {
  const userPath = getUserProfilePath(user.name);

  return (
    <Flex marginBottom={1.25}>
      <UserAvatar
        sx={{ marginRight: 1, marginTop: 0.2 }}
        user={user}
        size={35}
      />

      <Box
        sx={{ backgroundColor: "#38393a" }}
        borderRadius={4}
        paddingX={1.5}
        paddingY={0.5}
      >
        <Link href={userPath}>{user.name}</Link>
        <Typography lineHeight={1.2}>{body}</Typography>
      </Box>
    </Flex>
  );
};

export default Comment;
