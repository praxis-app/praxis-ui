// TODO: Add remaining layout and functionality - below is a WIP

import { Box, FormGroup } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { ColorResult } from "react-color";
import { useTranslation } from "react-i18next";
import { PermissionInput, ProposalActionRoleInput } from "../../apollo/gen";
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
import PermissionToggle from "../Roles/PermissionToggle";
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
    value: ProposalActionRoleInput
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
    permissions: [],
  };

  const title =
    actionType === ProposalActionTypes.CreateRole
      ? t("proposals.actions.createGroupRole")
      : t("proposals.actions.changeGroupRole");

  const handleSubmit = async (formValues: ProposeRoleModalValues) => {
    setFieldValue(ProposalActionFieldNames.Role, { ...formValues, color });
    setOpen(false);
  };

  const handleColorChange = (color: ColorResult) => setColor(color.hex);
  const handleClose = () => setOpen(false);

  const isSubmitButtonDisabled = (dirty: boolean, isSubmitting: boolean) => {
    if (isSubmitting) {
      return true;
    }
    return !dirty;
  };

  return (
    <Modal open={open} onClose={handleClose} title={title}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ dirty, isSubmitting, values }) => (
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
                onChange={handleColorChange}
                sx={{ marginBottom: 5 }}
              />

              <FieldArray
                name="permissions"
                render={(arrayHelpers) => (
                  <Box marginBottom={2}>
                    {permissions.map((permission) => (
                      <PermissionToggle
                        key={permission.name}
                        arrayHelpers={arrayHelpers}
                        permission={permission}
                        values={values}
                      />
                    ))}
                  </Box>
                )}
              />
            </FormGroup>

            <Flex justifyContent="end">
              <PrimaryActionButton
                disabled={isSubmitButtonDisabled(dirty, isSubmitting)}
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

export default ProposeRoleModal;
