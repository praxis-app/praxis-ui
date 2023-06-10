import { Check, Close } from "@mui/icons-material";
import { Box, SxProps, useTheme } from "@mui/material";
import { ChangeType } from "../../constants/common.constants";
import { ChangeTypeColors } from "./ProposalActionRoleMember";

interface Props {
  changeType: ChangeType;
  sx?: SxProps;
}

const ChangeBox = ({ changeType, sx }: Props) => {
  const theme = useTheme();

  const boxStyles: SxProps = {
    backgroundColor:
      changeType === ChangeType.Add
        ? ChangeTypeColors.Add
        : ChangeTypeColors.Remove,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: theme.palette.divider,
    borderStyle: "solid",
    width: 20,
    height: 20,
    ...sx,
  };

  const iconStyles: SxProps = {
    fontSize: 14,
    marginLeft: 0.2,
    marginBottom: -0.05,
    color: changeType === ChangeType.Add ? "#47FF7A" : "#FF4E4E",
  };

  if (changeType === ChangeType.Remove) {
    return (
      <Box component="span" sx={boxStyles}>
        <Close sx={iconStyles} />
      </Box>
    );
  }

  return (
    <Box component="span" sx={boxStyles}>
      <Check sx={iconStyles} />
    </Box>
  );
};

export default ChangeBox;
