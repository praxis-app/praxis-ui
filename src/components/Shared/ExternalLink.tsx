import { useTheme } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  leftSpace?: boolean;
  newTab?: boolean;
}

const ExternalLink = ({
  href,
  children,
  newTab = true,
  leftSpace = false,
}: Props) => {
  const theme = useTheme();

  if (!newTab) {
    return (
      <a href={href}>
        {leftSpace ? " " : ""}
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      style={{
        textDecoration: "none",
        color: theme.palette.text.primary,
      }}
    >
      {leftSpace ? " " : ""}
      {children}
    </a>
  );
};

export default ExternalLink;
