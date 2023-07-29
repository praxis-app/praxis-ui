import { Close } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  SxProps,
  Toolbar,
  Typography,
} from "@mui/material";
import { KeyboardEvent, ReactNode } from "react";
import { KeyCodes } from "../../constants/common.constants";
import { useIsDesktop } from "../../hooks/common.hooks";
import { Blurple } from "../../styles/theme";

interface Props {
  actionLabel?: string;
  appBarContent?: ReactNode;
  children: ReactNode;
  closingAction?(): void;
  contentStyles?: SxProps;
  onClose(): void;
  open: boolean;
  subtext?: string;
  title?: string;
  topGap?: string | number;
}

const Modal = ({
  actionLabel,
  appBarContent,
  children,
  closingAction,
  contentStyles,
  onClose,
  open,
  subtext,
  title,
  topGap,
}: Props) => {
  const isDesktop = useIsDesktop();

  const titleBoxStyles: SxProps = {
    flex: 1,
    marginLeft: 1.25,
    marginTop: subtext ? 0.6 : 0,
  };
  const subtextStyles: SxProps = {
    fontSize: 14,
    marginLeft: 0.2,
  };
  const dialogContentStyles: SxProps = isDesktop
    ? {
        minHeight: "65vh",
        width: "600px",
        ...contentStyles,
      }
    : contentStyles || {};

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code !== KeyCodes.Escape) {
      return;
    }
    onClose();
  };

  const renderAppBarContent = () => {
    if (appBarContent) {
      return appBarContent;
    }
    return (
      <Toolbar>
        <IconButton
          aria-label="close"
          color="primary"
          edge="start"
          onClick={onClose}
        >
          <Close />
        </IconButton>
        <Box sx={titleBoxStyles}>
          <Typography variant="h6" sx={{ lineHeight: subtext ? 0.9 : 1.6 }}>
            {title}
          </Typography>

          {subtext && <Typography sx={subtextStyles}>{subtext}</Typography>}
        </Box>
        {actionLabel && <Button onClick={closingAction}>{actionLabel}</Button>}
      </Toolbar>
    );
  };

  return (
    <Dialog
      fullScreen={!isDesktop}
      onKeyDown={handleKeyDown}
      open={open}
      sx={{ marginTop: topGap }}
      // Required for mobile
      BackdropProps={{ onClick: onClose }}
      // Required for desktop
      onClose={onClose}
    >
      <AppBar sx={{ position: "relative", backgroundColor: Blurple.Marina }}>
        {renderAppBarContent()}
      </AppBar>
      <DialogContent sx={dialogContentStyles}>{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
