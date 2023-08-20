import { Box } from "@mui/material";
import { CommentFragment } from "../../apollo/gen";
import Comment from "./Comment";

interface Props {
  comments: CommentFragment[];
}

const CommentsList = ({ comments }: Props) => (
  <Box marginBottom={1.5}>
    {comments.map((comment) => (
      <Comment key={comment.id} comment={comment} />
    ))}
  </Box>
);

export default CommentsList;
