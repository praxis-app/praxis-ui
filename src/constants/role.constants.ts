import {
  GroupRolePermissionInput,
  ServerRolePermissionInput,
} from "../apollo/gen";

export const DEFAULT_ROLE_COLOR = "#f44336";

export const SERVER_PERMISSION_NAMES: (keyof ServerRolePermissionInput)[] = [
  "managePosts",
  "manageRoles",
  "manageInvites",
  "createInvites",
  "manageComments",
  "manageEvents",
  "removeMembers",
];

export const GROUP_PERMISSION_NAMES: (keyof GroupRolePermissionInput)[] = [
  "managePosts",
  "manageSettings",
  "manageRoles",
  "manageEvents",
  "createEvents",
  "updateGroup",
  "deleteGroup",
  "manageComments",
  "removeMembers",
  "approveMemberRequests",
];

export enum EditRoleTabNames {
  Permissions = "permissions",
  Members = "members",
}
