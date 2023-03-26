import { Assignment } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent as MuiCardContent,
  CardHeader,
  Link,
  MenuItem,
  styled,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  ServerInviteCardFragment,
  ServerInvitesQuery,
  useDeleteServerInviteMutation,
} from "../../apollo/gen";
import { ServerPermissions } from "../../constants/role.constants";
import { timeFromNow } from "../../utils/time.utils";
import { getUserProfilePath } from "../../utils/user.utils";
import CompactButton from "../Shared/CompactButton";
import Flex from "../Shared/Flex";
import ItemMenu from "../Shared/ItemMenu";
import UserAvatar from "../Users/UserAvatar";
import { removeServerInvite } from "./ServerInviteRow";

const CardContent = styled(MuiCardContent)(() => ({
  display: "flex",
  justifyContent: "space-between",
  "&:last-child": {
    paddingBottom: 16,
    paddingTop: 4,
  },
}));

interface Props {
  me: ServerInvitesQuery["me"];
  serverInvite: ServerInviteCardFragment;
}

const ServerInviteCard = ({
  me: { serverPermissions },
  serverInvite: { id, user, token, uses, maxUses, expiresAt },
}: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [deleteInvite] = useDeleteServerInviteMutation();

  const { t } = useTranslation();

  const expiresAtText = expiresAt ? timeFromNow(expiresAt) : t("time.never");
  const usesText = uses + (maxUses ? `/${maxUses}` : "");

  const deleteInvitePrompt = t("prompts.deleteItem", {
    itemType: "invite link",
  });
  const canManageInvites = serverPermissions.includes(
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
    const inviteLink = `${window.location.origin}/i/${token}`;
    await navigator.clipboard.writeText(inviteLink);

    toastVar({
      title: t("invites.prompts.copiedToClipboard"),
      status: "success",
    });
    setMenuAnchorEl(null);
  };

  return (
    <Card>
      <CardHeader
        title={
          <Flex>
            <CompactButton
              onClick={handleCopyLink}
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                lineHeight: 1.5,
                marginRight: 1,
              }}
            >
              {token}
            </CompactButton>

            <Typography sx={{ color: "#62c57a" }}>{expiresAtText}</Typography>
          </Flex>
        }
        action={
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
        }
      />
      <CardContent>
        <Link
          href={getUserProfilePath(user.name)}
          sx={{ display: "flex", textDecoration: "none" }}
        >
          <UserAvatar
            user={user}
            size={24}
            sx={{ marginRight: 1.5, marginBottom: 0.25 }}
          />
          <Box>{user.name}</Box>
        </Link>

        <Typography>Uses: {usesText}</Typography>
      </CardContent>
    </Card>
  );
};

export default ServerInviteCard;
