import {
  CardActionArea as MuiCardActionArea,
  Checkbox,
  styled,
  Typography,
} from "@mui/material";
import {
  ProposalActionRoleMemberInput,
  RoleMemberFragment,
  UserAvatarFragment,
} from "../../apollo/gen";
import { RoleMemberChangeType } from "../../constants/role.constants";
import { ROLE_MEMBER_OPTION_STYLES } from "../Roles/RoleMemberOption";
import Flex from "../Shared/Flex";
import UserAvatar from "../Users/UserAvatar";

const CardActionArea = styled(MuiCardActionArea)(() => ({
  marginBottom: 2,
  "&:last-child": {
    marginBottom: 0,
  },
}));

interface Props {
  member: UserAvatarFragment;
  selectedMembers: ProposalActionRoleMemberInput[];
  setSelectedMembers(selectedMembers: ProposalActionRoleMemberInput[]): void;
  currentRoleMembers?: RoleMemberFragment[];
}

const ProposeRoleMemberOption = ({
  member,
  selectedMembers,
  setSelectedMembers,
  currentRoleMembers,
}: Props) => {
  const isSelectedToAdd = selectedMembers.some(
    ({ userId, changeType }) =>
      userId === member.id && changeType === RoleMemberChangeType.Add
  );
  const isSelectedToRemove = selectedMembers.some(
    ({ userId, changeType }) =>
      userId === member.id && changeType === RoleMemberChangeType.Remove
  );
  const isAlreadyAdded = currentRoleMembers?.some(({ id }) => id === member.id);

  const checked = (isAlreadyAdded && !isSelectedToRemove) || isSelectedToAdd;

  const handleChange = () => {
    if (!isAlreadyAdded && !checked) {
      setSelectedMembers([
        ...selectedMembers,
        {
          changeType: RoleMemberChangeType.Add,
          userId: member.id,
        },
      ]);
      return;
    }
    if (isAlreadyAdded && checked) {
      setSelectedMembers([
        ...selectedMembers,
        {
          changeType: RoleMemberChangeType.Remove,
          userId: member.id,
        },
      ]);
      return;
    }
    setSelectedMembers(
      selectedMembers.filter(({ userId }) => userId !== member.id)
    );
  };

  return (
    <CardActionArea onClick={handleChange} sx={ROLE_MEMBER_OPTION_STYLES}>
      <Flex>
        <UserAvatar user={member} sx={{ marginRight: 1.5 }} />
        <Typography color="primary" marginTop={1} sx={{ userSelect: "none" }}>
          {member.name}
        </Typography>
      </Flex>

      <Checkbox checked={checked} disableRipple />
    </CardActionArea>
  );
};

export default ProposeRoleMemberOption;
