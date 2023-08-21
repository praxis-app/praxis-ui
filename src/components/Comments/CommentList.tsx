import { Box } from "@mui/material";
import { CommentFragment } from "../../apollo/gen";
import Comment from "./Comment";

interface Props {
  comments: CommentFragment[];
  currentUserId?: number;
}

const CommentsList = ({ comments, currentUserId }: Props) => (
  <Box marginBottom={1.5}>
    {comments.map((comment) => (
      <Comment
        key={comment.id}
        comment={comment}
        currentUserId={currentUserId}
      />
    ))}
  </Box>
);

export default CommentsList;
