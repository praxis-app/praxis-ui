// TODO: Add basic functionality for sharing. Below is a WIP

import { useReactiveVar } from "@apollo/client";
import { Comment, Favorite as LikeIcon, Reply } from "@mui/icons-material";
import { Box, CardActions, Divider, SxProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import { PostCardFragment, usePostCommentsLazyQuery } from "../../apollo/gen";
import { inDevToast } from "../../utils/common.utils";
import CommentForm from "../Comments/CommentForm";
import CommentsList from "../Comments/CommentList";
import CardFooterButton from "../Shared/CardFooterButton";
import Flex from "../Shared/Flex";
import { BASE_BADGE_STYLES } from "../Votes/VoteBadge";
import LikeButton from "./LikeButton";
import PostModal from "./PostModal";

export const ICON_STYLES: SxProps = {
  marginRight: "0.4ch",
};

const ROTATED_ICON_STYLES: SxProps = {
  ...ICON_STYLES,
  transform: "rotateY(180deg)",
};

const BADGE_STYLES: SxProps = {
  ...BASE_BADGE_STYLES,
  width: 22.5,
  height: 22.5,
  marginRight: 0.9,
};

interface Props {
  post: PostCardFragment;
  inModal: boolean;
}

const PostCardFooter = ({ post, inModal }: Props) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showComments, setShowComments] = useState(inModal);

  const [getPostComments, { data: postCommentsData }] =
    usePostCommentsLazyQuery();

  const { t } = useTranslation();

  useEffect(() => {
    if (inModal) {
      getPostComments({
        variables: { id: post.id, isLoggedIn },
      });
    }
  }, [inModal, post, isLoggedIn, getPostComments]);

  const { id, likesCount, commentCount, isLikedByMe } = post;
  const comments = postCommentsData?.post.comments;
  const me = postCommentsData?.me;

  const commentCountStyles: SxProps = {
    "&:hover": { textDecoration: "underline" },
    transform: "translateY(3px)",
    cursor: "pointer",
  };

  const handleCommentButtonClick = async () => {
    if (inModal) {
      return;
    }
    const { data } = await getPostComments({ variables: { id, isLoggedIn } });
    const comments = data?.post.comments;
    if (comments && comments.length > 1) {
      setIsModalOpen(true);
    } else {
      setShowComments(true);
    }
  };

  return (
    <Box marginTop={likesCount ? 1.25 : 2}>
      <Box paddingX="16px">
        <Flex
          justifyContent={likesCount ? "space-between" : "end"}
          marginBottom={likesCount || commentCount ? 0.8 : 0}
        >
          {!!likesCount && (
            <Flex>
              <Box sx={BADGE_STYLES}>
                <LikeIcon
                  color="primary"
                  sx={{ fontSize: 13, marginTop: 0.65 }}
                />
              </Box>
              {likesCount}
            </Flex>
          )}

          {!!commentCount && (
            <Typography
              color="text.secondary"
              onClick={handleCommentButtonClick}
              sx={commentCountStyles}
            >
              {t("comments.labels.xComments", { count: commentCount })}
            </Typography>
          )}
        </Flex>
        <Divider />
      </Box>

      <CardActions sx={{ justifyContent: "space-around" }}>
        <LikeButton postId={id} isLikedByMe={!!isLikedByMe} />

        <CardFooterButton onClick={handleCommentButtonClick}>
          <Comment sx={ROTATED_ICON_STYLES} />
          {t("actions.comment")}
        </CardFooterButton>

        <CardFooterButton onClick={inDevToast}>
          <Reply sx={ROTATED_ICON_STYLES} />
          {t("actions.share")}
        </CardFooterButton>
      </CardActions>

      {showComments && (
        <Box paddingX="16px">
          <Divider sx={{ marginBottom: 2 }} />
          <CommentsList comments={comments || []} currentUserId={me?.id} />
          <CommentForm postId={id} />
        </Box>
      )}

      <PostModal
        post={post}
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
};

export default PostCardFooter;
