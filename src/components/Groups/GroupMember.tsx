import { styled, Typography } from "@mui/material";
import { GroupMemberFragment } from "../../apollo/gen";
import { getUserProfilePath } from "../../utils/user.utils";
import SharedFlex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

const Flex = styled(SharedFlex)(() => ({
  marginBottom: 15,
  "&:last-child": {
    marginBottom: 0,
  },
}));

interface Props {
  member: GroupMemberFragment;
}

const GroupMember = ({ member: { user } }: Props) => (
  <Flex sx={{ justifyContent: "space-between" }}>
    <Link href={getUserProfilePath(user.name)}>
      <Flex>
        <UserAvatar user={user} sx={{ marginRight: 1.5 }} />
        <Typography sx={{ marginTop: 1 }}>{user.name}</Typography>
      </Flex>
    </Link>
  </Flex>
);

export default GroupMember;
