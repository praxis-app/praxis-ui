// TODO: Add basic functionality for comments and sharing. Below is a WIP

import { Reference } from "@apollo/client";
import { Comment, Favorite, Reply } from "@mui/icons-material";
import { Box, CardActions, Divider, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  MeQuery,
  PostCardFooterFragment,
  useDeleteLikeMutation,
  useLikePostMutation,
} from "../../apollo/gen";
import { TypeNames } from "../../constants/common.constants";
import { Blurple } from "../../theme";
import { inDevToast } from "../../utils/common.utils";
import CardFooterButton from "../Shared/CardFooterButton";
import Flex from "../Shared/Flex";
import { BASE_CHIP_STYLES } from "../Votes/VoteChip";

const ICON_STYLES: SxProps = {
  marginRight: "0.4ch",
};

const ROTATED_ICON_STYLES = {
  ...ICON_STYLES,
  transform: "rotateY(180deg)",
};

interface Props {
  post: PostCardFooterFragment;
  me: MeQuery["me"];
}

const PostCardFooter = ({ post: { id, likes, likesCount }, me }: Props) => {
  const [likePost, { loading: likePostLoading }] = useLikePostMutation();
  const [unlikePost, { loading: unlikePostLoading }] = useDeleteLikeMutation();
  const { t } = useTranslation();

  // TODO: This should be handled by the BE
  const likedByMe = likes.find((like) => like.user.id === me.id);

  const chipStyles: SxProps = {
    ...BASE_CHIP_STYLES,
    width: 22.5,
    height: 22.5,
    marginRight: 0.9,
  };
  const likeButtonIconStyles = likedByMe
    ? {
        ...ICON_STYLES,
        color: Blurple.Primary,
      }
    : ICON_STYLES;

  const handleLikeButtonClick = async () => {
    const variables = { likeData: { postId: id } };
    if (likedByMe) {
      unlikePost({
        variables,
        update(cache) {
          cache.modify({
            id: cache.identify({ __typename: TypeNames.Post, id }),
            fields: {
              likes(existingLikeRefs: Reference[], { readField }) {
                return existingLikeRefs.filter(
                  (ref) => readField("id", ref) !== id
                );
              },
              likesCount(existingCount: number) {
                return existingCount - 1;
              },
            },
          });
          const likeCacheId = cache.identify({
            __typename: TypeNames.Like,
            id: likedByMe.id,
          });
          cache.evict({ id: likeCacheId });
          cache.gc();
        },
      });
      return;
    }
    await likePost({ variables });
  };

  return (
    <Box marginTop={likesCount ? 1.25 : 2}>
      <Box paddingX="16px">
        {!!likesCount && (
          <Flex marginBottom={0.8}>
            <Box sx={chipStyles}>
              <Favorite
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
          sx={likedByMe ? { color: Blurple.Primary } : {}}
          disabled={likePostLoading || unlikePostLoading}
          onClick={handleLikeButtonClick}
        >
          <Favorite sx={likeButtonIconStyles} />
          {t("actions.like")}
        </CardFooterButton>
        <CardFooterButton onClick={inDevToast}>
          <Comment sx={ROTATED_ICON_STYLES} />
          {t("actions.comment")}
        </CardFooterButton>
        <CardFooterButton onClick={inDevToast}>
          <Reply sx={ROTATED_ICON_STYLES} />
          {t("actions.share")}
        </CardFooterButton>
      </CardActions>
    </Box>
  );
};

export default PostCardFooter;
