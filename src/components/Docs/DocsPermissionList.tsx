import { Box } from "@mui/material";
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
    <Box component="ul" paddingLeft={3} marginBottom={3}>
      {permissions.map((permission) => {
        const { displayName, description, inDev } =
          getPermissionText(permission);
        if (inDev) {
          return null;
        }
        return (
          <Box component="li" marginBottom={1.5} key={permission}>
            <Box component="span" sx={{ fontFamily: "Inter Bold" }}>
              {displayName}
            </Box>{" "}
            - {description}
          </Box>
        );
      })}
    </Box>
  );
};

export default DocsPermissionList;
