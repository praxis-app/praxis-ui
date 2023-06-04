import { Assignment } from "@mui/icons-material";
import { Box, MenuItem, styled, TableRow } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  ServerInviteCardFragment,
  ServerInvitesQuery,
  useDeleteServerInviteMutation,
} from "../../apollo/gen";
import { ServerPermissions } from "../../constants/role.constants";
import { copyInviteLink } from "../../utils/server-invite.utils";
import { timeFromNow } from "../../utils/time.utils";
import { getUserProfilePath } from "../../utils/user.utils";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import SharedTableCell from "../Shared/TableCell";
import UserAvatar from "../Users/UserAvatar";
import { removeServerInvite } from "./ServerInviteCard";

const TableCell = styled(SharedTableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

interface Props {
  isLast: boolean;
  me: ServerInvitesQuery["me"];
  serverInvite: ServerInviteCardFragment;
}

const ServerInviteRow = ({
  serverInvite: { id, user, token, uses, maxUses, expiresAt },
  isLast,
  me,
}: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteInvite] = useDeleteServerInviteMutation();

  const { t } = useTranslation();

  const deleteInvitePrompt = t("prompts.deleteItem", {
    itemType: "invite link",
  });
  const canManageInvites = me?.serverPermissions.includes(
    ServerPermissions.ManageInvites
  );

  const handleDelete = async () =>
    await deleteInvite({
      variables: { id },
      update: removeServerInvite(id),
      onError(err) {
        toastVar({
          status: "error",
          title: err.message,
        });
      },
    });

  const handleCopyLink = async () => {
    await copyInviteLink(token);
    toastVar({
      title: t("invites.prompts.copiedToClipboard"),
      status: "success",
    });
    setMenuAnchorEl(null);
  };

  return (
    <TableRow>
      <TableCell isLast={isLast}>
        <Link href={getUserProfilePath(user.name)} sx={{ display: "flex" }}>
          <UserAvatar user={user} size={24} sx={{ marginRight: 1.5 }} />
          <Box marginTop={0.25}>{user.name}</Box>
        </Link>
      </TableCell>

      <TableCell
        isLast={isLast}
        onClick={handleCopyLink}
        sx={{ cursor: "pointer" }}
      >
        {token}
      </TableCell>

      <TableCell isLast={isLast}>
        {uses + (maxUses ? `/${maxUses}` : "")}
      </TableCell>

      <TableCell isLast={isLast}>
        {expiresAt ? timeFromNow(expiresAt) : t("time.infinity")}
      </TableCell>

      <TableCell isLast={isLast}>
        <ItemMenu
          itemId={id}
          anchorEl={menuAnchorEl}
          setAnchorEl={setMenuAnchorEl}
          canDelete={canManageInvites}
          deleteItem={handleDelete}
          deletePrompt={deleteInvitePrompt}
          prependChildren
        >
          <MenuItem onClick={handleCopyLink}>
            <Assignment fontSize="small" sx={{ marginRight: 1 }} />
            {t("actions.copy")}
          </MenuItem>
        </ItemMenu>
      </TableCell>
    </TableRow>
  );
};

export default ServerInviteRow;
