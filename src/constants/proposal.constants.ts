export enum ProposalActionType {
  ChangeCoverPhoto = "change-cover-photo",
  ChangeDescription = "change-description",
  ChangeName = "change-name",
  ChangeRole = "change-role",
  ChangeSettings = "change-settings",
  CreateRole = "create-role",
  PlanEvent = "plan-event",
  Test = "test",
}

export enum ProposalStage {
  Ratified = "ratified",
  Revision = "revision",
  Voting = "voting",
}

export enum ProposalActionFieldName {
  ActionType = "action.actionType",
  GroupCoverPhoto = "action.groupCoverPhoto",
  GroupDescription = "action.groupDescription",
  GroupName = "action.groupName",
  Role = "action.role",
  RoleId = "action.role.id",
}

// TODO: Use in ProposeRoleModal
export enum ProposeRoleModalFieldName {
  RoleId = "id",
}
