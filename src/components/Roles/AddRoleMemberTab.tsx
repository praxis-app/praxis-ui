import { AddCircle, ArrowForwardIos } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent as MuiCardContent,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AddRoleMemberTabFragment,
  UserAvatarFragment,
  useUpdateGroupRoleMutation,
  useUpdateServerRoleMutation,
} from "../../apollo/gen";
import { NavigationPaths } from "../../constants/common.constants";
import Flex from "../Shared/Flex";
import Modal from "../Shared/Modal";
import AddRoleMemberOption from "./AddRoleMemberOption";
import RoleMember from "./RoleMember";

const FlexCardContent = styled(MuiCardContent)(() => ({
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: 12,
  paddingTop: 13,
}));

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 16,
  },
}));

interface Props {
  availableUsersToAdd: UserAvatarFragment[];
  role: AddRoleMemberTabFragment;
}

const AddRoleMemberTab = ({
  availableUsersToAdd,
  role: { id, members },
}: Props) => {
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { asPath } = useRouter();
  const { t } = useTranslation();

  const [updateRole] = (
    asPath.includes(NavigationPaths.Groups)
      ? useUpdateGroupRoleMutation
      : useUpdateServerRoleMutation
  )();

  const addCircleStyles = {
    fontSize: 23,
    marginRight: 1.25,
  };

  const handleAddMembersCardClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async () =>
    await updateRole({
      variables: {
        roleData: { id, selectedUserIds },
      },
      onCompleted() {
        handleCloseModal();
        setSelectedUserIds([]);
      },
    });

  return (
    <>
      <Card sx={{ cursor: "pointer" }} onClick={handleAddMembersCardClick}>
        <CardActionArea>
          <FlexCardContent>
            <Flex>
              <AddCircle color="primary" sx={addCircleStyles} />
              <Typography color="primary">
                {t("roles.actions.addMembers")}
              </Typography>
            </Flex>
            <ArrowForwardIos
              color="primary"
              fontSize="small"
              sx={{ transform: "translateY(2px)" }}
            />
          </FlexCardContent>
        </CardActionArea>
      </Card>

      <Modal
        title={t("roles.actions.addMembers")}
        actionLabel={t("roles.actions.add")}
        closingAction={handleSubmit}
        onClose={handleCloseModal}
        open={isModalOpen}
      >
        {availableUsersToAdd.map((user) => (
          <AddRoleMemberOption
            key={user.id}
            selectedUserIds={selectedUserIds}
            setSelectedUserIds={setSelectedUserIds}
            user={user}
          />
        ))}
      </Modal>

      {!!members.length && (
        <Card>
          <CardContent>
            {members.map((member) => (
              <RoleMember roleMember={member} roleId={id} key={member.id} />
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AddRoleMemberTab;
