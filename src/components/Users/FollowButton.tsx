// TODO: Add remaining layout and functionality - below is a WIP

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
    const variables = { followedUserId: id };
    const typename = { __typename: TypeNames.User };

    if (isFollowedByMe) {
      await unfollowUser({
        variables,
        update(cache) {
          cache.modify({
            id: cache.identify({ ...typename, id }),
            fields: {
              isFollowedByMe: () => false,
              followerCount(existingCount: number) {
                return existingCount - 1;
              },
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

  return (
    <GhostButton
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{ marginRight: 0.5 }}
    >
      {getButtonText()}
    </GhostButton>
  );
};

export default FollowButton;
