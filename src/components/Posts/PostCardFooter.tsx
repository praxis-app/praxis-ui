// TODO: Add basic functionality for sharing. Below is a WIP

import { useReactiveVar } from "@apollo/client";
import { Comment, Favorite as LikeIcon, Reply } from "@mui/icons-material";
import { Box, CardActions, Divider, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import {
  PostCardFooterFragment,
  usePostCommentsLazyQuery,
} from "../../apollo/gen";
import { inDevToast } from "../../utils/common.utils";
import CommentForm from "../Comments/CommentForm";
import CommentsList from "../Comments/CommentList";
import CardFooterButton from "../Shared/CardFooterButton";
import Flex from "../Shared/Flex";
import { BASE_BADGE_STYLES } from "../Votes/VoteBadge";
import LikeButton from "./LikeButton";

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
  post: PostCardFooterFragment;
}

const PostCardFooter = ({ post: { id, likesCount, isLikedByMe } }: Props) => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [getPostComments, { data: postCommentsData }] =
    usePostCommentsLazyQuery();

  const { t } = useTranslation();

  const handleCommentButtonClick = async () =>
    await getPostComments({ variables: { id, isLoggedIn } });

  return (
    <Box marginTop={likesCount ? 1.25 : 2}>
      <Box paddingX="16px">
        {!!likesCount && (
          <Flex marginBottom={0.8}>
            <Box sx={BADGE_STYLES}>
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

      {postCommentsData && (
        <Box paddingX="16px">
          <Divider sx={{ marginBottom: 1.25 }} />
          <CommentsList
            comments={postCommentsData.post.comments}
            currentUserId={postCommentsData.me?.id}
          />
          <CommentForm postId={id} />
        </Box>
      )}
    </Box>
  );
};

export default PostCardFooter;
