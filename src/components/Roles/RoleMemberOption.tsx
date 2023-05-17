// TODO: Refactor to enable setting as ProposalActionRoleMemberInput type

import {
  CardActionArea as MuiCardActionArea,
  Checkbox,
  styled,
  SxProps,
  Typography,
} from "@mui/material";
import { UserAvatarFragment } from "../../apollo/gen";
import Flex from "../Shared/Flex";
import UserAvatar from "../Users/UserAvatar";

export const ROLE_MEMBER_OPTION_STYLES: SxProps = {
  borderRadius: 2,
  display: "flex",
  justifyContent: "space-between",
  paddingLeft: 0.75,
  paddingRight: 0.25,
  paddingY: 0.75,
};

const CardActionArea = styled(MuiCardActionArea)(() => ({
  marginBottom: 2,
  "&:last-child": {
    marginBottom: 0,
  },
}));

interface Props {
  selectedUserIds: number[];
  setSelectedUserIds(selectedUsers: number[]): void;
  user: UserAvatarFragment;
}

const RoleMemberOption = ({
  selectedUserIds,
  setSelectedUserIds,
  user,
}: Props) => {
  const isSelected = selectedUserIds.some((userId) => userId === user.id);

  const handleChange = () => {
    if (isSelected) {
      setSelectedUserIds(
        selectedUserIds.filter((userId) => userId !== user.id)
      );
      return;
    }
    setSelectedUserIds([...selectedUserIds, user.id]);
  };

  return (
    <CardActionArea onClick={handleChange} sx={ROLE_MEMBER_OPTION_STYLES}>
      <Flex>
        <UserAvatar user={user} sx={{ marginRight: 1.5 }} />
        <Typography color="primary" sx={{ marginTop: 1, userSelect: "none" }}>
          {user.name}
        </Typography>
      </Flex>

      <Checkbox checked={isSelected} disableRipple />
    </CardActionArea>
  );
};

export default RoleMemberOption;
