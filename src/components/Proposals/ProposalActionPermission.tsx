import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { SxProps, Typography } from "@mui/material";
import { t } from "i18next";
import { ProposalActionPermissionFragment } from "../../apollo/gen";
import { ProposalActionTypes } from "../../constants/proposal.constants";
import { getPermissionText } from "../../utils/role.utils";
import { ChangeTypeColors } from "./ProposalActionRoleMember";

interface Props {
  actionType: ProposalActionTypes;
  permission: ProposalActionPermissionFragment;
}

const ProposalActionPermission = ({
  permission: { name, enabled },
  actionType,
}: Props) => {
  const { displayName } = getPermissionText(name, t);
  const isChangingRole = actionType === ProposalActionTypes.ChangeRole;

  const getBackgroundColor = () => {
    if (!isChangingRole) {
      return;
    }
    if (enabled) {
      return ChangeTypeColors.Add;
    }
    return ChangeTypeColors.Remove;
  };

  const permissionStyles: SxProps = {
    backgroundColor: getBackgroundColor(),
    borderRadius: 2,
    display: "flex",
    fontSize: 14,
    marginBottom: isChangingRole ? 1 : 0.25,
    paddingX: isChangingRole ? 1 : 0,
    paddingY: isChangingRole ? 0.25 : 0,
    verticalAlign: "middle",
  };

  const iconStyles: SxProps = {
    fontSize: 18,
    marginRight: "0.5ch",
    marginTop: 0.2,
  };

  return (
    <Typography
      color={isChangingRole ? "primary" : undefined}
      sx={permissionStyles}
    >
      {enabled ? (
        <CheckBox color="inherit" sx={iconStyles} />
      ) : (
        <CheckBoxOutlineBlank color="inherit" sx={iconStyles} />
      )}

      {displayName}
    </Typography>
  );
};

export default ProposalActionPermission;
