import { Box, Switch, Typography } from "@mui/material";
import { t } from "i18next";
import { ChangeEvent } from "react";
import {
  ServerRolePermissionInput,
  ServerRolePermissionsFragment,
} from "../../apollo/gen";
import theme from "../../styles/theme";
import { getPermissionText } from "../../utils/role.utils";
import Flex from "../Shared/Flex";

interface Props {
  formValues: ServerRolePermissionInput;
  permissionName: keyof ServerRolePermissionInput;
  permissions: ServerRolePermissionsFragment;
  setFieldValue(field: string, value?: boolean): void;
}

const ServerPermissionToggle = ({
  formValues,
  permissionName,
  permissions,
  setFieldValue,
}: Props) => {
  const { displayName, description, inDev } = getPermissionText(permissionName);

  if (inDev) {
    return null;
  }

  const isEnabled = permissions[permissionName];
  const permissionInput = formValues[permissionName];
  const checked = !!(permissionInput !== undefined
    ? permissionInput
    : isEnabled);

  const handleSwitchChange = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    if (checked === isEnabled) {
      setFieldValue(permissionName, undefined);
      return;
    }
    setFieldValue(permissionName, true);
  };

  return (
    <Flex justifyContent="space-between" marginBottom={2.8}>
      <Box>
        <Typography>{displayName}</Typography>

        <Typography fontSize={12} sx={{ color: theme.palette.text.secondary }}>
          {description}
        </Typography>
      </Box>

      <Switch
        checked={checked}
        inputProps={{ "aria-label": displayName || t("labels.switch") }}
        onChange={handleSwitchChange}
      />
    </Flex>
  );
};

export default ServerPermissionToggle;