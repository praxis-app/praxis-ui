import { Circle } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ProposalActionRoleFragment } from "../../apollo/gen";
import { getUserProfilePath } from "../../utils/user.utils";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";

interface Props {
  role: ProposalActionRoleFragment;
}

const ProposalActionRole = ({
  role: { name, color, permissions, members },
}: Props) => {
  const { t } = useTranslation();

  const containerStyles = {
    backgroundColor: "rgb(0, 0, 0, 0.1)",
    borderRadius: 2,
    padding: 1.5,
  };
  const circleIconStyles = {
    color,
    fontSize: 16,
    marginRight: "0.5ch",
    marginTop: 0.5,
  };

  return (
    <Box marginBottom={3.5} sx={containerStyles}>
      <Flex marginBottom={1.5}>
        <Typography marginRight="0.5ch">
          {t("proposals.labels.proposedRole")}:
        </Typography>
        <Circle sx={circleIconStyles} />
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
};

export default ProposalActionRole;
