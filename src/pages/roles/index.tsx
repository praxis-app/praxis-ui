import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { useServerRolesQuery } from "../../apollo/gen";
import ServerRoleForm from "../../components/Roles/ServerRoles/ServerRoleForm";
import RoleList from "../../components/Roles/RoleList";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { isDeniedAccess } from "../../utils/error.utils";

const ServerRoles: NextPage = () => {
  const { data, loading, error } = useServerRolesQuery();

  const roles = data?.serverRoles;
  const permissions = data?.me.serverPermissions;
  const canManageRoles = permissions?.manageRoles;

  const { t } = useTranslation();

  if (isDeniedAccess(error) || !canManageRoles) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <>
      <LevelOneHeading header>{t("roles.headers.serverRoles")}</LevelOneHeading>

      <ServerRoleForm />
      {roles && <RoleList roles={roles} />}
    </>
  );
};

export default ServerRoles;
