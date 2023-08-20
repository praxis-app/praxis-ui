// TODO: Add basic functionality for sharing. Below is a WIP

import { Comment, Favorite as LikeIcon, Reply } from "@mui/icons-material";
import { Box, CardActions, Divider, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  PostCardFooterFragment,
  useDeleteLikeMutation,
  useLikePostMutation,
  usePostCommentsLazyQuery,
} from "../../apollo/gen";
import { TypeNames } from "../../constants/common.constants";
import { Blurple } from "../../styles/theme";
import { inDevToast } from "../../utils/common.utils";
import CommentForm from "../Comments/CommentForm";
import CommentsList from "../Comments/CommentList";
import CardFooterButton from "../Shared/CardFooterButton";
import Flex from "../Shared/Flex";
import { BASE_BADGE_STYLES } from "../Votes/VoteBadge";

const ICON_STYLES: SxProps = {
  marginRight: "0.4ch",
};
const ROTATED_ICON_STYLES: SxProps = {
  ...ICON_STYLES,
  transform: "rotateY(180deg)",
};

interface Props {
  post: PostCardFooterFragment;
}

const PostCardFooter = ({ post: { id, likesCount, isLikedByMe } }: Props) => {
  const [likePost, { loading: likePostLoading }] = useLikePostMutation();
  const [unlikePost, { loading: unlikePostLoading }] = useDeleteLikeMutation();

  const [getPostComments, { data: postCommentsData }] =
    usePostCommentsLazyQuery();

  const { t } = useTranslation();

  const isLoading = likePostLoading || unlikePostLoading;

  const badgeStyles: SxProps = {
    ...BASE_BADGE_STYLES,
    width: 22.5,
    height: 22.5,
    marginRight: 0.9,
  };
  const likeButtonIconStyles: SxProps =
    isLikedByMe && !isLoading
      ? {
          ...ICON_STYLES,
          color: Blurple.Marina,
        }
      : ICON_STYLES;

  const handleLikeButtonClick = async () => {
    const variables = { likeData: { postId: id } };
    if (isLikedByMe) {
      unlikePost({
        variables,
        update(cache) {
          cache.modify({
            id: cache.identify({ __typename: TypeNames.Post, id }),
            fields: {
              isLikedByMe: () => false,
              likesCount: (existingCount: number) => existingCount - 1,
            },
          });
        },
      });
      return;
    }
    await likePost({ variables });
  };

  const handleCommentButtonClick = async () =>
    await getPostComments({ variables: { id } });

  return (
    <Box marginTop={likesCount ? 1.25 : 2}>
      <Box paddingX="16px">
        {!!likesCount && (
          <Flex marginBottom={0.8}>
            <Box sx={badgeStyles}>
              <LikeIcon
                color="primary"
                sx={{ fontSize: 13, marginTop: 0.65 }}
              />
            </Box>
            {likesCount}
          </Flex>
        )}
        <Divider />
      </Box>

      <CardActions sx={{ justifyContent: "space-around" }}>
        <CardFooterButton
          sx={isLikedByMe ? { color: Blurple.Marina } : {}}
          disabled={isLoading}
          onClick={handleLikeButtonClick}
        >
          <LikeIcon sx={likeButtonIconStyles} />
          {t("actions.like")}
        </CardFooterButton>

        <CardFooterButton onClick={handleCommentButtonClick}>
          <Comment sx={ROTATED_ICON_STYLES} />
          {t("actions.comment")}
        </CardFooterButton>

        <CardFooterButton onClick={inDevToast}>
          <Reply sx={ROTATED_ICON_STYLES} />
          {t("actions.share")}
        </CardFooterButton>
      </CardActions>

      {postCommentsData && (
        <Box paddingX="16px">
          <Divider sx={{ marginBottom: 1.25 }} />
          <CommentForm postId={id} />
          <CommentsList comments={postCommentsData.post.comments} />
        </Box>
      )}
    </Box>
  );
};

export default PostCardFooter;
