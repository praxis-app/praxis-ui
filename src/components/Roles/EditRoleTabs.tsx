import { Card, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditRoleTabsFragment } from "../../apollo/gen";
import { EditRoleTabNames } from "../../constants/role.constants";
import { useAboveBreakpoint } from "../../hooks/common.hooks";
import AddRoleMemberTab from "./AddRoleMemberTab";
import DeleteRoleButton from "./DeleteRoleButton";
import PermissionsForm from "./PermissionsForm";
import ServerRoleForm from "./ServerRoleForm";

interface Props {
  role: EditRoleTabsFragment;
}

const EditRoleTabs = ({ role }: Props) => {
  const [tab, setTab] = useState(0);
  const { query, replace } = useRouter();

  const { t } = useTranslation();
  const isAboveSmall = useAboveBreakpoint("sm");

  useEffect(() => {
    if (query.tab === EditRoleTabNames.Permissions) {
      setTab(1);
      return;
    }
    if (query.tab === EditRoleTabNames.Members) {
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
        query: { ...query, tab: EditRoleTabNames.Permissions },
      });
      return;
    }
    if (value === 2) {
      replace({
        query: { ...query, tab: EditRoleTabNames.Members },
      });
      return;
    }
    delete query.tab;
    replace({ query });
  };

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
          <ServerRoleForm editRole={role} />
          <DeleteRoleButton role={role} />
        </>
      )}

      {tab === 1 && (
        <PermissionsForm permissions={role.permissions} roleId={role.id} />
      )}

      {tab === 2 && (
        <AddRoleMemberTab
          availableUsersToAdd={role.availableUsersToAdd}
          role={role}
        />
      )}
    </>
  );
};

export default EditRoleTabs;
