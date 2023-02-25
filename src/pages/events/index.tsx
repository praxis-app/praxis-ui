// TODO: Add basic functionality for events - below is a WIP

import { Typography, useTheme } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";

const EventsIndex: NextPage = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <LevelOneHeading header>{t("navigation.events")}</LevelOneHeading>

      <Typography sx={{ color: theme.palette.text.secondary }} gutterBottom>
        {t("prompts.wip")}
      </Typography>
    </>
  );
};

export default EventsIndex;
