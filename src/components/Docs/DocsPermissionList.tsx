import { Typography, Box } from "@mui/material";
import {
  GROUP_PERMISSION_NAMES,
  SERVER_PERMISSION_NAMES,
} from "../../constants/role.constants";
import { getPermissionText } from "../../utils/role.utils";

interface Props {
  permissionType: "server" | "group";
}

const DocsPermissionList = ({ permissionType }: Props) => {
  const permissions =
    permissionType === "server"
      ? SERVER_PERMISSION_NAMES
      : GROUP_PERMISSION_NAMES;

  return (
    <Typography component="div" marginBottom={3}>
      <Box component="ul" paddingLeft={3}>
        {permissions.map((permission) => {
          const { displayName, description, inDev } =
            getPermissionText(permission);
          if (inDev) {
            return null;
          }
          return (
            <Box component="li" marginBottom={1.5} key={permission}>
              <b>{displayName}</b> - {description}
            </Box>
          );
        })}
      </Box>
    </Typography>
  );
};

export default DocsPermissionList;
