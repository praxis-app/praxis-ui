// TODO: Add remaining layout and functionality - below is a WIP

import { useTranslation } from "react-i18next";
import {
  FollowButtonFragment,
  MeQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} from "../../apollo/gen";
import { TypeNames } from "../../constants/common.constants";
import GhostButton from "../Shared/GhostButton";

interface Props {
  me: MeQuery["me"];
  user: FollowButtonFragment;
}

const FollowButton = ({ user: { id, isFollowedByMe }, me }: Props) => {
  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();
  const { t } = useTranslation();

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
            id: cache.identify({ ...typename, id: me.id }),
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
    <GhostButton sx={{ marginRight: 0.5 }} onClick={handleClick}>
      {isFollowedByMe ? t("users.actions.unfollow") : t("users.actions.follow")}
    </GhostButton>
  );
};

export default FollowButton;
