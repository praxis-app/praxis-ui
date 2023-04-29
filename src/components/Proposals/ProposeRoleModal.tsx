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
  useGroupMembersByGroupIdLazyQuery,
  useGroupRolesByGroupIdLazyQuery,
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
  roleId: number | "";
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
  const [open, setOpen] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [permissions, setPermissions] = useState<PermissionInput[]>([]);
  const [showMembers, setShowMembers] = useState(false);
  const [showPermissions, setShowPermissions] = useState(true);

  // TODO: Set role color with formik
  const [color, setColor] = useState(DEFAULT_ROLE_COLOR);

  const [getGroupRoles, { data: groupRolesData }] =
    useGroupRolesByGroupIdLazyQuery();

  const [
    getGroupMembers,
    {
      data: groupMembersData,
      loading: groupMembersLoading,
      error: groupMembersError,
    },
  ] = useGroupMembersByGroupIdLazyQuery();

  const { t } = useTranslation();

  useEffect(() => {
    if (!groupId) {
      return;
    }
    if (actionType === ProposalActionTypes.CreateRole) {
      getGroupMembers({ variables: { groupId } });
      setPermissions(initPermissions(GroupPermissions));
      setOpen(true);
    }
    if (actionType === ProposalActionTypes.ChangeRole) {
      getGroupRoles({ variables: { groupId } });
      setOpen(true);
    }
  }, [groupId, actionType, getGroupMembers, getGroupRoles]);

  const groupMembers = groupMembersData?.group.members;
  const roles = groupRolesData?.group.roles;

  const initialValues: ProposalActionRoleInput = {
    name: "",
    permissions: [],
  };

  const title =
    actionType === ProposalActionTypes.CreateRole
      ? t("proposals.actions.createGroupRole")
      : t("proposals.actions.changeGroupRole");

  const handleSelectRoleChange =
    (
      handleChange: (e: ChangeEvent) => void,
      setFieldValue: (field: string, value: any) => void
    ) =>
    (event: SelectChangeEvent<number>, _: ReactNode) => {
      const role = roles?.find((role) => role.id === event.target.value);
      if (!role) {
        return;
      }
      setColor(role.color);
      setPermissions(role.permissions);
      setFieldValue("name", role.name);
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
    setSelectedUserIds([]);
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
    setFieldValue(ProposalActionFieldNames.Role, {
      ...formValues,
      selectedUserIds,
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
              {actionType === ProposalActionTypes.ChangeRole && roles && (
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
              {(actionType === ProposalActionTypes.CreateRole || values.id) && (
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
                      {groupMembersLoading && <ProgressBar />}

                      {groupMembersError && (
                        <Typography marginTop={1}>
                          {t("errors.somethingWentWrong")}
                        </Typography>
                      )}

                      {groupMembers &&
                        groupMembers.map((member) => (
                          <AddRoleMemberOption
                            key={member.id}
                            selectedUserIds={selectedUserIds}
                            setSelectedUserIds={setSelectedUserIds}
                            user={member}
                          />
                        ))}
                    </AccordionDetails>
                  </Accordion>
                </>
              )}
            </FormGroup>

            {(actionType === ProposalActionTypes.CreateRole || values.id) && (
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
