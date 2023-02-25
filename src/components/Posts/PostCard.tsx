import { useReactiveVar } from "@apollo/client";
import {
  Box,
  Card,
  CardContent as MuiCardContent,
  CardHeader as MuiCardHeader,
  CardProps,
  Divider,
  styled,
  SxProps,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import {
  PostCardFragment,
  useDeletePostMutation,
  useMeQuery,
} from "../../apollo/gen";
import {
  MIDDOT_WITH_SPACES,
  NavigationPaths,
} from "../../constants/common.constants";
import { ServerPermissions } from "../../constants/role.constants";
import { redirectTo } from "../../utils/common.utils";
import { getGroupPath } from "../../utils/group.utils";
import { timeAgo } from "../../utils/time.utils";
import { getUserProfilePath } from "../../utils/user.utils";
import GroupItemAvatar from "../Groups/GroupItemAvatar";
import AttachedImageList from "../Images/AttachedImageList";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";
import { removePost } from "./DeletePostButton";
import PostCardFooter from "./PostCardFooter";

const CardHeader = styled(MuiCardHeader)(() => ({
  paddingBottom: 0,
  "& .MuiCardHeader-avatar": {
    marginRight: 11,
  },
  "& .MuiCardHeader-title": {
    fontSize: 15,
  },
}));

const CardContent = styled(MuiCardContent)(() => ({
  paddingBottom: 0,
  "&:last-child": {
    paddingBottom: 0,
  },
}));

interface Props extends CardProps {
  post: PostCardFragment;
}

const PostCard = ({ post, ...cardProps }: Props) => {
  const { data } = useMeQuery();
  const [deletePost] = useDeletePostMutation();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const { asPath } = useRouter();
  const { t } = useTranslation();

  const { id, body, images, user, group, createdAt } = post;
  const me = data && data.me;
  const isMe = me?.id === user.id;
  const formattedDate = timeAgo(createdAt);

  const groupPath = getGroupPath(group?.name || "");
  const isGroupPage = asPath.includes(NavigationPaths.Groups);
  const isPostPage = asPath.includes(NavigationPaths.Posts);
  const postPath = `${NavigationPaths.Posts}/${id}`;
  const userProfilePath = getUserProfilePath(user?.name);

  const bodyStyles: SxProps = {
    marginBottom: images.length ? 2.5 : 3.5,
  };
  const cardContentStyles: SxProps = {
    paddingTop: images.length && !body ? 2.5 : 3,
  };
  const imageListStyles: SxProps = {
    marginBottom: isLoggedIn ? 1.9 : 0,
  };

  const handleDelete = async (id: number) => {
    if (isPostPage) {
      await redirectTo(NavigationPaths.Home);
    }
    await deletePost({
      variables: { id },
      update: removePost(id),
    });
  };

  const renderAvatar = () => {
    if (group && !isGroupPage) {
      return <GroupItemAvatar user={user} group={group} />;
    }
    return <UserAvatar user={user} withLink />;
  };

  const renderTitle = () => {
    const showGroup = group && !isGroupPage;
    return (
      <Box marginBottom={showGroup ? -0.5 : 0}>
        {showGroup && (
          <Link href={groupPath}>
            <Typography color="primary" lineHeight={1} fontSize={15}>
              {group.name}
            </Typography>
          </Link>
        )}
        <Box fontSize={14}>
          <Link
            href={userProfilePath}
            sx={showGroup ? { color: "inherit" } : undefined}
          >
            {user?.name}
          </Link>
          {MIDDOT_WITH_SPACES}
          <Link href={postPath} sx={{ color: "inherit", fontSize: 13 }}>
            {formattedDate}
          </Link>
        </Box>
      </Box>
    );
  };

  const renderMenu = () => {
    const editPostPath = `${NavigationPaths.Posts}/${id}${NavigationPaths.Edit}`;
    const deletePostPrompt = t("prompts.deleteItem", { itemType: "post" });

    const hasPermission = me?.serverPermissions.includes(
      ServerPermissions.ManagePosts
    );
    const canDelete = hasPermission || isMe;

    return (
      <ItemMenu
        anchorEl={menuAnchorEl}
        canDelete={canDelete}
        canEdit={isMe}
        deleteItem={handleDelete}
        deletePrompt={deletePostPrompt}
        editPath={editPostPath}
        itemId={id}
        setAnchorEl={setMenuAnchorEl}
      />
    );
  };

  return (
    <Card {...cardProps}>
      <CardHeader
        action={renderMenu()}
        avatar={renderAvatar()}
        title={renderTitle()}
      />

      <CardContent sx={cardContentStyles}>
        {body && <Typography sx={bodyStyles}>{body}</Typography>}

        {!!images.length && (
          <Link aria-label={t("images.labels.attachedImages")} href={postPath}>
            <AttachedImageList images={images} sx={imageListStyles} />
          </Link>
        )}

        {isLoggedIn && <Divider />}
      </CardContent>

      {isLoggedIn && <PostCardFooter />}
    </Card>
  );
};

export default PostCard;
