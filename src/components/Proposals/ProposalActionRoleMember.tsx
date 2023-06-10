import { Typography } from "@mui/material";
import {
  ProposalActionRoleMemberFragment,
  ProposalActionRoleMemberInput,
  UserAvatarFragment,
} from "../../apollo/gen";
import { ChangeType } from "../../constants/common.constants";
import { ProposalActionType } from "../../constants/proposal.constants";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

export enum ChangeTypeColors {
  Add = "#324135",
  Remove = "#3f302f",
}

interface Props {
  actionType: ProposalActionType;
  member: ProposalActionRoleMemberFragment | ProposalActionRoleMemberInput;
  selectedUsers?: UserAvatarFragment[];
}

const ProposalActionRoleMember = ({
  member,
  actionType,
  selectedUsers,
}: Props) => {
  const isChangingRole = actionType === ProposalActionType.ChangeRole;
  const isRemovingMember = member.changeType === ChangeType.Remove;

  const user =
    "userId" in member
      ? selectedUsers?.find((u) => u.id === member.userId)
      : member.user;

  const getBackgroundColor = () => {
    if (!isChangingRole) {
      return;
    }
    if (isRemovingMember) {
      return ChangeTypeColors.Remove;
    }
    return ChangeTypeColors.Add;
  };

  if (!user) {
    return null;
  }

  return (
    <Link href={getUserProfilePath(user.name)}>
      <Flex
        borderRadius={2}
        marginBottom={isChangingRole ? 1 : 0.5}
        paddingY={isChangingRole ? 0.25 : 0}
        sx={{ backgroundColor: getBackgroundColor(), fontSize: 14 }}
      >
        {isChangingRole && (
          <Typography
            color="primary"
            fontSize="inherit"
            sx={{ minWidth: 0.07, marginLeft: 1 }}
          >
            {isRemovingMember ? "-" : "+"}
          </Typography>
        )}

        <UserAvatar
          size={16}
          user={user}
          sx={{
            marginRight: 1,
            marginTop: 0.3,
          }}
        />
        <Typography color="primary" fontSize="inherit">
          {user.name}
        </Typography>
      </Flex>
    </Link>
  );
};

export default ProposalActionRoleMember;
