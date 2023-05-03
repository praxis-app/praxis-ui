import { Typography } from "@mui/material";
import { ProposalActionRoleMemberFragment } from "../../apollo/gen";
import { ProposalActionTypes } from "../../constants/proposal.constants";
import { RoleMemberChangeType } from "../../constants/role.constants";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

interface Props {
  member: ProposalActionRoleMemberFragment;
  actionType: ProposalActionTypes;
}

const ProposalActionRoleMember = ({
  member: { user, changeType },
  actionType,
}: Props) => {
  const isChangingRole = actionType === ProposalActionTypes.ChangeRole;
  const isRemovingMember = changeType === RoleMemberChangeType.Remove;

  const getBackgroundColor = () => {
    if (!isChangingRole) {
      return;
    }
    if (isRemovingMember) {
      return "#723431";
    }
    return "#2f5631";
  };

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
