import { Namespace, TFunction } from "react-i18next";
import { ServerPermissions } from "../constants/role.constants";

export const getPermissionText = (
  name: string,
  t: TFunction<Namespace<"ns1">, undefined>
) => {
  switch (name) {
    case ServerPermissions.CreateInvites:
      return {
        name: t("permissions.names.createInvites"),
        description: t("permissions.descriptions.createInvites"),
      };
    case ServerPermissions.ManageComments:
      return {
        name: t("permissions.names.manageComments"),
        description: t("permissions.descriptions.manageComments"),
      };
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
    case ServerPermissions.ManagePosts:
      return {
        name: t("permissions.names.managePosts"),
        description: t("permissions.descriptions.managePosts"),
      };
    case ServerPermissions.ManageRoles:
      return {
        name: t("permissions.names.manageRoles"),
        description: t("permissions.descriptions.manageRoles"),
      };
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
