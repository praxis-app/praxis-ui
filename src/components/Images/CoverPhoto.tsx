import { Box, SxProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useIsDesktop } from "../../hooks/common.hooks";
import { getImagePath } from "../../utils/image.utils";

interface Props {
  imageFile?: File;
  imageId?: number;
  rounded?: boolean;
  sx?: SxProps;
  topRounded?: boolean;
}

const CoverPhoto = ({ imageFile, imageId, rounded, topRounded, sx }: Props) => {
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  const imageStyles = {
    transform: `translateY(-${isDesktop ? 210 : 115}px)`,
  };

  const getImageSrc = () => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    if (imageId) {
      return getImagePath(imageId);
    }
    return "";
  };

  const getBorderRadius = () => {
    if (rounded) {
      return { borderRadius: "8px" };
    }
    if (topRounded) {
      return { borderTopLeftRadius: "8px", borderTopRightRadius: "8px" };
    }
  };

  const sharedBoxStyles = {
    height: isDesktop ? 210 : 130,
    ...getBorderRadius(),
    ...sx,
  };

  if (!getImageSrc()) {
    return (
      <Box
        sx={{
          backgroundColor: grey[900],
          ...sharedBoxStyles,
        }}
      ></Box>
    );
  }

  return (
    <Box
      sx={{
        overflowY: "hidden",
        ...sharedBoxStyles,
      }}
    >
      <Image
        alt={t("images.labels.coverPhoto")}
        layout="responsive"
        src={getImageSrc()}
        style={imageStyles}
        height={300}
        width={300}
        priority
      />
    </Box>
  );
};

export default CoverPhoto;
