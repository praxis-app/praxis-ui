import { Box, Switch, Typography } from "@mui/material";
import { FieldArrayRenderProps } from "formik";
import { t } from "i18next";
import { ChangeEvent } from "react";
import { PermissionToggleFragment } from "../../apollo/gen";
import theme from "../../theme";
import { getPermissionText } from "../../utils/role.utils";
import Flex from "../Shared/Flex";
import { PermissionsFormValues } from "./PermissionsForm";

interface Props {
  arrayHelpers: FieldArrayRenderProps;
  permission: PermissionToggleFragment;
  values: PermissionsFormValues;
}

const PermissionToggle = ({
  permission: { enabled, name },
  arrayHelpers,
  values,
}: Props) => {
  const { displayName, description, inDev } = getPermissionText(name, t);
  if (inDev) {
    return null;
  }

  const permissionInput = values.permissions.find((p) => p.name === name);
  const checked =
    permissionInput !== undefined ? permissionInput.enabled : enabled;

  const handleChange = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    if (checked === enabled) {
      const index = values.permissions.findIndex((p) => p.name === name);
      arrayHelpers.remove(index);
      return;
    }
    arrayHelpers.push({ name, enabled: checked });
  };

  return (
    <Flex justifyContent="space-between">
      <Box marginBottom={2.8}>
        <Typography>{displayName}</Typography>

        <Typography fontSize={12} sx={{ color: theme.palette.text.secondary }}>
          {description}
        </Typography>
      </Box>

      <Switch
        checked={checked}
        inputProps={{ "aria-label": displayName || t("labels.switch") }}
        onChange={handleChange}
      />
    </Flex>
  );
};

export default PermissionToggle;
