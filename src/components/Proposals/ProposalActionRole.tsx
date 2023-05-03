import { Circle } from "@mui/icons-material";
import { Box, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProposalActionRoleFragment } from "../../apollo/gen";
import { ProposalActionTypes } from "../../constants/proposal.constants";
import { useIsDesktop } from "../../hooks/common.hooks";
import Accordion, {
  AccordionDetails,
  AccordionSummary,
} from "../Shared/Accordion";
import ProposalActionPermission from "./ProposalActionPermission";
import ProposalActionRoleMember from "./ProposalActionRoleMember";

interface Props {
  role: ProposalActionRoleFragment;
  actionType: ProposalActionTypes;
}

const ProposalActionRole = ({
  role: { name, color, permissions, members },
  actionType,
}: Props) => {
  const [showRole, setShowRole] = useState(false);

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  const showDivider = permissions && members && isDesktop;

  const accordionSummary =
    actionType === ProposalActionTypes.CreateRole
      ? t("proposals.labels.proposedRole")
      : t("proposals.labels.proposedRoleChange");

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
            {accordionSummary}:
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
                <ProposalActionPermission
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

              {members.map((member) => (
                <ProposalActionRoleMember
                  actionType={actionType}
                  key={member.id}
                  member={member}
                />
              ))}
            </Box>
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProposalActionRole;
