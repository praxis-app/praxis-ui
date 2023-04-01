import { Typography } from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { breadcrumbsVar } from "../../../apollo/cache";
import { useGroupRolesQuery } from "../../../apollo/gen";
import RoleForm from "../../../components/Roles/RoleForm";
import RoleList from "../../../components/Roles/RoleList";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop } from "../../../hooks/common.hooks";
import { isDeniedAccess } from "../../../utils/error.utils";
import { getGroupPath } from "../../../utils/group.utils";

const GroupRoles: NextPage = () => {
  const { query, asPath } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useGroupRolesQuery({
    variables: { name },
    skip: !name,
  });
  const group = data?.group;
  const roles = group?.roles;

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (group) {
      breadcrumbsVar({
        path: asPath,
        breadcrumbs: [
          {
            label: truncate(name, {
              length: isDesktop
                ? TruncationSizes.Small
                : TruncationSizes.ExtraSmall,
            }),
            href: getGroupPath(name),
          },
          {
            label: t("navigation.roles"),
          },
        ],
      });
    }
  }, [group, t, isDesktop, asPath, name]);

  if (isDeniedAccess(error)) {
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
      <RoleForm />
      {roles && <RoleList roles={roles} />}
    </>
  );
};

export default GroupRoles;
