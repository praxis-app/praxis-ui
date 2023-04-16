import { Box, Switch, Typography } from "@mui/material";
import { FieldArrayRenderProps } from "formik";
import { t } from "i18next";
import { ChangeEvent } from "react";
import { PermissionsFormFragment } from "../../apollo/gen";
import theme from "../../theme";
import { getPermissionText } from "../../utils/role.utils";
import Flex from "../Shared/Flex";
import { PermissionsFormValues } from "./PermissionsForm";

interface Props {
  arrayHelpers: FieldArrayRenderProps;
  permission: PermissionsFormFragment;
  values: PermissionsFormValues;
}

const PermissionToggle = ({ values, permission, arrayHelpers }: Props) => {
  const permissionInput = values.permissions.find(
    (p) => p.id === permission.id
  );
  const checked =
    permissionInput !== undefined
      ? permissionInput.enabled
      : permission.enabled;

  const { name, description, inDev } = getPermissionText(permission.name, t);
  if (inDev) {
    return null;
  }

  const handleSwitchChange =
    (
      { id, enabled }: PermissionsFormFragment,
      arrayHelpers: FieldArrayRenderProps,
      values: PermissionsFormValues
    ) =>
    ({ target: { checked } }: ChangeEvent<HTMLInputElement>) => {
      if (checked === enabled) {
        const index = values.permissions.findIndex((p) => p.id === id);
        arrayHelpers.remove(index);
        return;
      }
      arrayHelpers.push({ id, enabled: checked });
    };

  return (
    <Flex justifyContent="space-between" key={permission.id}>
      <Box marginBottom={2.8}>
        <Typography>{name}</Typography>

        <Typography fontSize={12} sx={{ color: theme.palette.text.secondary }}>
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

export default PermissionToggle;
