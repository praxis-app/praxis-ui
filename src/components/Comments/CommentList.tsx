import { Box } from "@mui/material";
import { CommentFragment } from "../../apollo/gen";
import Comment from "./Comment";

interface Props {
  canManageComments: boolean;
  comments: CommentFragment[];
  currentUserId?: number;
  postId?: number;
  proposalId?: number;
}

const CommentsList = ({
  canManageComments,
  comments,
  currentUserId,
  proposalId,
  postId,
}: Props) => {
  if (!comments.length) {
    return null;
  }
  return (
    <Box marginBottom={1.5}>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          canManageComments={canManageComments}
          comment={comment}
          currentUserId={currentUserId}
          proposalId={proposalId}
          postId={postId}
        />
      ))}
    </Box>
  );
};

export default CommentsList;
