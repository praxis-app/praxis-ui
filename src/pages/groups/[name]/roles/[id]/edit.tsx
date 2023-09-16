import { Typography } from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEditGroupRoleQuery } from "../../../../../apollo/groups/generated/EditGroupRole.query";
import EditRoleTabs from "../../../../../components/Roles/EditRoleTabs";
import Breadcrumbs from "../../../../../components/Shared/Breadcrumbs";
import ProgressBar from "../../../../../components/Shared/ProgressBar";
import {
  NavigationPaths,
  TruncationSizes,
} from "../../../../../constants/common.constants";
import { useIsDesktop } from "../../../../../hooks/common.hooks";
import { isDeniedAccess } from "../../../../../utils/error.utils";
import { getGroupPath } from "../../../../../utils/group.utils";

const EditGroupRole: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name);
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEditGroupRoleQuery({
    variables: { id },
    skip: !id,
  });
  const role = data?.groupRole;

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  const groupPath = getGroupPath(name);
  const groupRolesPath = `${groupPath}${NavigationPaths.Roles}`;
  const canManageRoles = role?.group?.myPermissions?.manageRoles;

  if (isDeniedAccess(error) || (role && !canManageRoles)) {
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

  const breadcrumbs = [
    {
      label: truncate(name, {
        length: isDesktop ? TruncationSizes.Small : TruncationSizes.ExtraSmall,
      }),
      href: getGroupPath(name),
    },
    {
      label: t("groups.labels.groupRoles"),
      href: groupRolesPath,
    },
    {
      label: role.name,
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <EditRoleTabs role={role} />
    </>
  );
};

export default EditGroupRole;
