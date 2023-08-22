import { Box, SxProps, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { CommentFragment, useDeleteCommentMutation } from "../../apollo/gen";
import { TypeNames } from "../../constants/common.constants";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import ItemMenu from "../Shared/ItemMenu";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

interface Props {
  comment: CommentFragment;
  currentUserId?: number;
  postId?: number;
}

const Comment = ({
  comment: { id, user, body, __typename },
  currentUserId,
  postId,
}: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const [showItemMenu, setShowItemMenu] = useState(false);
  const [deleteComment] = useDeleteCommentMutation();

  const { t } = useTranslation();

  const isMe = user.id === currentUserId;
  const userPath = getUserProfilePath(user.name);
  const deleteCommentPrompt = t("prompts.deleteItem", { itemType: "comment" });

  const itemMenuStyles: SxProps = {
    alignSelf: "center",
    marginLeft: 0.5,
    width: 40,
    height: 40,
  };

  const handleDelete = async () =>
    await deleteComment({
      variables: { id },
      update(cache) {
        if (postId) {
          cache.modify({
            id: cache.identify({ id: postId, __typename: TypeNames.Post }),
            fields: {
              commentCount(existingCount: number) {
                return existingCount - 1;
              },
            },
          });
        }
        const cacheId = cache.identify({ __typename, id });
        cache.evict({ id: cacheId });
        cache.gc();
      },
      onCompleted() {
        setMenuAnchorEl(null);
      },
    });

  return (
    <Flex
      marginBottom={1.25}
      onMouseEnter={() => setShowItemMenu(true)}
      onMouseLeave={() => setShowItemMenu(false)}
    >
      <UserAvatar
        sx={{ marginRight: 1, marginTop: 0.2 }}
        user={user}
        size={35}
      />

      <Box
        sx={{ backgroundColor: "#38393a" }}
        borderRadius={4}
        paddingX={1.5}
        paddingY={0.5}
      >
        <Link href={userPath}>{user.name}</Link>
        <Typography lineHeight={1.2}>{body}</Typography>
      </Box>

      {showItemMenu && (
        <ItemMenu
          anchorEl={menuAnchorEl}
          buttonStyles={itemMenuStyles}
          canDelete={isMe}
          deleteItem={handleDelete}
          deletePrompt={deleteCommentPrompt}
          setAnchorEl={setMenuAnchorEl}
        />
      )}
    </Flex>
  );
};

export default Comment;
