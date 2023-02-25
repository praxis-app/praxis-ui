/**
 * TODO: Add remaining functionality - below is a WIP
 *
 * Permissions that still need to be implemented fully:
 * - Ban Members
 * - Create Invites
 * - Manage Comments
 * - Manage Events
 * - Manage Invites
 */

import { Box, BoxProps, Switch, Typography, useTheme } from "@mui/material";
import {
  FieldArray,
  FieldArrayRenderProps,
  Form,
  Formik,
  FormikHelpers,
} from "formik";
import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  PermissionInput,
  PermissionsFormFragment,
  useUpdateRoleMutation,
} from "../../apollo/gen";
import { getPermissionText } from "../../utils/role.utils";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";

interface FormValues {
  permissions: PermissionInput[];
}

interface Props extends BoxProps {
  permissions: PermissionsFormFragment[];
  roleId: number;
}

const PermissionsForm = ({ permissions, roleId, ...boxProps }: Props) => {
  const [updateRole] = useUpdateRoleMutation();

  const { t } = useTranslation();
  const theme = useTheme();

  const initialValues: FormValues = {
    permissions: [],
  };

  const handleSubmit = async (
    { permissions }: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      updateRole({
        variables: {
          roleData: {
            id: roleId,
            permissions,
          },
        },
        onCompleted() {
          setSubmitting(false);
          resetForm();
        },
      });
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
    }
  };

  const handleSwitchChange =
    (
      { id, enabled }: PermissionsFormFragment,
      arrayHelpers: FieldArrayRenderProps,
      values: FormValues
    ) =>
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      if (checked === enabled) {
        const index = values.permissions.findIndex((p) => p.id === id);
        arrayHelpers.remove(index);
        return;
      }
      arrayHelpers.push({ id, enabled: checked });
    };

  const renderSwitch = (
    values: FormValues,
    permission: PermissionsFormFragment,
    arrayHelpers: FieldArrayRenderProps
  ) => {
    const permissionInput = values.permissions.find(
      (p) => p.id === permission.id
    );
    const checked =
      permissionInput !== undefined
        ? permissionInput.enabled
        : permission.enabled;

    const { name, description } = getPermissionText(permission.name, t);

    return (
      <Flex justifyContent="space-between" key={permission.id}>
        <Box marginBottom={2.8}>
          <Typography>{name}</Typography>

          <Typography
            fontSize={12}
            sx={{ color: theme.palette.text.secondary }}
          >
            {description}
          </Typography>
        </Box>

        <Switch
          checked={checked}
          inputProps={{ "aria-label": name || t("labels.switch") }}
          onChange={handleSwitchChange(permission, arrayHelpers, values)}
        />
      </Flex>
    );
  };

  return (
    <Box {...boxProps}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting }) => (
          <Form>
            <FieldArray
              name="permissions"
              render={(arrayHelpers) => (
                <Box marginBottom={2}>
                  {permissions.map((permission) =>
                    renderSwitch(values, permission, arrayHelpers)
                  )}
                </Box>
              )}
            />

            <Flex justifyContent="end">
              <PrimaryActionButton
                disabled={isSubmitting || !values.permissions.length}
                sx={{ marginTop: 1.5 }}
                type="submit"
              >
                {t("actions.save")}
              </PrimaryActionButton>
            </Flex>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PermissionsForm;
