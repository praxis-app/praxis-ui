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

import { Box, BoxProps } from "@mui/material";
import { FieldArray, Form, Formik, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  PermissionInput,
  PermissionsFormFragment,
  useUpdateRoleMutation,
} from "../../apollo/gen";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import PermissionToggle from "./PermissionToggle";

export interface PermissionsFormValues {
  permissions: PermissionInput[];
}

interface Props extends BoxProps {
  permissions: PermissionsFormFragment[];
  roleId: number;
}

const PermissionsForm = ({ permissions, roleId, ...boxProps }: Props) => {
  const [updateRole] = useUpdateRoleMutation();
  const { t } = useTranslation();

  const initialValues: PermissionsFormValues = {
    permissions: [],
  };

  const handleSubmit = async (
    { permissions }: PermissionsFormValues,
    { setSubmitting, resetForm }: FormikHelpers<PermissionsFormValues>
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

  return (
    <Box {...boxProps}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ values, isSubmitting }) => (
          <Form>
            <FieldArray
              name="permissions"
              render={(arrayHelpers) => (
                <Box marginBottom={2}>
                  {permissions.map((permission) => (
                    <PermissionToggle
                      key={permission.id}
                      arrayHelpers={arrayHelpers}
                      permission={permission}
                      values={values}
                    />
                  ))}
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
