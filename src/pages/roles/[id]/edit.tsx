// TODO: Determine whether RoleForm and PermissionsForm should be combined

import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEditServerRoleQuery } from "../../../apollo/roles/queries/gen/EditServerRole.query";
import EditRoleTabs from "../../../components/Roles/EditRoleTabs";
import Breadcrumbs from "../../../components/Shared/Breadcrumbs";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../../constants/common.constants";
import { isDeniedAccess } from "../../../utils/error.utils";

const EditServerRole: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEditServerRoleQuery({
    variables: { id },
    skip: !id,
  });

  const { t } = useTranslation();

  const me = data?.me;
  const role = data?.serverRole;

  if (isDeniedAccess(error) || (me && !me.serverPermissions.manageRoles)) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!role) {
    return null;
  }

  return (
    <>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: t("roles.headers.serverRoles"),
            href: NavigationPaths.Roles,
          },
          {
            label: role.name,
          },
        ]}
      />

      <EditRoleTabs role={role} />
    </>
  );
};

export default EditServerRole;
