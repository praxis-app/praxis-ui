// TODO: Add remaining layout and functionality - below is a WIP

import { useTranslation } from "react-i18next";
import { FollowButtonFragment, useFollowUserMutation } from "../../apollo/gen";
import GhostButton from "../Shared/GhostButton";

interface Props {
  user: FollowButtonFragment;
}

const FollowButton = ({ user: { id, isFollowedByMe } }: Props) => {
  const [followUser] = useFollowUserMutation();
  const { t } = useTranslation();

  const handleClick = async () => {
    if (isFollowedByMe) {
      return;
    }
    await followUser({
      variables: { followedUserId: id },
    });
  };

  return (
    <GhostButton sx={{ marginRight: 0.5 }} onClick={handleClick}>
      {isFollowedByMe ? t("users.actions.unfollow") : t("users.actions.follow")}
    </GhostButton>
  );
};

export default FollowButton;
