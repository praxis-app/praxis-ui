import { Circle } from "@mui/icons-material";
import { Box, Divider, SxProps, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProposalActionRoleFragment } from "../../apollo/gen";
import { ProposalActionType } from "../../constants/proposal.constants";
import { useIsDesktop } from "../../hooks/common.hooks";
import Accordion, {
  AccordionDetails,
  AccordionSummary,
} from "../Shared/Accordion";
import Flex from "../Shared/Flex";
import ProposalActionPermission from "./ProposalActionPermission";
import ProposalActionRoleMember, {
  ChangeTypeColors,
} from "./ProposalActionRoleMember";

interface Props {
  role: ProposalActionRoleFragment;
  actionType: ProposalActionType;
}

const ProposalActionRole = ({
  role: { name, color, permissions, members, role },
  actionType,
}: Props) => {
  const [showRole, setShowRole] = useState(false);

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  const showVerticleDivider = permissions && members && isDesktop;

  const accordionSummary =
    actionType === ProposalActionType.CreateRole
      ? t("proposals.labels.proposedRole")
      : t("proposals.labels.proposedRoleChange");

  const accordionStyles: SxProps = {
    backgroundColor: "rgb(0, 0, 0, 0.1)",
    borderRadius: 2,
    paddingX: 2,
  };
  const circleIconStyles: SxProps = {
    fontSize: 16,
    marginTop: 0.5,
    color,
  };
  const roleAddChangeStyles: SxProps = {
    backgroundColor: ChangeTypeColors.Add,
    borderRadius: 2,
    marginLeft: "0.5ch",
    maxHeight: "24px",
    paddingX: 0.75,
  };
  const roleRemoveChangeStyles: SxProps = {
    ...roleAddChangeStyles,
    backgroundColor: ChangeTypeColors.Remove,
  };
  const roleNameChangeStyles: SxProps = {
    marginBottom: isDesktop ? 1.5 : color && color !== role?.color ? 1 : 3,
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
          <Circle sx={{ ...circleIconStyles, marginRight: "0.5ch" }} />
          {name}
        </AccordionSummary>

        <AccordionDetails sx={{ marginBottom: isDesktop ? 2 : 3 }}>
          {actionType === ProposalActionType.ChangeRole && (
            <>
              {name && name !== role?.name && (
                <Flex sx={roleNameChangeStyles}>
                  <Typography
                    fontFamily="Inter Bold"
                    fontSize={15}
                    gutterBottom
                  >
                    {t("proposals.labels.name")}:
                  </Typography>

                  <Flex sx={roleRemoveChangeStyles}>
                    <Typography color="primary" marginRight="0.25ch">
                      - {role?.name}
                    </Typography>
                  </Flex>

                  <Flex sx={roleAddChangeStyles}>
                    <Typography color="primary" marginRight="0.25ch">
                      + {name}
                    </Typography>
                  </Flex>
                </Flex>
              )}

              {color && color !== role?.color && (
                <Flex marginBottom={isDesktop ? 1.5 : 3}>
                  <Typography
                    fontFamily="Inter Bold"
                    fontSize={15}
                    gutterBottom
                  >
                    {t("proposals.labels.color")}:
                  </Typography>

                  <Flex sx={roleRemoveChangeStyles}>
                    <Typography color="primary" marginRight="0.25ch">
                      -
                    </Typography>
                    <Circle sx={{ ...circleIconStyles, color: role?.color }} />
                  </Flex>

                  <Flex sx={roleAddChangeStyles}>
                    <Typography color="primary" marginRight="0.25ch">
                      +
                    </Typography>
                    <Circle sx={circleIconStyles} />
                  </Flex>
                </Flex>
              )}
            </>
          )}

          <Box
            sx={{
              display: isDesktop ? "flex" : "initial",
              justifyContent: "space-between",
            }}
          >
            {permissions && (
              <Box
                width={isDesktop ? "50%" : undefined}
                marginBottom={isDesktop ? 0 : 2}
                marginTop={isDesktop ? 0 : -2}
              >
                <Typography fontFamily="Inter Bold" fontSize={15} gutterBottom>
                  {t("permissions.labels.permissions")}
                </Typography>

                {permissions.map((permission) => (
                  <ProposalActionPermission
                    actionType={actionType}
                    permission={permission}
                    key={permission.id}
                  />
                ))}
              </Box>
            )}

            {showVerticleDivider && (
              <Divider orientation="vertical" sx={{ marginX: 3 }} flexItem />
            )}

            {members && (
              <Box width={isDesktop ? "50%" : undefined}>
                <Typography fontFamily="Inter Bold" fontSize={15} gutterBottom>
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
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProposalActionRole;
