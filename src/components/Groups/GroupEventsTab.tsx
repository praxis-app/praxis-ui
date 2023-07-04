import { Event as CalendarIcon } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useGroupEventsTabQuery } from "../../apollo/gen";
import { DarkMode } from "../../styles/theme";
import { inDevToast } from "../../utils/common.utils";
import Center from "../Shared/Center";
import GhostButton from "../Shared/GhostButton";
import ProgressBar from "../Shared/ProgressBar";

interface Props {
  groupId: number;
}

const GroupEventsTab = ({ groupId }: Props) => {
  const { data, loading, error } = useGroupEventsTabQuery({
    variables: { groupId },
  });
  const { t } = useTranslation();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  const {
    group: { upcomingEvents },
  } = data;

  return (
    <>
      <Card>
        <CardHeader
          title={
            <Typography variant="h6">
              {t("events.headers.upcomingEvents")}
            </Typography>
          }
          action={
            <GhostButton
              onClick={() => inDevToast()}
              sx={{ marginRight: 0.5, marginTop: 0.5 }}
            >
              {t("events.actions.createEvent")}
            </GhostButton>
          }
        />
        <CardContent>
          {!upcomingEvents.length && (
            <>
              <Center marginBottom={1} marginTop={2}>
                <CalendarIcon sx={{ fontSize: 80, color: DarkMode.Liver }} />
              </Center>
              <Typography textAlign="center" marginBottom={4}>
                {t("events.prompts.noUpcomingEvents")}
              </Typography>
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default GroupEventsTab;
