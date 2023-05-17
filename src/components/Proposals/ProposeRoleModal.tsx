// TODO: Add remaining layout and functionality - below is a WIP

import {
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { FieldArray, Form, Formik } from "formik";
import {
  ChangeEvent,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { ColorResult } from "react-color";
import { useTranslation } from "react-i18next";
import {
  PermissionInput,
  ProposalActionRoleInput,
  ProposalActionRoleMemberInput,
  useGroupMembersByGroupIdLazyQuery,
  useGroupRolesByGroupIdLazyQuery,
  useRoleByRoleIdLazyQuery,
} from "../../apollo/gen";
import { FieldNames } from "../../constants/common.constants";
import {
  ProposalActionFieldName,
  ProposalActionType,
} from "../../constants/proposal.constants";
import {
  DEFAULT_ROLE_COLOR,
  GroupPermissions,
  RoleMemberChangeType,
} from "../../constants/role.constants";
import { initPermissions } from "../../utils/role.utils";
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
import ProposeRoleMemberOption from "./ProposeRoleMemberOption";

export interface ProposeRoleModalValues {
  name: string;
  permissions: PermissionInput[];
  roleId: number | "";
}

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
  const [showMembers, setShowMembers] = useState(false);
  const [showPermissions, setShowPermissions] = useState(true);

  const [selectedMembers, setSelectedMembers] = useState<
    ProposalActionRoleMemberInput[]
  >([]);

  // TODO: Set role color with formik
  const [color, setColor] = useState(DEFAULT_ROLE_COLOR);

  const [
    getGroupMembers,
    {
      data: groupMembersData,
      loading: groupMembersLoading,
      error: groupMembersError,
    },
  ] = useGroupMembersByGroupIdLazyQuery();

  const [
    getGroupRoles,
    {
      data: groupRolesData,
      loading: groupRolesLoading,
      error: groupRolesError,
    },
  ] = useGroupRolesByGroupIdLazyQuery();

  const [
    getSelectedRole,
    {
      data: selectedRoleData,
      loading: selectedRoleLoading,
      error: selectedRoleError,
    },
  ] = useRoleByRoleIdLazyQuery();

  const { t } = useTranslation();

  useEffect(() => {
    if (!groupId) {
      return;
    }
    if (actionType === ProposalActionType.CreateRole) {
      getGroupMembers({ variables: { groupId } });
      setOpen(true);
    }
    if (actionType === ProposalActionType.ChangeRole) {
      getGroupRoles({ variables: { groupId } });
      setOpen(true);
    }
  }, [groupId, actionType, getGroupMembers, getGroupRoles]);

  const roles = groupRolesData?.group.roles;
  const selectedRole = selectedRoleData?.role;

  const permissions =
    selectedRole?.permissions || initPermissions(GroupPermissions);

  const members = selectedRole
    ? [...selectedRole.members, ...selectedRole.availableUsersToAdd]
    : groupMembersData?.group.members || [];

  const membersLoading =
    groupMembersLoading || groupRolesLoading || selectedRoleLoading;
  const membersError =
    groupMembersError || groupRolesError || selectedRoleError;

  const initialValues: ProposalActionRoleInput = {
    name: "",
    permissions: [],
  };

  const title =
    actionType === ProposalActionType.CreateRole
      ? t("proposals.actions.createGroupRole")
      : t("proposals.actions.changeGroupRole");

  const handleSelectRoleChange =
    (
      handleChange: (e: ChangeEvent) => void,
      setFieldValue: (field: string, value: any) => void
    ) =>
    (event: SelectChangeEvent<number>, _: ReactNode) => {
      getSelectedRole({
        variables: { id: +event.target.value },
        onCompleted({ role }) {
          setColor(role.color);
          setSelectedMembers(
            role.members.map(({ id }) => ({
              changeType: RoleMemberChangeType.None,
              userId: id,
            }))
          );
          setFieldValue("name", role.name);
        },
      });
      handleChange(event as ChangeEvent);
    };

  const handleAccordionChange =
    (panel: "permissions" | "members") =>
    (_: SyntheticEvent, newExpanded: boolean) => {
      if (panel === "permissions") {
        setShowPermissions(newExpanded);
        return;
      }
      setShowMembers(newExpanded);
    };

  const handleColorChange = (color: ColorResult) => setColor(color.hex);

  const handleClose = () => {
    setOpen(false);
    setColor(DEFAULT_ROLE_COLOR);
    setSelectedMembers([]);
    setShowMembers(false);
  };

  // TODO: Factor in whether role color has been changed
  const isSubmitButtonDisabled = (dirty: boolean, isSubmitting: boolean) => {
    if (isSubmitting) {
      return true;
    }
    return !dirty;
  };

  const handleSubmit = async (formValues: ProposalActionRoleInput) => {
    const members = selectedMembers.filter(
      (member) => member.changeType !== RoleMemberChangeType.None
    );
    setFieldValue(ProposalActionFieldName.Role, {
      ...formValues,
      members,
      color,
    });
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={handleClose} title={title}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ dirty, isSubmitting, values, handleChange, setFieldValue }) => (
          <Form>
            <FormGroup>
              {actionType === ProposalActionType.ChangeRole && roles && (
                <FormControl variant="standard" sx={{ marginBottom: 1 }}>
                  <InputLabel>
                    {t("proposals.labels.selectRoleToChange")}
                  </InputLabel>
                  <Select
                    name="id"
                    onChange={handleSelectRoleChange(
                      handleChange,
                      setFieldValue
                    )}
                    value={values.id || ""}
                  >
                    {roles.map((role) => (
                      <MenuItem value={role.id} key={role.id}>
                        {role.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {(actionType === ProposalActionType.CreateRole || values.id) && (
                <>
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
                    onChange={handleAccordionChange("permissions")}
                  >
                    <AccordionSummary>
                      <Typography>
                        {t("permissions.labels.permissions")}
                      </Typography>
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
                    onChange={handleAccordionChange("members")}
                  >
                    <AccordionSummary>
                      <Typography>{t("roles.labels.members")}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                      {membersLoading && <ProgressBar />}

                      {membersError && (
                        <Typography marginTop={1}>
                          {t("errors.somethingWentWrong")}
                        </Typography>
                      )}

                      {members.length &&
                        members.map((member) => (
                          <ProposeRoleMemberOption
                            key={member.id}
                            member={member}
                            selectedMembers={selectedMembers}
                            setSelectedMembers={setSelectedMembers}
                            currentRoleMembers={selectedRole?.members}
                          />
                        ))}
                    </AccordionDetails>
                  </Accordion>
                </>
              )}
            </FormGroup>

            {(actionType === ProposalActionType.CreateRole || values.id) && (
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
            )}
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProposeRoleModal;
