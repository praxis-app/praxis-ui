import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { useServerInvitesQuery } from "../../apollo/gen";
import ServerInviteForm from "../../components/ServerInvites/ServerInviteForm";
import ServerInviteTable from "../../components/ServerInvites/ServerInviteTable";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { isDeniedAccess } from "../../utils/error.utils";

const ServerInvites: NextPage = () => {
  const { data, loading, error } = useServerInvitesQuery();
  const { t } = useTranslation();

  if (isDeniedAccess(error)) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  const renderTable = () => {
    if (!data || !data.me || !data.serverInvites.length) {
      return null;
    }
    const { me, serverInvites } = data;
    return <ServerInviteTable serverInvites={serverInvites} me={me} />;
  };

  return (
    <>
      <LevelOneHeading header>
        {t("invites.headers.serverInvites")}
      </LevelOneHeading>

      <ServerInviteForm />
      {renderTable()}
    </>
  );
};

export default ServerInvites;
