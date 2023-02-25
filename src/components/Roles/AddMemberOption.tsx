import {
  CardActionArea as MuiCardActionArea,
  Checkbox,
  styled,
  Typography,
} from "@mui/material";
import { UserAvatarFragment } from "../../apollo/gen";
import Flex from "../Shared/Flex";
import UserAvatar from "../Users/UserAvatar";

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

const AddMemberOption = ({
  selectedUserIds,
  setSelectedUserIds,
  user,
}: Props) => {
  const isSelected = !!selectedUserIds.find((userId) => userId === user.id);

  const handleChange = () => {
    if (isSelected) {
      setSelectedUserIds(
        selectedUserIds.filter((userId) => userId !== user.id)
      );
      return;
    }
    setSelectedUserIds([...selectedUserIds, user.id]);
  };

  const actionAreaStyles = {
    borderRadius: 2,
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 0.75,
    paddingRight: 0.25,
    paddingY: 0.75,
  };

  return (
    <CardActionArea onClick={handleChange} sx={actionAreaStyles}>
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

export default AddMemberOption;
