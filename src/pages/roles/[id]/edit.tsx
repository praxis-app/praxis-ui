// TODO: Determine whether RoleForm and PermissionsForm should be combined

import { Card, Tab, Tabs, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { breadcrumbsVar } from "../../../apollo/cache";
import { useEditServerRoleQuery } from "../../../apollo/gen";
import AddMemberTab from "../../../components/Roles/AddMemberTab";
import DeleteRoleButton from "../../../components/Roles/DeleteRoleButton";
import PermissionsForm from "../../../components/Roles/PermissionsForm";
import RoleForm from "../../../components/Roles/RoleForm";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../../constants/common.constants";
import { useAboveBreakpoint } from "../../../hooks/common.hooks";
import { isDeniedAccess } from "../../../utils/error.utils";

enum EditRoleTabs {
  Permissions = "permissions",
  Members = "members",
}

const EditServerRole: NextPage = () => {
  const [tab, setTab] = useState(0);
  const { query, asPath, replace } = useRouter();

  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEditServerRoleQuery({
    variables: { id },
    skip: !id,
  });

  const { t } = useTranslation();
  const isAboveSmall = useAboveBreakpoint("sm");

  const role = data?.role;

  useEffect(() => {
    if (role) {
      breadcrumbsVar({
        path: asPath,
        breadcrumbs: [
          {
            label: t("roles.headers.serverRoles"),
            href: NavigationPaths.Roles,
          },
          {
            label: role.name,
          },
        ],
      });
    }
  }, [t, asPath, role]);

  useEffect(() => {
    if (query.tab === EditRoleTabs.Permissions) {
      setTab(1);
      return;
    }
    if (query.tab === EditRoleTabs.Members) {
      setTab(2);
      return;
    }
    setTab(0);
  }, [query.tab]);

  const handleTabChange = (
    _: SyntheticEvent<Element, Event>,
    value: number
  ) => {
    if (value === 1) {
      replace({
        query: { ...query, tab: EditRoleTabs.Permissions },
      });
      return;
    }
    if (value === 2) {
      replace({
        query: { ...query, tab: EditRoleTabs.Members },
      });
      return;
    }
    delete query.tab;
    replace({ query });
  };

  if (isDeniedAccess(error)) {
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
      <Card sx={{ marginBottom: 6 }}>
        <Tabs
          onChange={handleTabChange}
          value={tab}
          variant={isAboveSmall ? "standard" : "fullWidth"}
          centered
        >
          <Tab label={t("roles.tabs.display")} />
          <Tab label={t("roles.tabs.permissions")} />
          <Tab label={t("roles.tabs.members")} />
        </Tabs>
      </Card>

      {tab === 0 && (
        <>
          <RoleForm editRole={role} />
          <DeleteRoleButton roleId={role.id} />
        </>
      )}

      {tab === 1 && (
        <PermissionsForm permissions={role.permissions} roleId={role.id} />
      )}

      {tab === 2 && (
        <AddMemberTab role={role} users={role.availableUsersToAdd} />
      )}
    </>
  );
};

export default EditServerRole;
