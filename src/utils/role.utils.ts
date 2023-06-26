import { t } from "i18next";
import { Namespace, TFunction } from "react-i18next";
import { GroupPermissionsFragment } from "../apollo/gen";
import {
  GroupPermissions,
  ServerPermissions,
} from "../constants/role.constants";

interface PermissionText {
  displayName: string | null;
  description: string | null;

  // TODO: Remove once all permissions are implemented
  inDev?: boolean;
}

export const getPermissionText = (name: string): PermissionText => {
  const _t: TFunction<Namespace<"ns1">, undefined> = t;
  switch (name) {
    case "approveMemberRequests":
      return {
        displayName: _t("permissions.names.approveMemberRequests"),
        description: _t("permissions.descriptions.approveMemberRequests"),
      };
    case "updateGroup":
      return {
        displayName: _t("permissions.names.updateGroup"),
        description: _t("permissions.descriptions.updateGroup"),
      };
    case "deleteGroup":
      return {
        displayName: _t("permissions.names.deleteGroup"),
        description: _t("permissions.descriptions.deleteGroup"),
      };
    case "manageSettings":
      return {
        displayName: _t("permissions.names.manageSettings"),
        description: _t("permissions.descriptions.manageGroupSettings"),
      };
    case "createEvents":
      return {
        displayName: _t("permissions.names.createEvents"),
        description: _t("permissions.descriptions.createEvents"),
        inDev: true,
      };
    case "createInvites":
      return {
        displayName: _t("permissions.names.createInvites"),
        description: _t("permissions.descriptions.createInvites"),
      };
    case "manageComments":
      return {
        displayName: _t("permissions.names.manageComments"),
        description: _t("permissions.descriptions.manageComments"),
        inDev: true,
      };
    case "manageEvents":
      return {
        displayName: _t("permissions.names.manageEvents"),
        description: _t("permissions.descriptions.manageEvents"),
        inDev: true,
      };
    case "manageInvites":
      return {
        displayName: _t("permissions.names.manageInvites"),
        description: _t("permissions.descriptions.manageInvites"),
      };
    case "managePosts":
      return {
        displayName: _t("permissions.names.managePosts"),
        description: _t("permissions.descriptions.managePosts"),
      };
    case "manageRoles":
      return {
        displayName: _t("permissions.names.manageRoles"),
        description: _t("permissions.descriptions.manageRoles"),
      };
    case "removeMembers":
      return {
        displayName: _t("permissions.names.banMembers"),
        description: _t("permissions.descriptions.banMembers"),
        inDev: true,
      };
    default:
      return {
        displayName: null,
        description: null,
      };
  }
};

export const initPermissions = (
  permission: typeof ServerPermissions | typeof GroupPermissions,
  enabled = false
) =>
  Object.values(permission).map((name: string) => ({
    enabled,
    name,
  }));

export const initGroupRolePermissions = (
  enabled = false
): Omit<GroupPermissionsFragment, "__typename"> => ({
  approveMemberRequests: enabled,
  createEvents: enabled,
  deleteGroup: enabled,
  manageComments: enabled,
  manageEvents: enabled,
  managePosts: enabled,
  manageRoles: enabled,
  manageSettings: enabled,
  removeMembers: enabled,
  updateGroup: enabled,
});
