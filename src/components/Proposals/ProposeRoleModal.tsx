// TODO: Add remaining layout and functionality - below is a WIP

import { FormGroup, Typography } from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import { SyntheticEvent, useEffect, useState } from "react";
import { ColorResult } from "react-color";
import { useTranslation } from "react-i18next";
import {
  PermissionInput,
  ProposalActionRoleInput,
  useGroupMembersByGroupIdLazyQuery,
} from "../../apollo/gen";
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
import AddRoleMemberOption from "../Roles/AddRoleMemberOption";
import PermissionToggle from "../Roles/PermissionToggle";
import Accordion, {
  AccordionDetails,
  AccordionSummary,
} from "../Shared/Accordion";
import ColorPicker from "../Shared/ColorPicker";
import Flex from "../Shared/Flex";
import Modal from "../Shared/Modal";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import ProgressBar from "../Shared/ProgressBar";
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
  const [showMembers, setShowMembers] = useState(false);
  const [showPermissions, setShowPermissions] = useState(true);

  const [getGroupMembers, { data, loading, error }] =
    useGroupMembersByGroupIdLazyQuery();

  const { t } = useTranslation();

  useEffect(() => {
    if (!groupId) {
      return;
    }
    if (
      actionType === ProposalActionTypes.CreateRole ||
      actionType === ProposalActionTypes.ChangeRole
    ) {
      getGroupMembers({ variables: { groupId } });
      setOpen(true);
    }
  }, [groupId, actionType, getGroupMembers]);

  const permissions =
    actionType === ProposalActionTypes.CreateRole && groupId
      ? initPermissions(GroupPermissions)
      : [];
  const groupMembers = data?.group.members;

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

  const handleChange =
    (panel: "permissions" | "members") =>
    (_: SyntheticEvent, newExpanded: boolean) => {
      if (panel === "permissions") {
        setShowPermissions(newExpanded);
        return;
      }
      setShowMembers(newExpanded);
    };

  const handleColorChange = (color: ColorResult) => setColor(color.hex);
  const handleClose = () => setOpen(false);

  // TODO: Factor in whether role color has been changed
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
                sx={{ marginBottom: 2 }}
              />

              <Accordion
                expanded={showPermissions}
                onChange={handleChange("permissions")}
              >
                <AccordionSummary>
                  <Typography>{t("permissions.labels.permissions")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <FieldArray
                    name="permissions"
                    render={(arrayHelpers) =>
                      permissions.map((permission) => (
                        <PermissionToggle
                          key={permission.name}
                          arrayHelpers={arrayHelpers}
                          permission={permission}
                          values={values}
                        />
                      ))
                    }
                  />
                </AccordionDetails>
              </Accordion>

              <Accordion
                expanded={showMembers}
                onChange={handleChange("members")}
              >
                <AccordionSummary>
                  <Typography>{t("roles.labels.members")}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {loading && <ProgressBar />}

                  {groupMembers &&
                    groupMembers.map((member) => (
                      <AddRoleMemberOption
                        key={member.id}
                        selectedUserIds={[]}
                        setSelectedUserIds={() =>
                          console.log("TODO: Pass setSelectedUserIds here")
                        }
                        user={member}
                      />
                    ))}

                  {error && (
                    <Typography marginTop={1}>
                      {t("errors.somethingWentWrong")}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
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
