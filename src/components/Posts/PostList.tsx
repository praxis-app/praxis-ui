import { Box, BoxProps } from "@mui/material";
import { PostCardFragment } from "../../apollo/gen";
import PostCard from "./PostCard";

interface Props extends BoxProps {
  posts: PostCardFragment[];
}

const PostList = ({ posts, ...boxProps }: Props) => (
  <Box {...boxProps}>
    {posts.map((post) => (
      <PostCard post={post} key={post.id} />
    ))}
  </Box>
);

export default PostList;
