import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEventPageQuery } from "../../apollo/gen";
import ProgressBar from "../../components/Shared/ProgressBar";
import { isDeniedAccess } from "../../utils/error.utils";

const EventPage: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEventPageQuery({
    variables: { id },
    skip: !id,
  });

  const { t } = useTranslation();

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

  return <>{JSON.stringify(data)}</>;
};

export default EventPage;
