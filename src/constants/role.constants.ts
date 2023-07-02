import { GroupRolePermissionInput } from "../apollo/gen";

export const DEFAULT_ROLE_COLOR = "#f44336";

export const GROUP_PERMISSION_NAMES: (keyof GroupRolePermissionInput)[] = [
  "managePosts",
  "manageSettings",
  "manageRoles",
  "updateGroup",
  "deleteGroup",
  "manageComments",
  "manageEvents",
  "removeMembers",
  "approveMemberRequests",
];

export enum EditRoleTabNames {
  Permissions = "permissions",
  Members = "members",
}
