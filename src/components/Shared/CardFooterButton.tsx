import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CardFooterButton = styled(Button)(() => ({
  borderRadius: 9999,
  fontFamily: "Inter Bold",
  paddingLeft: 13,
  paddingRight: 13,
  textTransform: "none",
}));

export default CardFooterButton;
