import { PostCardFragment } from "../../apollo/gen";
import Modal from "../Shared/Modal";
import PostCard from "./PostCard";

interface Props {
  open: boolean;
  onClose(): void;
  post: PostCardFragment;
}

const PostModal = ({ open, onClose, post }: Props) => (
  <Modal
    onClose={onClose}
    open={open}
    title="User's Post"
    maxWidth="md"
    contentStyles={{ width: "700px" }}
  >
    <PostCard post={post} inModal />
  </Modal>
);

export default PostModal;
