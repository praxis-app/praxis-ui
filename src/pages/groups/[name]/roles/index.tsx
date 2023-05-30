import { Typography } from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useGroupRolesQuery } from "../../../../apollo/gen";
import RoleForm from "../../../../components/Roles/RoleForm";
import RoleList from "../../../../components/Roles/RoleList";
import Breadcrumbs from "../../../../components/Shared/Breadcrumbs";
import ProgressBar from "../../../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../../../constants/common.constants";
import { GroupPermissions } from "../../../../constants/role.constants";
import { useIsDesktop } from "../../../../hooks/common.hooks";
import { isDeniedAccess } from "../../../../utils/error.utils";
import { getGroupPath } from "../../../../utils/group.utils";

const GroupRoles: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useGroupRolesQuery({
    variables: { name },
    skip: !name,
  });
  const group = data?.group;
  const roles = group?.roles;

  const canManageRoles = group?.myPermissions?.includes(
    GroupPermissions.ManageRoles
  );

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  if (isDeniedAccess(error) || (group && !canManageRoles)) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  const breadcrumbs = [
    {
      label: truncate(name, {
        length: isDesktop ? TruncationSizes.Small : TruncationSizes.ExtraSmall,
      }),
      href: getGroupPath(name),
    },
    {
      label: t("groups.labels.groupRoles"),
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <RoleForm groupId={group?.id} />
      {roles && <RoleList roles={roles} />}
    </>
  );
};

export default GroupRoles;
