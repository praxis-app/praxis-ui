// TODO: Add remaining layout and functionality - below is a WIP

import { useTranslation } from "react-i18next";
import GhostButton from "../Shared/GhostButton";

const FollowButton = () => {
  const { t } = useTranslation();

  return (
    <GhostButton sx={{ marginRight: 0.5 }}>
      {t("users.actions.follow")}
    </GhostButton>
  );
};

export default FollowButton;
