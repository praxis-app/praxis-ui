import { Add, Remove } from "@mui/icons-material";
import { Box, SxProps, useTheme } from "@mui/material";
import { ChangeType } from "../../constants/common.constants";

export enum ChangeTypeColors {
  Add = "#324135",
  Remove = "#3f302f",
}

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
    borderColor: theme.palette.divider,
    borderRadius: 1,
    borderStyle: "solid",
    borderWidth: 1,
    height: 20,
    width: 20,
    ...sx,
  };

  const iconStyles: SxProps = {
    color: changeType === ChangeType.Add ? "#47FF7A" : "#FF4E4E",
    fontSize: 14,
    marginBottom: -0.1,
    marginLeft: 0.25,
  };

  if (changeType === ChangeType.Remove) {
    return (
      <Box component="span" sx={boxStyles}>
        <Remove sx={iconStyles} />
      </Box>
    );
  }

  return (
    <Box component="span" sx={boxStyles}>
      <Add sx={iconStyles} />
    </Box>
  );
};

export default ChangeBox;
