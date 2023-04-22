import { Circle } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProposalActionRoleFragment } from "../../apollo/gen";
import { getUserProfilePath } from "../../utils/user.utils";
import Accordion, {
  AccordionDetails,
  AccordionSummary,
} from "../Shared/Accordion";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";
import ProposalActionPermission from "./ProposalActionPermission";

interface Props {
  role: ProposalActionRoleFragment;
}

const ProposalActionRole = ({
  role: { name, color, permissions, members },
}: Props) => {
  const [showRole, setShowRole] = useState(false);
  const { t } = useTranslation();

  const accordionStyles = {
    backgroundColor: "rgb(0, 0, 0, 0.1)",
    borderRadius: 2,
    paddingX: 2,
  };
  const circleIconStyles = {
    color,
    fontSize: 16,
    marginRight: "0.5ch",
    marginTop: 0.5,
  };

  return (
    <Box marginBottom={2.5}>
      <Accordion
        expanded={showRole}
        onChange={() => setShowRole(!showRole)}
        sx={accordionStyles}
      >
        <AccordionSummary>
          <Typography marginRight="0.5ch" fontFamily="Inter Bold">
            {t("proposals.labels.proposedRole")}:
          </Typography>
          <Circle sx={circleIconStyles} />
          {name}
        </AccordionSummary>

        <AccordionDetails sx={{ marginBottom: 2 }}>
          <Flex justifyContent="space-between">
            {permissions && (
              <Box width="50%">
                <Typography fontFamily="Inter Bold" gutterBottom>
                  {t("permissions.labels.permissions")}
                </Typography>

                {permissions.map((permission) => (
                  <ProposalActionPermission
                    permission={permission}
                    key={permission.id}
                  />
                ))}
              </Box>
            )}

            {permissions && members && (
              <Divider orientation="vertical" flexItem sx={{ marginX: 3 }} />
            )}

            {members && (
              <Box width="50%">
                <Typography fontFamily="Inter Bold" gutterBottom>
                  {t("roles.labels.members")}
                </Typography>

                {members.map(({ user }) => (
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
            )}
          </Flex>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProposalActionRole;
