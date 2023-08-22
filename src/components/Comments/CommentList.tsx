import { Box } from "@mui/material";
import { CommentFragment } from "../../apollo/gen";
import Comment from "./Comment";

interface Props {
  comments: CommentFragment[];
  currentUserId?: number;
  postId?: number;
}

const CommentsList = ({ comments, currentUserId, postId }: Props) => {
  if (!comments.length) {
    return null;
  }
  return (
    <Box marginBottom={1.5}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUserId={currentUserId}
          postId={postId}
        />
      ))}
    </Box>
  );
};

export default CommentsList;
