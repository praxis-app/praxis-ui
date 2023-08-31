import { FormGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProposalActionEventInput } from "../../../apollo/gen";
import {
  ProposalActionFieldName,
  ProposalActionType,
} from "../../../constants/proposal.constants";
import Flex from "../../Shared/Flex";
import Modal from "../../Shared/Modal";
import PrimaryActionButton from "../../Shared/PrimaryActionButton";

interface Props {
  actionType?: string;
  groupId?: number | null;
  currentUserId: number;
  setFieldValue: (
    field: ProposalActionFieldName,
    value: ProposalActionEventInput
  ) => void;
  onClose(): void;
}

const ProposeEventModal = ({
  actionType,
  currentUserId,
  groupId,
  onClose,
  setFieldValue,
}: Props) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (groupId && actionType === ProposalActionType.PlanEvent) {
      setOpen(true);
    }
  }, [groupId, actionType]);

  const initialValues: ProposalActionEventInput = {
    name: "",
    description: "",
    location: "",
    online: false,
    hostUserId: currentUserId,
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = async (formValues: ProposalActionEventInput) => {
    setFieldValue(ProposalActionFieldName.Event, formValues);
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t("proposals.actionTypes.planEvent")}
      centeredTitle
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <FormGroup></FormGroup>

            <Flex justifyContent="end">
              <PrimaryActionButton
                isLoading={isSubmitting}
                sx={{ marginTop: 1.5 }}
                type="submit"
              >
                {t("actions.confirm")}
              </PrimaryActionButton>
            </Flex>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProposeEventModal;
