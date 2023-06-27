import { Card, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EditGroupRoleTabsFragment } from "../../../apollo/gen";
import { EditRoleTabNames } from "../../../constants/role.constants";
import { useAboveBreakpoint } from "../../../hooks/common.hooks";
import AddRoleMemberTab from "../../Roles/AddRoleMemberTab";
import DeleteGroupRoleButton from "./DeleteGroupRoleButton";
import GroupPermissionsForm from "./GroupPermissionsForm";
import GroupRoleForm from "./GroupRoleForm";

interface Props {
  role: EditGroupRoleTabsFragment;
}

const EditGroupRoleTabs = ({ role }: Props) => {
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
          <GroupRoleForm editRole={role} groupId={role.group.id} />
          <DeleteGroupRoleButton role={role} />
        </>
      )}

      {tab === 1 && (
        <GroupPermissionsForm permissions={role.permissions} roleId={role.id} />
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

export default EditGroupRoleTabs;
