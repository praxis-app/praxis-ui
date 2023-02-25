export enum ProposalActionTypes {
  AssignRole = "assign-role",
  ChangeCoverPhoto = "change-cover-photo",
  ChangeDescription = "change-description",
  ChangeName = "change-name",
  ChangeRole = "change-role",
  ChangeSettings = "change-settings",
  CreateRole = "create-role",
  PlanEvent = "plan-event",
  Test = "test",
}

export enum ProposalStages {
  Ratified = "ratified",
  Revision = "revision",
  Voting = "voting",
}

export enum ProposalActionFieldNames {
  ActionType = "action.actionType",
  GroupCoverPhoto = "action.groupCoverPhoto",
  GroupDescription = "action.groupDescription",
  GroupName = "action.groupName",
}
