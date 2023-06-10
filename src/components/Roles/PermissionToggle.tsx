import { Box, Switch, Typography } from "@mui/material";
import { FieldArrayRenderProps } from "formik";
import { t } from "i18next";
import { ChangeEvent } from "react";
import {
  PermissionInput,
  PermissionToggleFragment,
  ProposalActionRoleInput,
} from "../../apollo/gen";
import theme from "../../styles/theme";
import { getPermissionText } from "../../utils/role.utils";
import Flex from "../Shared/Flex";
import { PermissionsFormValues } from "./PermissionsForm";

interface Props {
  arrayHelpers: FieldArrayRenderProps;
  permission: PermissionToggleFragment | PermissionInput;
  values: PermissionsFormValues | ProposalActionRoleInput;
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

  const permissionInput = values.permissions?.find((p) => p.name === name);
  const checked =
    permissionInput !== undefined ? permissionInput.enabled : enabled;

  const handleChange = ({
    target: { checked },
  }: ChangeEvent<HTMLInputElement>) => {
    if (checked === enabled) {
      const index = values.permissions?.findIndex((p) => p.name === name);
      index !== undefined && arrayHelpers.remove(index);
      return;
    }
    arrayHelpers.push({ name, enabled: checked });
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
        onChange={handleChange}
      />
    </Flex>
  );
};

export default PermissionToggle;
