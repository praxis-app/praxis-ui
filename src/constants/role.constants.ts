import { GroupRolePermissionInput } from "../apollo/gen";

export const DEFAULT_ROLE_COLOR = "#f44336";

export const GROUP_PERMISSION_NAMES: (keyof GroupRolePermissionInput)[] = [
  "approveMemberRequests",
  "deleteGroup",
  "manageComments",
  "manageEvents",
  "managePosts",
  "manageRoles",
  "manageSettings",
  "removeMembers",
  "updateGroup",
];

export enum EditRoleTabNames {
  Permissions = "permissions",
  Members = "members",
}
