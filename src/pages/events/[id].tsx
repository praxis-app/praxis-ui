import { useReactiveVar } from "@apollo/client";
import {
  Card,
  CardContent as MuiCardContent,
  styled,
  Typography,
} from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import { useEventPageQuery } from "../../apollo/events/generated/EventPage.query";
import EventPageCard from "../../components/Events/EventPageCard";
import PostForm from "../../components/Posts/PostForm";
import Breadcrumbs from "../../components/Shared/Breadcrumbs";
import Feed from "../../components/Shared/Feed";
import ProgressBar from "../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../constants/common.constants";
import { useIsDesktop } from "../../hooks/common.hooks";
import { isDeniedAccess } from "../../utils/error.utils";
import { getGroupEventsTabPath } from "../../utils/group.utils";

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 20,
  },
}));

const EventPage: NextPage = () => {
  const [tab, setTab] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, loading, error } = useEventPageQuery({
    variables: { id, isLoggedIn },
    skip: !id || isDeleting,
  });

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    if (isDeniedAccess(error)) {
      return <Typography>{t("prompts.permissionDenied")}</Typography>;
    }

    if (error) {
      return <Typography>{t("errors.somethingWentWrong")}</Typography>;
    }
    return null;
  }

  const { event, me } = data;
  const canManageAllEvents = !!me?.serverPermissions.manageEvents;

  const breadcrumbs = event.group
    ? [
        {
          label: truncate(event.group.name, {
            length: isDesktop
              ? TruncationSizes.Small
              : TruncationSizes.ExtraSmall,
          }),
          href: getGroupEventsTabPath(event.group.name),
        },
        {
          label: event.name,
        },
      ]
    : [];

  return (
    <>
      {event.group && <Breadcrumbs breadcrumbs={breadcrumbs} />}

      <EventPageCard
        event={event}
        canManageAllEvents={canManageAllEvents}
        setIsDeleting={setIsDeleting}
        setTab={setTab}
        tab={tab}
      />

      {tab === 0 && (
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              {t("events.headers.whatToExpect")}
            </Typography>

            <Typography>{event.description}</Typography>
          </CardContent>
        </Card>
      )}

      {tab === 1 && (
        <>
          {isLoggedIn && (
            <Card>
              <CardContent
                sx={{
                  "&:last-child": {
                    paddingBottom: 1,
                  },
                }}
              >
                <PostForm eventId={id} />
              </CardContent>
            </Card>
          )}

          <Feed feed={event.posts} />
        </>
      )}
    </>
  );
};

export default EventPage;
