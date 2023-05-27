// TODO: Add basic functionality for events - below is a WIP

import { NextPage } from "next";
import { useTranslation } from "react-i18next";

const EventsIndex: NextPage = () => {
  const { t } = useTranslation();

  return <>{t("prompts.inDev")}</>;
};

export default EventsIndex;
