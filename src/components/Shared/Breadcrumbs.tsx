import { useReactiveVar } from "@apollo/client";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { breadcrumbsVar } from "../../apollo/cache";
import Link from "./Link";

const Breadcrumbs = () => {
  const { path, breadcrumbs } = useReactiveVar(breadcrumbsVar);
  const { asPath } = useRouter();
  const theme = useTheme();

  const pathBeforeQuery = path?.split("?")[0];
  const asPathBeforeQuery = asPath.split("?")[0];

  useEffect(() => {
    breadcrumbsVar({ path: null, breadcrumbs: [] });
  }, [asPathBeforeQuery]);

  if (pathBeforeQuery !== asPathBeforeQuery || !breadcrumbs.length) {
    return null;
  }

  return (
    <MuiBreadcrumbs sx={{ marginBottom: 1.25 }}>
      {breadcrumbs.map(({ label, href }) => {
        if (href) {
          return (
            <Link
              href={href}
              key={href}
              sx={{ color: theme.palette.text.secondary }}
            >
              <Typography>{label}</Typography>
            </Link>
          );
        }
        return (
          <Typography color="primary" key={label}>
            {label}
          </Typography>
        );
      })}
    </MuiBreadcrumbs>
  );
};

export default Breadcrumbs;
