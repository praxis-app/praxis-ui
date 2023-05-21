import {
  CheckBox as MuiCheckBox,
  CheckBoxOutlineBlank,
} from "@mui/icons-material";
import { Box, SxProps, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  PermissionInput,
  ProposalActionPermissionFragment,
} from "../../apollo/gen";
import { ProposalActionType } from "../../constants/proposal.constants";
import { getPermissionText } from "../../utils/role.utils";
import { ChangeTypeColors } from "./ProposalActionRoleMember";

const CHECK_BOX_ICON_STYLES: SxProps = {
  fontSize: 18,
  marginRight: "0.5ch",
  marginTop: 0.2,
};

const CheckBox = ({ checked }: { checked: boolean }) => (
  <>
    {checked ? (
      <MuiCheckBox color="inherit" sx={CHECK_BOX_ICON_STYLES} />
    ) : (
      <CheckBoxOutlineBlank color="inherit" sx={CHECK_BOX_ICON_STYLES} />
    )}
  </>
);

interface Props {
  actionType: ProposalActionType;
  permission: ProposalActionPermissionFragment | PermissionInput;
}

const ProposalActionPermission = ({
  permission: { name, enabled },
  actionType,
}: Props) => {
  const { t } = useTranslation();

  const { displayName } = getPermissionText(name, t);
  const isChangingRole = actionType === ProposalActionType.ChangeRole;

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

  return (
    <Typography
      color={isChangingRole ? "primary" : undefined}
      sx={permissionStyles}
    >
      {isChangingRole ? (
        <Box marginRight="0.7ch" component="span">
          {enabled ? "+" : "-"}
        </Box>
      ) : (
        <CheckBox checked={enabled} />
      )}

      {displayName}
    </Typography>
  );
};

export default ProposalActionPermission;
