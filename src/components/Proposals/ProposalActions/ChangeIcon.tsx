import { Add, Remove } from "@mui/icons-material";
import { Box, BoxProps, SxProps, useTheme } from "@mui/material";
import { ChangeType } from "../../../constants/common.constants";

interface Props extends BoxProps {
  changeType: ChangeType;
  sx?: SxProps;
}

const ChangeIcon = ({ changeType, sx, ...boxProps }: Props) => {
  const theme = useTheme();

  const boxStyles: SxProps = {
    backgroundColor: changeType === ChangeType.Add ? "#324135" : "#472927",
    borderColor: theme.palette.background.paper,
    borderRadius: 1,
    borderStyle: "solid",
    borderWidth: 1,
    position: "relative",
    height: 20,
    width: 20,
    ...sx,
  };

  const iconStyles: SxProps = {
    color: changeType === ChangeType.Add ? "#47FF7A" : "#ff2727",
    position: "absolute",
    top: 2,
    left: 2.1,
    fontSize: 14,
  };

  return (
    <Box sx={boxStyles} {...boxProps}>
      {changeType === ChangeType.Remove ? (
        <Remove sx={iconStyles} />
      ) : (
        <Add sx={iconStyles} />
      )}
    </Box>
  );
};

export default ChangeIcon;
