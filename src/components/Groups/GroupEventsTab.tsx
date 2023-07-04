import { Event } from "@mui/icons-material";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DarkMode } from "../../styles/theme";
import { inDevToast } from "../../utils/common.utils";
import Center from "../Shared/Center";
import GhostButton from "../Shared/GhostButton";

const GroupEventsTab = () => {
  const { t } = useTranslation();

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
          <Center marginBottom={1} marginTop={2}>
            <Event sx={{ fontSize: 80, color: DarkMode.Liver }} />
          </Center>
          <Typography textAlign="center" marginBottom={4}>
            {t("events.prompts.noUpcomingEvents")}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default GroupEventsTab;
