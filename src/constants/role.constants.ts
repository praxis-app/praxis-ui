export const DEFAULT_ROLE_COLOR = "#f44336";

export enum ServerPermissions {
  BanMembers = "ban-members",
  CreateInvites = "create-invites",
  ManageComments = "manage-comments",
  ManageEvents = "manage-events",
  ManageInvites = "manage-invites",
  ManagePosts = "manage-posts",
  ManageRoles = "manage-roles",
}

export enum GroupPermissions {
  ApproveMemberRequests = "approve-group-member-requests",
  BanMembers = "ban-group-members",
  CreateEvents = "create-group-events",
  DeleteGroup = "delete-group",
  UpdateGroup = "update-group",
  ManageComments = "manage-group-comments",
  ManageEvents = "manage-group-events",
  ManagePosts = "manage-group-posts",
  ManageRoles = "manage-group-roles",
  ManageSettings = "manage-group-settings",
}

export enum EditRoleTabNames {
  Permissions = "permissions",
  Members = "members",
}

export enum RoleMemberChangeType {
  Add = "add",
  Remove = "remove",
}
