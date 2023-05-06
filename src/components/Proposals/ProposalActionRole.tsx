import { Circle } from "@mui/icons-material";
import { Box, BoxProps, Divider, SxProps, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ProposalActionRoleFragment,
  ProposalActionRoleInput,
  ProposalActionRoleMemberInput,
  useUsersByIdsLazyQuery,
} from "../../apollo/gen";
import { ProposalActionType } from "../../constants/proposal.constants";
import { useIsDesktop } from "../../hooks/common.hooks";
import Accordion, {
  AccordionDetails,
  AccordionSummary,
} from "../Shared/Accordion";
import Flex from "../Shared/Flex";
import ProgressBar from "../Shared/ProgressBar";
import ProposalActionPermission from "./ProposalActionPermission";
import ProposalActionRoleMember, {
  ChangeTypeColors,
} from "./ProposalActionRoleMember";

interface Props extends Omit<BoxProps, "role"> {
  role: ProposalActionRoleFragment | ProposalActionRoleInput;
  actionType: ProposalActionType;
  preview?: boolean;
}

const ProposalActionRole = ({
  actionType,
  preview,
  role,
  ...boxProps
}: Props) => {
  const [showRole, setShowRole] = useState(preview);

  const [getUsersByIds, { data, loading, error }] = useUsersByIdsLazyQuery();

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (!preview || !role.members) {
      return;
    }
    const userIds = role.members?.map(
      (member) => (member as ProposalActionRoleMemberInput).userId
    );
    getUsersByIds({
      variables: { userIds },
    });
  }, [preview, getUsersByIds, role]);

  const { name, color, permissions, members } = role;
  const roleToChange = "role" in role ? role.role : undefined;

  const isRoleChange = actionType === ProposalActionType.ChangeRole;
  const isChangingRoleName =
    isRoleChange && name && name !== roleToChange?.name;
  const isChangingRoleColor =
    isRoleChange && color && color !== roleToChange?.color;

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

  // TODO: Refactor to use a function instead
  const roleNameChangeStyles: SxProps = {
    marginBottom: isDesktop
      ? 1.5
      : color && color !== roleToChange?.color
      ? 1
      : 3,
  };

  const getMainContentTopMargin = () => {
    if (isDesktop || isChangingRoleName || isChangingRoleColor) {
      return 0;
    }
    return 1.8;
  };

  return (
    <Box marginBottom={preview ? 0 : 2.5} {...boxProps}>
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
          {isRoleChange && (
            <>
              {isChangingRoleName && (
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
                      - {roleToChange?.name}
                    </Typography>
                  </Flex>

                  <Flex sx={roleAddChangeStyles}>
                    <Typography color="primary" marginRight="0.25ch">
                      + {name}
                    </Typography>
                  </Flex>
                </Flex>
              )}

              {isChangingRoleName && isChangingRoleColor && (
                <Divider
                  sx={{
                    marginTop: isDesktop ? 2.4 : 2,
                    marginBottom: isDesktop ? 3 : 2.6,
                  }}
                />
              )}

              {isChangingRoleColor && (
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
                    <Circle
                      sx={{ ...circleIconStyles, color: roleToChange?.color }}
                    />
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

          {(isChangingRoleName || isChangingRoleColor) &&
            (permissions || members) && (
              <Divider
                sx={{
                  marginTop: isDesktop ? 2 : -0.9,
                  marginBottom: isDesktop ? 3 : 4.4,
                }}
              />
            )}

          <Box
            sx={{
              display: isDesktop ? "flex" : "block",
              justifyContent: "space-between",
              marginTop: getMainContentTopMargin(),
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
                    key={permission.name}
                  />
                ))}
              </Box>
            )}

            {permissions && members && (
              <Divider
                orientation={isDesktop ? "vertical" : "horizontal"}
                flexItem
                sx={{
                  marginBottom: isDesktop ? 0 : 2.1,
                  marginTop: isDesktop ? 0.75 : 3,
                  marginX: isDesktop ? 3 : 0,
                }}
              />
            )}

            {members && (
              <Box width={isDesktop ? "50%" : undefined}>
                <Typography fontFamily="Inter Bold" fontSize={15} gutterBottom>
                  {t("roles.labels.members")}
                </Typography>

                {loading && <ProgressBar />}

                {error && (
                  <Typography marginTop={1}>
                    {t("errors.somethingWentWrong")}
                  </Typography>
                )}

                {members.map((member) => (
                  <ProposalActionRoleMember
                    key={"id" in member ? member.id : member.userId}
                    selectedUsers={data?.usersByIds}
                    actionType={actionType}
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
