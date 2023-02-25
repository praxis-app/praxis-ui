import { Button as MuiButton, styled } from "@mui/material";
import { Blurple } from "../../theme";

export const BLURPLE_BUTTON_COLORS = {
  backgroundColor: Blurple.Primary,
  "&:active": {
    backgroundColor: Blurple.Active,
  },
  "&:hover": {
    backgroundColor: Blurple.Hover,
  },
  "&:disabled": {
    backgroundColor: Blurple.Disabled,
  },
};

const PrimaryActionButton = styled(MuiButton)(() => ({
  fontFamily: "Inter Bold",
  letterSpacing: "0.2px",
  textTransform: "none",
  borderRadius: 9999,
  padding: "0 15px",
  minWidth: 80,
  height: 38,
  ...BLURPLE_BUTTON_COLORS,
}));

export default PrimaryActionButton;
