import {
  ProposalActionRoleMemberInput,
  RoleMemberFragment,
  UserAvatarFragment,
} from "../../apollo/gen";
import { RoleMemberChangeType } from "../../constants/role.constants";
import RoleMemberOption from "../Roles/RoleMemberOption";

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
    <RoleMemberOption
      handleChange={handleChange}
      checked={checked}
      user={member}
    />
  );
};

export default ProposeRoleMemberOption;
