import { Circle } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ProposalActionFragment } from "../../apollo/gen";
import { ProposalActionTypes } from "../../constants/proposal.constants";
import { getUserProfilePath } from "../../utils/user.utils";
import AttachedImage from "../Images/AttachedImage";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

interface Props {
  action: ProposalActionFragment;
}

const ProposalAction = ({
  action: { actionType, groupDescription, groupName, groupCoverPhoto, role },
}: Props) => {
  const { t } = useTranslation();

  if (actionType === ProposalActionTypes.ChangeName) {
    return (
      <Typography marginBottom={3.5}>
        {t("proposals.labels.newGroupName")}: {groupName}
      </Typography>
    );
  }

  if (actionType === ProposalActionTypes.ChangeDescription) {
    return (
      <Typography marginBottom={3.5}>
        {t("proposals.labels.newGroupDescription")}: {groupDescription}
      </Typography>
    );
  }

  if (actionType === ProposalActionTypes.ChangeCoverPhoto) {
    if (!groupCoverPhoto) {
      return <Typography>{t("errors.somethingWentWrong")}</Typography>;
    }
    return (
      <Box marginBottom="20px">
        <Typography gutterBottom fontSize={14}>
          {t("proposals.labels.proposedGroupCoverPhoto")}:
        </Typography>
        <AttachedImage image={groupCoverPhoto} width="55%" />
      </Box>
    );
  }

  if (actionType === ProposalActionTypes.CreateRole) {
    if (!role) {
      return <Typography>{t("errors.somethingWentWrong")}</Typography>;
    }

    const { name, color, permissions, members } = role;

    return (
      <Box
        marginBottom={3.5}
        sx={{
          backgroundColor: "rgb(0, 0, 0, 0.1)",
          borderRadius: 2,
          padding: 1.5,
        }}
      >
        <Flex marginBottom={1.5}>
          <Typography marginRight="0.5ch">
            {t("proposals.labels.proposedRole")}:
          </Typography>
          <Circle
            sx={{
              color,
              fontSize: 16,
              marginRight: "0.5ch",
              marginTop: 0.5,
            }}
          />
          {name}
        </Flex>

        <Flex justifyContent="space-between">
          <Box width="50%">
            <Typography gutterBottom>
              {t("permissions.labels.permissions")}
            </Typography>

            {permissions?.map((permission) => (
              <Typography key={permission.id}>{permission.name}</Typography>
            ))}
          </Box>

          <Divider orientation="vertical" flexItem sx={{ marginX: 3 }} />

          <Box width="50%">
            <Typography gutterBottom>{t("roles.labels.members")}</Typography>

            {members?.map(({ user }) => (
              <Link href={getUserProfilePath(user.name)} key={user.id}>
                <Flex>
                  <UserAvatar
                    size={16}
                    user={user}
                    sx={{
                      marginRight: 1,
                      marginTop: 0.5,
                    }}
                  />
                  <Typography color="primary">{user.name}</Typography>
                </Flex>
              </Link>
            ))}
          </Box>
        </Flex>
      </Box>
    );
  }

  return null;
};

export default ProposalAction;
