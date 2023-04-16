// TODO: Add remaining layout and functionality - below is a WIP

import { FormGroup } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { ColorResult } from "react-color";
import { useTranslation } from "react-i18next";
import { CreateRoleInput, PermissionInput } from "../../apollo/gen";
import { FieldNames } from "../../constants/common.constants";
import {
  ProposalActionFieldNames,
  ProposalActionTypes,
} from "../../constants/proposal.constants";
import {
  DEFAULT_ROLE_COLOR,
  GroupPermissions,
} from "../../constants/role.constants";
import { initPermissions } from "../../utils/role.utils";
import ColorPicker from "../Shared/ColorPicker";
import Flex from "../Shared/Flex";
import Modal from "../Shared/Modal";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import { TextField } from "../Shared/TextField";

export interface ProposeRoleModalValues {
  name: string;
  permissions: PermissionInput[];
}

interface Props {
  actionType?: string;
  groupId?: number | null;
  setFieldValue: (
    field: ProposalActionFieldNames,
    value: CreateRoleInput
  ) => void;
}

const ProposeRoleModal = ({ groupId, actionType, setFieldValue }: Props) => {
  const [color, setColor] = useState(DEFAULT_ROLE_COLOR);
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!groupId) {
      return;
    }
    if (
      actionType === ProposalActionTypes.CreateRole ||
      actionType === ProposalActionTypes.ChangeRole
    ) {
      setOpen(true);
    }
  }, [groupId, actionType]);

  const permissions =
    actionType === ProposalActionTypes.CreateRole && groupId
      ? initPermissions(GroupPermissions)
      : [];

  const initialValues: ProposeRoleModalValues = {
    name: "",
    permissions,
  };

  const title =
    actionType === ProposalActionTypes.CreateRole
      ? t("proposals.actions.createGroupRole")
      : t("proposals.actions.changeGroupRole");

  const handleSubmit = async (formValues: Omit<CreateRoleInput, "color">) => {
    setFieldValue(ProposalActionFieldNames.Role, { ...formValues, color });
    setOpen(false);
  };

  const handleChangeComplete = (color: ColorResult) => setColor(color.hex);
  const handleClose = () => setOpen(false);

  const isSubmitButtonDisabled = ({
    dirty,
    isSubmitting,
  }: FormikProps<Omit<CreateRoleInput, "color">>) => {
    if (isSubmitting) {
      return true;
    }
    return !dirty;
  };

  return (
    <Modal open={open} onClose={handleClose} title={title}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <FormGroup>
              <TextField
                autoComplete="off"
                label={t("groups.form.name")}
                name={FieldNames.Name}
              />

              <ColorPicker
                color={color}
                label={t("roles.form.colorPickerLabel")}
                onChange={handleChangeComplete}
                sx={{ marginBottom: 1.25 }}
              />
            </FormGroup>

            <Flex justifyContent="end">
              <PrimaryActionButton
                disabled={isSubmitButtonDisabled(formik)}
                isLoading={formik.isSubmitting}
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

export default ProposeRoleModal;
