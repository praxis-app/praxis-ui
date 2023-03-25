import { Reference } from "@apollo/client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FollowButtonFragment,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../apollo/gen";
import { TypeNames } from "../../constants/common.constants";
import GhostButton from "../Shared/GhostButton";

interface Props {
  currentUserId: number;
  user: FollowButtonFragment;
}

const FollowButton = ({
  user: { id, isFollowedByMe },
  currentUserId,
}: Props) => {
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const [isHovering, setIsHovering] = useState(false);

  const { t } = useTranslation();

  const getButtonText = () => {
    if (isFollowedByMe) {
      if (isHovering) {
        return t("users.actions.unfollow");
      }
      return t("users.profile.following");
    }
    return t("users.actions.follow");
  };

  const handleClick = async () => {
    const typename = { __typename: TypeNames.User };
    const variables = { id };

    if (isFollowedByMe) {
      await unfollowUser({
        variables,
        update(cache) {
          cache.modify({
            id: cache.identify({ ...typename, id }),
            fields: {
              followers(existingRefs: Reference[], { readField }) {
                return existingRefs.filter(
                  (ref) => readField("id", ref) !== currentUserId
                );
              },
              followerCount(existingCount: number) {
                return existingCount - 1;
              },
              isFollowedByMe: () => false,
            },
          });
          cache.modify({
            id: cache.identify({ ...typename, id: currentUserId }),
            fields: {
              followingCount(existingCount: number) {
                return existingCount - 1;
              },
            },
          });
        },
      });
      return;
    }
    await followUser({ variables });
  };

  const handleClickWithPrompt = () =>
    window.confirm(t("users.prompts.unfollow")) && handleClick();

  return (
    <GhostButton
      onClick={isFollowedByMe ? handleClickWithPrompt : handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{ marginRight: 0.5 }}
    >
      {getButtonText()}
    </GhostButton>
  );
};

export default FollowButton;
