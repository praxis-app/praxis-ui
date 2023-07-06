import { Box, Divider, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import { EventFragment, useDeleteEventMutation } from "../../apollo/gen";
import { TypeNames } from "../../constants/common.constants";
import { getImagePath } from "../../utils/image.utils";
import Flex from "../Shared/Flex";
import ItemMenu from "../Shared/ItemMenu";

interface Props {
  event: EventFragment;
  isLast: boolean;
}

const Event = ({
  event: { id, coverPhoto, startsAt, name },
  isLast,
}: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteEvent] = useDeleteEventMutation();
  const { t } = useTranslation();

  const imageSrc = getImagePath(coverPhoto.id);
  const startDate = dayjs(parseInt(startsAt)).format("ddd, MMM D, YYYY");

  const deletePrompt = t("prompts.deleteItem", {
    itemType: "event",
  });

  const handleDelete = async () =>
    await deleteEvent({
      variables: { id },
      update(cache) {
        const cacheId = cache.identify({ id, __typename: TypeNames.Event });
        cache.evict({ id: cacheId });
        cache.gc();
      },
      onError(err) {
        toastVar({
          status: "error",
          title: err.message,
        });
      },
    });

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
          <Typography
            fontFamily="Inter Bold"
            fontSize={20}
            lineHeight={1}
            marginBottom={1.25}
          >
            {name}
          </Typography>

          <ItemMenu
            itemId={id}
            anchorEl={menuAnchorEl}
            setAnchorEl={setMenuAnchorEl}
            buttonStyles={{ maxWidth: 40, minWidth: 40 }}
            deleteItem={handleDelete}
            deletePrompt={deletePrompt}
            variant="ghost"
            canDelete
          />
        </Box>
      </Flex>

      {!isLast && <Divider sx={{ marginY: 2 }} />}
    </>
  );
};

export default Event;
