// TODO: Add basic functionality for events - below is a WIP

import {
  Card,
  CardContent as MuiCardContent,
  CardHeader,
  styled,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 12,
  },
}));

const EventsIndex: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader
        title={t("events.headers.planEvents")}
        sx={{ paddingBottom: 0.75 }}
      />
      <CardContent>
        <Typography gutterBottom>{t("events.tips.planEvents")}</Typography>
        <Typography gutterBottom>{t("events.tips.proposedEvents")}</Typography>
        <Typography gutterBottom>{t("prompts.inDev")}</Typography>
      </CardContent>
    </Card>
  );
};

export default EventsIndex;
