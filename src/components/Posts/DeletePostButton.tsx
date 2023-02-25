import { ApolloCache } from "@apollo/client";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import { useDeletePostMutation } from "../../apollo/gen";
import { NavigationPaths, TypeNames } from "../../constants/common.constants";
import { redirectTo } from "../../utils/common.utils";

export const removePost = (postId: number) => (cache: ApolloCache<any>) => {
  const postCacheId = cache.identify({
    __typename: TypeNames.Post,
    id: postId,
  });
  cache.evict({ id: postCacheId });
  cache.gc();
};

interface Props {
  postId: number;
}

const DeletePostButton = ({ postId }: Props) => {
  const [deletePost] = useDeletePostMutation();
  const { t } = useTranslation();

  const handleClick = async () => {
    await redirectTo(NavigationPaths.Home);

    await deletePost({
      variables: { id: postId },
      update: removePost(postId),
      onError() {
        toastVar({
          status: "error",
          title: t("errors.somethingWentWrong"),
        });
      },
    });
  };

  const handleClickWithConfirm = () =>
    window.confirm(t("prompts.deleteItem", { itemType: "post" })) &&
    handleClick();

  return (
    <Button
      color="error"
      onClick={handleClickWithConfirm}
      sx={{ marginTop: 1.5 }}
      variant="outlined"
      fullWidth
    >
      {t("actions.delete")}
    </Button>
  );
};

export default DeletePostButton;
