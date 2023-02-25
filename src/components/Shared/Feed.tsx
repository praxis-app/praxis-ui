import { Box, BoxProps } from "@mui/material";
import { FeedItemFragment } from "../../apollo/gen";
import PostCard from "../Posts/PostCard";
import ProposalCard from "../Proposals/ProposalCard";

interface Props extends BoxProps {
  feed: FeedItemFragment[];
}

const FeedItem = ({ item }: { item: FeedItemFragment }) => {
  if (item.__typename === "Proposal") {
    return <ProposalCard proposal={item} />;
  }
  if (item.__typename !== "Post") {
    return null;
  }
  return <PostCard post={item} />;
};

const Feed = ({ feed, ...boxProps }: Props) => (
  <Box {...boxProps}>
    {feed.map((item) => (
      <FeedItem item={item} key={`${item.__typename}-${item.id}`} />
    ))}
  </Box>
);

export default Feed;
