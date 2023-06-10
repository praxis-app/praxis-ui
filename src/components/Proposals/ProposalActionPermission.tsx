import { CheckBox } from "@mui/icons-material";
import { SxProps, Typography, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  PermissionInput,
  ProposalActionPermissionFragment,
} from "../../apollo/gen";
import { ChangeType } from "../../constants/common.constants";
import { ProposalActionType } from "../../constants/proposal.constants";
import { getPermissionText } from "../../utils/role.utils";
import ChangeBox from "./ChangeBox";

const CHECK_BOX_ICON_STYLES: SxProps = {
  fontSize: 18,
  marginRight: "0.5ch",
  marginTop: 0.2,
};

interface Props {
  actionType: ProposalActionType;
  permission: ProposalActionPermissionFragment | PermissionInput;
}

const ProposalActionPermission = ({
  permission: { name, enabled },
  actionType,
}: Props) => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { displayName } = getPermissionText(name, t);
  const isChangingRole = actionType === ProposalActionType.ChangeRole;

  const permissionStyles: SxProps = {
    borderColor: theme.palette.divider,
    borderRadius: 1,
    borderStyle: isChangingRole ? "solid" : undefined,
    borderWidth: isChangingRole ? 1 : undefined,
    marginBottom: isChangingRole ? 1 : 0.25,
    paddingX: isChangingRole ? 0.6 : 0,
    paddingY: isChangingRole ? 0.5 : 0,
    display: "flex",
    fontSize: 14,
    verticalAlign: "middle",
  };

  return (
    <Typography
      color={isChangingRole ? "primary" : undefined}
      sx={permissionStyles}
    >
      {isChangingRole ? (
        <ChangeBox
          changeType={enabled ? ChangeType.Add : ChangeType.Remove}
          sx={{ marginRight: "1ch" }}
        />
      ) : (
        <CheckBox color="inherit" sx={CHECK_BOX_ICON_STYLES} />
      )}

      {displayName}
    </Typography>
  );
};

export default ProposalActionPermission;
