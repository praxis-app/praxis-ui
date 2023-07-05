import { Box, Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { EventFragment } from "../../apollo/gen";
import { getImagePath } from "../../utils/image.utils";
import Flex from "../Shared/Flex";

interface Props {
  event: EventFragment;
  isLast: boolean;
}

const Event = ({ event: { coverPhoto, startsAt, name }, isLast }: Props) => {
  const { t } = useTranslation();

  const imageSrc = getImagePath(coverPhoto.id);
  const startDate = dayjs(parseInt(startsAt)).format("ddd, MMM D, YYYY");

  return (
    <>
      <Flex>
        <Box width="90px" height="90px" marginRight={1.5}>
          <Image
            alt={t("images.labels.coverPhoto")}
            style={{ borderRadius: "8px" }}
            blurDataURL={imageSrc}
            layout="responsive"
            placeholder="blur"
            src={imageSrc}
            height={300}
            width={300}
          />
        </Box>

        <Box>
          <Typography
            fontFamily="Inter Bold"
            fontSize={13}
            lineHeight={1}
            variant="overline"
          >
            {startDate}
          </Typography>
          <Typography fontFamily="Inter Bold" fontSize={20} lineHeight={1}>
            {name}
          </Typography>
        </Box>
      </Flex>

      {!isLast && <Divider sx={{ marginY: 2 }} />}
    </>
  );
};

export default Event;
