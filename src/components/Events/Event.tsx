import { Box, Divider, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import { EventFragment, useDeleteEventMutation } from "../../apollo/gen";
import { NavigationPaths, TypeNames } from "../../constants/common.constants";
import { getImagePath } from "../../utils/image.utils";
import Flex from "../Shared/Flex";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import EventAttendeeButtons from "./EventAttendeeButtons";

interface Props {
  event: EventFragment;
  isLast: boolean;
}

const Event = ({ event, isLast }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteEvent] = useDeleteEventMutation();
  const { t } = useTranslation();

  const { id, coverPhoto, startsAt, name } = event;
  const imageSrc = getImagePath(coverPhoto.id);
  const eventPagePath = `${NavigationPaths.Events}/${id}`;
  const startDate = dayjs(startsAt).format("ddd, MMM D, YYYY");

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
        <Link href={eventPagePath}>
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
        </Link>

        <Box>
          <Link href={eventPagePath}>
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
          </Link>

          <Stack direction="row" spacing={1}>
            <EventAttendeeButtons event={event} withGoingButton={false} />
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
          </Stack>
        </Box>
      </Flex>

      {!isLast && <Divider sx={{ marginY: 2 }} />}
    </>
  );
};

export default Event;
