import { AlertColor } from "@mui/material";

export interface ToastNotification {
  status: AlertColor;
  title: string;
}

export interface Breadcrumb {
  label: string;
  href?: string;
}
