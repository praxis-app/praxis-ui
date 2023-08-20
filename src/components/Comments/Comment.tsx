import { Box, Typography } from "@mui/material";
import { CommentFragment } from "../../apollo/gen";
import { getUserProfilePath } from "../../utils/user.utils";
import Link from "../Shared/Link";

interface Props {
  comment: CommentFragment;
}

const Comment = ({ comment: { user, body } }: Props) => {
  const userPath = getUserProfilePath(user.name);

  return (
    <Box
      sx={{ backgroundColor: "#38393a" }}
      borderRadius={4}
      paddingX={1.5}
      paddingY={1}
    >
      <Link href={userPath}>{user.name}</Link>
      <Typography>{body}</Typography>
    </Box>
  );
};

export default Comment;
