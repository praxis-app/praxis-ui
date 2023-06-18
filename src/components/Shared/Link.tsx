import { Link as MuiLink, SxProps } from "@mui/material";
import NextLink, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface Props extends LinkProps {
  children: ReactNode;
  disabled?: boolean;
  href: string;
  sx?: SxProps;
}

const Link = ({ href, children, sx, disabled, ...linkProps }: Props) => (
  <NextLink href={href} {...linkProps} passHref>
    <MuiLink
      href={href}
      sx={{
        color: "text.primary",
        pointerEvents: disabled ? "none" : undefined,
        textDecoration: "none",
        ...sx,
      }}
    >
      {children}
    </MuiLink>
  </NextLink>
);

export default Link;
