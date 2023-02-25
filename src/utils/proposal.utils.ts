import { Namespace, TFunction } from "react-i18next";
import { ProposalActionTypes } from "../constants/proposal.constants";

export const getProposalActionTypeOptions = (
  t: TFunction<Namespace<"ns1">, undefined>
) => [
  {
    message: t("proposals.actionTypes.changeName"),
    value: ProposalActionTypes.ChangeName,
  },
  {
    message: t("proposals.actionTypes.changeDescription"),
    value: ProposalActionTypes.ChangeDescription,
  },
  {
    message: t("proposals.actionTypes.changeCoverPhoto"),
    value: ProposalActionTypes.ChangeCoverPhoto,
  },
  {
    message: t("proposals.actionTypes.test"),
    value: ProposalActionTypes.Test,
  },

  // TODO: Uncomment after adding support for remaining action types
  // {
  //   message: t("proposals.actionTypes.assignRole"),
  //   value: ProposalActionTypes.AssignRole,
  // },
  // {
  //   message: t("proposals.actionTypes.changeRole"),
  //   value: ProposalActionTypes.ChangeRole,
  // },
  // {
  //   message: t("proposals.actionTypes.changeSettings"),
  //   value: ProposalActionTypes.ChangeSettings,
  // },
  // {
  //   message: t("proposals.actionTypes.createRole"),
  //   value: ProposalActionTypes.CreateRole,
  // },
  // {
  //   message: t("proposals.actionTypes.planEvent"),
  //   value: ProposalActionTypes.PlanEvent,
  // },
];

export const getProposalActionLabel = (
  actionType: string,
  t: TFunction<Namespace<"ns1">, undefined>
): string => {
  switch (actionType) {
    case ProposalActionTypes.PlanEvent:
      return t("proposals.actionTypes.planEvent");
    case ProposalActionTypes.ChangeName:
      return t("proposals.actionTypes.changeName");
    case ProposalActionTypes.ChangeCoverPhoto:
      return t("proposals.actionTypes.changeCoverPhoto");
    case ProposalActionTypes.ChangeDescription:
      return t("proposals.actionTypes.changeDescription");
    case ProposalActionTypes.ChangeSettings:
      return t("proposals.actionTypes.changeSettings");
    case ProposalActionTypes.CreateRole:
      return t("proposals.actionTypes.createRole");
    case ProposalActionTypes.ChangeRole:
      return t("proposals.actionTypes.changeRole");
    case ProposalActionTypes.AssignRole:
      return t("proposals.actionTypes.assignRole");
    case ProposalActionTypes.Test:
      return t("proposals.actionTypes.test");
    default:
      return "";
  }
};
