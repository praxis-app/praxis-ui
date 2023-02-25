// TODO: Add basic functionality for likes, comments, and sharing. Below is a WIP

import { Comment, Favorite, Reply } from "@mui/icons-material";
import { CardActions, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
import { inDevToast } from "../../utils/common.utils";
import CardFooterButton from "../Shared/CardFooterButton";

const ICON_STYLES: SxProps = {
  marginRight: "0.4ch",
};

const ROTATED_ICON_STYLES = {
  ...ICON_STYLES,
  transform: "rotateY(180deg)",
};

const PostCardFooter = () => {
  const { t } = useTranslation();
  return (
    <CardActions sx={{ justifyContent: "space-around" }} onClick={inDevToast}>
      <CardFooterButton>
        <Favorite sx={ICON_STYLES} />
        {t("actions.like")}
      </CardFooterButton>
      <CardFooterButton>
        <Comment sx={ROTATED_ICON_STYLES} />
        {t("actions.comment")}
      </CardFooterButton>
      <CardFooterButton>
        <Reply sx={ROTATED_ICON_STYLES} />
        {t("actions.share")}
      </CardFooterButton>
    </CardActions>
  );
};

export default PostCardFooter;
