// TODO: Add basic functionality for likes, comments, and sharing. Below is a WIP

import { Comment, Favorite, Reply } from "@mui/icons-material";
import { Box, CardActions, Divider, SxProps } from "@mui/material";
import { useTranslation } from "react-i18next";
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
  likesCount: number;
}

const PostCardFooter = ({ likesCount }: Props) => {
  const { t } = useTranslation();

  const chipStyles: SxProps = {
    ...BASE_CHIP_STYLES,
    width: 22.5,
    height: 22.5,
    marginRight: 0.9,
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
    </Box>
  );
};

export default PostCardFooter;
