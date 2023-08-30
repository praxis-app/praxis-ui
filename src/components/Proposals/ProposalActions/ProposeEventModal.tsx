import { FormGroup } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProposalActionFieldName } from "../../../constants/proposal.constants";
import Flex from "../../Shared/Flex";
import Modal from "../../Shared/Modal";
import PrimaryActionButton from "../../Shared/PrimaryActionButton";

interface Props {
  actionType?: string;
  groupId?: number | null;
  setFieldValue: (field: any, value: any) => void;
  onClose(): void;
}

const ProposeEventModal = ({ setFieldValue, onClose }: Props) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const initialValues: any = {
    name: "",
    permissions: {},
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = async (formValues: any) => {
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
