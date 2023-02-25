import { useReactiveVar } from "@apollo/client";
import { Alert, Snackbar, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { toastVar } from "../../apollo/cache";

const AUTO_HIDE_DURATION = 6000;

const Toast = () => {
  const toastNotification = useReactiveVar(toastVar);
  const [open, setOpen] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    if (toastNotification) {
      setOpen(true);
    }
  }, [toastNotification]);

  useEffect(
    () => () => {
      toastVar(null);
      setOpen(false);
    },
    []
  );

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      autoHideDuration={AUTO_HIDE_DURATION}
      onClose={handleClose}
      open={open}
    >
      <Alert
        onClose={handleClose}
        severity={toastNotification?.status}
        sx={{ color: theme.palette.text.primary }}
        variant="filled"
      >
        {toastNotification?.title}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
