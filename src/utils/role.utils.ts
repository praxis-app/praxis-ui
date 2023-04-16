import { Namespace, TFunction } from "react-i18next";
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

export const getPermissionText = (
  name: string,
  t: TFunction<Namespace<"ns1">, undefined>
): PermissionText => {
  switch (name) {
    case GroupPermissions.ApproveMemberRequests:
      return {
        displayName: t("permissions.names.approveMemberRequests"),
        description: t("permissions.descriptions.approveMemberRequests"),
      };
    case GroupPermissions.UpdateGroup:
      return {
        displayName: t("permissions.names.updateGroup"),
        description: t("permissions.descriptions.updateGroup"),
      };
    case GroupPermissions.DeleteGroup:
      return {
        displayName: t("permissions.names.deleteGroup"),
        description: t("permissions.descriptions.deleteGroup"),
      };
    case GroupPermissions.ManageSettings:
      return {
        displayName: t("permissions.names.manageSettings"),
        description: t("permissions.descriptions.manageGroupSettings"),
        inDev: true,
      };
    case GroupPermissions.CreateEvents:
      return {
        displayName: t("permissions.names.createEvents"),
        description: t("permissions.descriptions.createEvents"),
        inDev: true,
      };
    case ServerPermissions.CreateInvites:
      return {
        displayName: t("permissions.names.createInvites"),
        description: t("permissions.descriptions.createInvites"),
      };
    case GroupPermissions.ManageComments:
    case ServerPermissions.ManageComments:
      return {
        displayName: t("permissions.names.manageComments"),
        description: t("permissions.descriptions.manageComments"),
        inDev: true,
      };
    case GroupPermissions.ManageEvents:
    case ServerPermissions.ManageEvents:
      return {
        displayName: t("permissions.names.manageEvents"),
        description: t("permissions.descriptions.manageEvents"),
        inDev: true,
      };
    case ServerPermissions.ManageInvites:
      return {
        displayName: t("permissions.names.manageInvites"),
        description: t("permissions.descriptions.manageInvites"),
      };
    case GroupPermissions.ManagePosts:
    case ServerPermissions.ManagePosts:
      return {
        displayName: t("permissions.names.managePosts"),
        description: t("permissions.descriptions.managePosts"),
      };
    case GroupPermissions.ManageRoles:
    case ServerPermissions.ManageRoles:
      return {
        displayName: t("permissions.names.manageRoles"),
        description: t("permissions.descriptions.manageRoles"),
      };
    case GroupPermissions.BanMembers:
    case ServerPermissions.BanMembers:
      return {
        displayName: t("permissions.names.banMembers"),
        description: t("permissions.descriptions.banMembers"),
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
