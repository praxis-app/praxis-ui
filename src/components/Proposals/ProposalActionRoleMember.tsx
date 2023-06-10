import { SxProps, Typography, useTheme } from "@mui/material";
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
import ChangeBox from "./ChangeBox";

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
  const theme = useTheme();

  const user =
    "userId" in member
      ? selectedUsers?.find((u) => u.id === member.userId)
      : member.user;

  if (!user) {
    return null;
  }

  const isChangingRole = actionType === ProposalActionType.ChangeRole;
  const isRemovingMember = member.changeType === ChangeType.Remove;

  const memberStyles: SxProps = {
    borderColor: theme.palette.divider,
    borderRadius: 1,
    borderStyle: isChangingRole ? "solid" : undefined,
    borderWidth: isChangingRole ? 1 : undefined,
    marginBottom: isChangingRole ? 1 : 0.5,
    paddingX: isChangingRole ? 0.6 : 0,
    paddingY: isChangingRole ? 0.5 : 0,
    fontSize: 14,
  };

  return (
    <Link href={getUserProfilePath(user.name)}>
      <Flex sx={memberStyles}>
        {isChangingRole && (
          <ChangeBox
            changeType={isRemovingMember ? ChangeType.Remove : ChangeType.Add}
            sx={{ marginRight: "1ch" }}
          />
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
