// TODO: Move hex color values to theme

import { Button as MuiButton, ButtonProps, styled } from "@mui/material";

const Button = styled(MuiButton)(() => ({
  backgroundColor: "#373737",
  borderRadius: 8,
  color: "tomato",

  "&:hover": {
    backgroundColor: "#3c3c3c",
  },
}));

const DeleteButton = ({ children, ...buttonProps }: ButtonProps) => (
  <Button variant="text" color="primary" fullWidth {...buttonProps}>
    {children}
  </Button>
);

export default DeleteButton;
