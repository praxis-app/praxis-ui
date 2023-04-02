import { Namespace, TFunction } from "react-i18next";
import {
  GroupPermissions,
  ServerPermissions,
} from "../constants/role.constants";

export const getPermissionText = (
  name: string,
  t: TFunction<Namespace<"ns1">, undefined>
) => {
  switch (name) {
    case GroupPermissions.ApproveMemberRequests:
      return {
        name: t("permissions.names.approveMemberRequests"),
        description: t("permissions.descriptions.approveMemberRequests"),
      };
    case GroupPermissions.UpdateGroup:
      return {
        name: t("permissions.names.updateGroup"),
        description: t("permissions.descriptions.updateGroup"),
      };
    case GroupPermissions.DeleteGroup:
      return {
        name: t("permissions.names.deleteGroup"),
        description: t("permissions.descriptions.deleteGroup"),
      };
    case GroupPermissions.ManageSettings:
      return {
        name: t("permissions.names.manageSettings"),
        description: t("permissions.descriptions.manageGroupSettings"),
      };
    case GroupPermissions.CreateEvents:
      return {
        name: t("permissions.names.createEvents"),
        description: t("permissions.descriptions.createEvents"),
      };
    case ServerPermissions.CreateInvites:
      return {
        name: t("permissions.names.createInvites"),
        description: t("permissions.descriptions.createInvites"),
      };
    case GroupPermissions.ManageComments:
    case ServerPermissions.ManageComments:
      return {
        name: t("permissions.names.manageComments"),
        description: t("permissions.descriptions.manageComments"),
      };
    case GroupPermissions.ManageEvents:
    case ServerPermissions.ManageEvents:
      return {
        name: t("permissions.names.manageEvents"),
        description: t("permissions.descriptions.manageEvents"),
      };
    case ServerPermissions.ManageInvites:
      return {
        name: t("permissions.names.manageInvites"),
        description: t("permissions.descriptions.manageInvites"),
      };
    case GroupPermissions.ManagePosts:
    case ServerPermissions.ManagePosts:
      return {
        name: t("permissions.names.managePosts"),
        description: t("permissions.descriptions.managePosts"),
      };
    case GroupPermissions.ManageRoles:
    case ServerPermissions.ManageRoles:
      return {
        name: t("permissions.names.manageRoles"),
        description: t("permissions.descriptions.manageRoles"),
      };
    case GroupPermissions.BanMembers:
    case ServerPermissions.BanMembers:
      return {
        name: t("permissions.names.banMembers"),
        description: t("permissions.descriptions.banMembers"),
      };
    default:
      return {
        name: null,
        description: null,
      };
  }
};
