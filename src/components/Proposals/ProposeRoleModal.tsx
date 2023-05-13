// TODO: Add remaining layout and functionality - below is a WIP

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProposalActionRoleInput } from "../../apollo/gen";
import {
  ProposalActionFieldName,
  ProposalActionType,
} from "../../constants/proposal.constants";
import Modal from "../Shared/Modal";
import ProposeRoleForm from "./ProposeRoleForm";

interface Props {
  actionType?: string;
  groupId?: number | null;
  setFieldValue: (
    field: ProposalActionFieldName,
    value: ProposalActionRoleInput
  ) => void;
}

const ProposeRoleModal = ({ groupId, actionType, setFieldValue }: Props) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const title =
    actionType === ProposalActionType.CreateRole
      ? t("proposals.actions.createGroupRole")
      : t("proposals.actions.changeGroupRole");

  useEffect(() => {
    if (!groupId) {
      return;
    }
    if (
      actionType === ProposalActionType.CreateRole ||
      actionType === ProposalActionType.ChangeRole
    ) {
      setOpen(true);
    }
  }, [groupId, actionType]);

  return (
    <Modal open={open} onClose={() => setOpen(false)} title={title}>
      <ProposeRoleForm
        groupId={groupId}
        actionType={actionType}
        setFieldValue={setFieldValue}
        setShowModal={setOpen}
      />
    </Modal>
  );
};

export default ProposeRoleModal;
