import { Circle } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProposedRoleFragment } from "../../apollo/gen";
import { useIsDesktop } from "../../hooks/common.hooks";
import { getUserProfilePath } from "../../utils/user.utils";
import Accordion, {
  AccordionDetails,
  AccordionSummary,
} from "../Shared/Accordion";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import UserAvatar from "../Users/UserAvatar";
import ProposedPermission from "./ProposedPermission";

interface Props {
  role: ProposedRoleFragment;
}

const ProposedRole = ({
  role: { name, color, permissions, members },
}: Props) => {
  const [showRole, setShowRole] = useState(false);

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  const showDivider = permissions && members && isDesktop;

  const accordionStyles = {
    backgroundColor: "rgb(0, 0, 0, 0.1)",
    borderRadius: 2,
    paddingX: 2,
  };
  const accordionDetailsStyles = {
    display: isDesktop ? "flex" : "initial",
    justifyContent: "space-between",
    marginBottom: 2,
  };
  const circleIconStyles = {
    fontSize: 16,
    marginRight: "0.5ch",
    marginTop: 0.5,
    color,
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

        <AccordionDetails sx={accordionDetailsStyles}>
          {permissions && (
            <Box
              width={isDesktop ? "50%" : undefined}
              marginBottom={isDesktop ? 0 : 2}
              marginTop={isDesktop ? 0 : -2}
            >
              <Typography fontFamily="Inter Bold" gutterBottom>
                {t("permissions.labels.permissions")}
              </Typography>

              {permissions.map((permission) => (
                <ProposedPermission
                  permission={permission}
                  key={permission.id}
                />
              ))}
            </Box>
          )}

          {showDivider && (
            <Divider orientation="vertical" sx={{ marginX: 3 }} flexItem />
          )}

          {members && (
            <Box width={isDesktop ? "50%" : undefined}>
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
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProposedRole;
