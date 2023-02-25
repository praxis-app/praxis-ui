// TODO: Implement remaining functionality - below is a WIP

import { DateRange as JoinDateIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent as MuiCardContent,
  CardHeader,
  CardProps,
  styled,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useMeQuery, UserProfileCardFragment } from "../../apollo/gen";
import {
  MIDDOT_WITH_SPACES,
  NavigationPaths,
} from "../../constants/common.constants";
import { useIsDesktop } from "../../hooks/common.hooks";
import { inDevToast } from "../../utils/common.utils";
import { formatDate } from "../../utils/time.utils";
import CoverPhoto from "../Images/CoverPhoto";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import UserAvatar from "./UserAvatar";

const CardContent = styled(MuiCardContent)(() => ({
  paddingTop: 0,
  "&:last-child": {
    paddingBottom: 15,
  },
}));

const USER_NAME_STYLES: SxProps = {
  fontSize: 25,
  lineHeight: 1,
  marginBottom: 1.25,
};
const JOIN_DATE_STYLES: SxProps = {
  marginBottom: 1.4,
  marginLeft: -0.2,
};
const JOIN_DATE_ICON_STYLES: SxProps = {
  marginBottom: -0.5,
  marginRight: "0.3ch",
};

interface Props extends CardProps {
  user: UserProfileCardFragment;
}

const UserProfileCard = ({ user, ...cardProps }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const { data } = useMeQuery();

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();
  const theme = useTheme();

  const me = data && data.me;
  const isMe = me?.id === user.id;
  const joinDate = formatDate(user.createdAt);

  const deleteUserPrompt = t("prompts.deleteItem", { itemType: "user" });
  const editUserPath = `${NavigationPaths.Users}/${user.name}${NavigationPaths.Edit}`;

  const avatarStyles: SxProps = {
    border: `4px solid ${theme.palette.background.paper}`,
    marginBottom: 1.25,
    marginLeft: -0.25,
    marginTop: isDesktop ? -10.5 : -7,
  };

  return (
    <Card {...cardProps}>
      <CoverPhoto imageId={user.coverPhoto?.id} topRounded />

      <CardHeader
        action={
          isMe && (
            <ItemMenu
              anchorEl={menuAnchorEl}
              deletePrompt={deleteUserPrompt}
              editPath={editUserPath}
              itemId={user.id}
              setAnchorEl={setMenuAnchorEl}
              canEdit
            />
          )
        }
        avatar={
          <UserAvatar
            size={isDesktop ? 150 : 90}
            sx={avatarStyles}
            user={user}
          />
        }
        sx={{ paddingBottom: 0 }}
      />

      <CardContent>
        <Typography color="primary" sx={USER_NAME_STYLES}>
          {user.name}
        </Typography>

        {user.bio && (
          <Typography sx={{ marginBottom: 1.4 }}>{user.bio}</Typography>
        )}

        <Typography sx={JOIN_DATE_STYLES}>
          <JoinDateIcon fontSize="small" sx={JOIN_DATE_ICON_STYLES} />
          {t("users.profile.joinDate", { joinDate })}
        </Typography>

        <Box onClick={inDevToast}>
          <Link href={"/"} disabled>
            {t("users.profile.followersX", { count: 0 })}
          </Link>
          {MIDDOT_WITH_SPACES}
          <Link href={"/"} disabled>
            {t("users.profile.followingX", { count: 0 })}
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
