import { useTheme } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  href: string;
  children: ReactNode;
  newTab?: boolean;
}

const ExternalLink = ({ href, children, newTab = true }: Props) => {
  const theme = useTheme();

  if (!newTab) {
    return <a href={href}>{children}</a>;
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
      {children}
    </a>
  );
};

export default ExternalLink;
