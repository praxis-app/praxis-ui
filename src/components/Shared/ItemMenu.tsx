// TODO: Resolve issue with Edit button only responding to click on text

import { Delete, Edit, MoreHoriz } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, SxProps } from "@mui/material";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { isRenderable } from "../../utils/common.utils";
import GhostButton from "./GhostButton";
import Link from "./Link";

interface Props {
  anchorEl: null | HTMLElement;
  buttonStyles?: SxProps;
  canDelete?: boolean;
  canEdit?: boolean;
  children?: ReactNode;
  deleteItem?: (id: number) => void;
  deletePrompt?: string;
  editPath?: string;
  itemId: number;
  prependChildren?: boolean;
  setAnchorEl: (el: null | HTMLElement) => void;
  variant?: "ghost" | "default";
}

const ItemMenu = ({
  anchorEl,
  buttonStyles,
  canDelete,
  canEdit,
  children,
  deleteItem,
  deletePrompt,
  editPath,
  itemId,
  prependChildren,
  setAnchorEl,
  variant,
}: Props) => {
  const { t } = useTranslation();

  if (!canEdit && !canDelete && !isRenderable(children)) {
    return null;
  }

  const editIconStyles = {
    marginRight: 1,
    transform: "rotateY(180deg) translateY(2px)",
  };
  const menuStyles = {
    transform: `translateY(${variant === "ghost" ? 4 : 1}px)`,
  };
  const Button = variant === "ghost" ? GhostButton : IconButton;

  const showEditButton = canEdit && editPath;
  const showDeleteButton = canDelete && deleteItem && deletePrompt;

  const handleMenuButtonClick = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    if (!deleteItem) {
      return;
    }
    deleteItem(itemId);
    handleClose();
  };

  const handleDeleteWithPrompt = () =>
    window.confirm(deletePrompt) && handleDelete();

  return (
    <>
      <Button
        aria-label={t("labels.menuButton")}
        onClick={handleMenuButtonClick}
        sx={buttonStyles}
      >
        <MoreHoriz />
      </Button>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
        anchorOrigin={{
          horizontal: "right",
          vertical: "bottom",
        }}
        transformOrigin={{
          horizontal: "right",
          vertical: "top",
        }}
        sx={menuStyles}
      >
        {prependChildren && children}

        {showEditButton && (
          <MenuItem>
            <Link sx={{ color: "inherit" }} href={editPath}>
              <Edit fontSize="small" sx={editIconStyles} />
              {t("actions.edit")}
            </Link>
          </MenuItem>
        )}

        {showDeleteButton && (
          <MenuItem onClick={handleDeleteWithPrompt}>
            <Delete fontSize="small" sx={{ marginRight: 1 }} />
            {t("actions.delete")}
          </MenuItem>
        )}

        {!prependChildren && children}
      </Menu>
    </>
  );
};

export default ItemMenu;
