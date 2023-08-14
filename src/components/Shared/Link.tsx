import { Link as MuiLink, SxProps } from "@mui/material";
import NextLink, { LinkProps } from "next/link";
import { ReactNode } from "react";

interface Props extends LinkProps {
  children: ReactNode;
  disabled?: boolean;
  href: string;
  leftSpace?: boolean;
  sx?: SxProps;
}

const Link = ({
  children,
  disabled,
  href,
  leftSpace,
  sx,
  ...linkProps
}: Props) => (
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
      {leftSpace ? " " : ""}
      {children}
    </MuiLink>
  </NextLink>
);

export default Link;
