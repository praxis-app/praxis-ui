import { useTranslation } from "react-i18next";
import { PostCardFragment } from "../../apollo/gen";
import { useIsDesktop } from "../../hooks/common.hooks";
import Modal from "../Shared/Modal";
import PostCard from "./PostCard";

interface Props {
  post: PostCardFragment;
  open: boolean;
  onClose(): void;
}

const PostModal = ({ post, open, onClose }: Props) => {
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  const title = t("posts.labels.usersPost", {
    name: post.user.name[0].toUpperCase() + post.user.name.slice(1),
  });

  return (
    <Modal
      contentStyles={{ width: isDesktop ? "700px" : "100%" }}
      maxWidth="md"
      onClose={onClose}
      open={open}
      title={title}
    >
      <PostCard post={post} inModal />
    </Modal>
  );
};

export default PostModal;
