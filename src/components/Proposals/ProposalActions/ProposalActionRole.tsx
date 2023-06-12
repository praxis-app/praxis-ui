import { Circle } from "@mui/icons-material";
import {
  Box,
  BoxProps,
  Divider,
  Grid,
  SxProps,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ProposalActionRoleFragment,
  ProposalActionRoleInput,
  ProposalActionRoleMemberInput,
  useRoleByRoleIdLazyQuery,
  useUsersByIdsLazyQuery,
} from "../../../apollo/gen";
import { ChangeType } from "../../../constants/common.constants";
import { ProposalActionType } from "../../../constants/proposal.constants";
import { useIsDesktop } from "../../../hooks/common.hooks";
import Accordion, {
  AccordionDetails,
  AccordionSummary,
} from "../../Shared/Accordion";
import Flex from "../../Shared/Flex";
import ProgressBar from "../../Shared/ProgressBar";
import ChangeIcon from "./ChangeIcon";
import ProposalActionPermission from "./ProposalActionPermission";
import ProposalActionRoleMember from "./ProposalActionRoleMember";

interface Props extends Omit<BoxProps, "role"> {
  role: ProposalActionRoleFragment | ProposalActionRoleInput;
  actionType: ProposalActionType;
  ratified?: boolean;
  preview?: boolean;
}

const ProposalActionRole = ({
  actionType,
  preview,
  ratified,
  role,
  ...boxProps
}: Props) => {
  const { asPath } = useRouter();
  const isProposalPage = asPath.includes("/proposals/");
  const [showRole, setShowRole] = useState(!!preview || isProposalPage);

  const [
    getSelectedRole,
    {
      data: selectedRoleData,
      loading: selectedRoleLoading,
      error: selectedRoleError,
    },
  ] = useRoleByRoleIdLazyQuery();

  const [
    getSelectedUsers,
    {
      data: selectedUsersData,
      loading: selectedUsersLoading,
      error: selectedUsersError,
    },
  ] = useUsersByIdsLazyQuery();

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();
  const theme = useTheme();

  // Fetch data required for preview in ProposalForm
  useEffect(() => {
    if (!preview || !role.members) {
      return;
    }
    const userIds = role.members.map(
      (member) => (member as ProposalActionRoleMemberInput).userId
    );
    getSelectedUsers({
      variables: { userIds },
    });
    if ("roleToUpdateId" in role && role.roleToUpdateId) {
      getSelectedRole({
        variables: { id: role.roleToUpdateId },
      });
    }
  }, [preview, getSelectedUsers, getSelectedRole, role]);

  if (selectedRoleError || selectedUsersError) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (selectedRoleLoading || selectedUsersLoading) {
    return <ProgressBar />;
  }

  const { name, color, permissions, members } = role;
  const roleToChange = "role" in role ? role.role : selectedRoleData?.role;

  const oldName =
    ratified && "oldName" in role ? role.oldName : roleToChange?.name;
  const oldColor =
    ratified && "oldColor" in role ? role.oldColor : roleToChange?.color;

  const isRoleChange = actionType === ProposalActionType.ChangeRole;
  const isChangingName = isRoleChange && name && name !== oldName;
  const isChangingColor = isRoleChange && color && color !== oldColor;

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
    color: isChangingColor ? oldColor : color,
    marginTop: 0.5,
    fontSize: 16,
  };
  const colorChangeIconStyles: SxProps = {
    ...circleIconStyles,
    fontSize: 14,
    marginRight: "0.8ch",
    marginTop: 0.4,
  };
  const changeStyles: SxProps = {
    borderColor: theme.palette.divider,
    borderRadius: 1,
    borderStyle: "solid",
    borderWidth: 1,
    fontSize: 14,
    marginBottom: 1,
    paddingX: 0.6,
    paddingY: 0.5,
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
          {isChangingName ? oldName : name}
        </AccordionSummary>

        <AccordionDetails sx={{ marginBottom: isDesktop ? 2 : 3 }}>
          {!isRoleChange && !members?.length && !permissions?.length && (
            <Typography>
              {t("proposals.prompts.emptyPermsAndMembers")}
            </Typography>
          )}

          <Grid
            columns={isDesktop ? 12 : 4}
            columnSpacing={3}
            rowSpacing={1}
            container
          >
            {isRoleChange && (
              <>
                {isChangingName && (
                  <Grid item xs={6}>
                    <Typography
                      fontFamily="Inter Bold"
                      fontSize={15}
                      paddingTop={0.2}
                      gutterBottom
                    >
                      {t("proposals.labels.name")}
                    </Typography>

                    <Flex marginBottom={isDesktop ? 0 : 1} sx={changeStyles}>
                      <ChangeIcon
                        changeType={ChangeType.Remove}
                        sx={{ marginRight: "1ch" }}
                      />
                      <Typography
                        color="primary"
                        fontSize="inherit"
                        marginRight="0.25ch"
                      >
                        {oldName}
                      </Typography>
                    </Flex>

                    <Flex sx={changeStyles}>
                      <ChangeIcon
                        changeType={ChangeType.Add}
                        sx={{ marginRight: "1ch" }}
                      />
                      <Typography
                        color="primary"
                        fontSize="inherit"
                        marginRight="0.25ch"
                      >
                        {name}
                      </Typography>
                    </Flex>
                  </Grid>
                )}

                {isChangingColor && (
                  <Grid item xs={6}>
                    <Typography
                      fontFamily="Inter Bold"
                      fontSize={15}
                      gutterBottom
                    >
                      {t("proposals.labels.color")}
                    </Typography>

                    <Flex sx={changeStyles}>
                      <ChangeIcon
                        changeType={ChangeType.Remove}
                        sx={{ marginRight: "0.8ch" }}
                      />
                      <Circle sx={colorChangeIconStyles} />
                      <Typography
                        color="primary"
                        fontSize="inherit"
                        marginRight="0.25ch"
                      >
                        {oldColor}
                      </Typography>
                    </Flex>

                    <Flex sx={changeStyles}>
                      <ChangeIcon
                        changeType={ChangeType.Add}
                        sx={{ marginRight: "0.8ch" }}
                      />
                      <Circle sx={{ ...colorChangeIconStyles, color }} />
                      <Typography
                        color="primary"
                        fontSize="inherit"
                        marginRight="0.25ch"
                      >
                        {color}
                      </Typography>
                    </Flex>
                  </Grid>
                )}
              </>
            )}

            {!!permissions?.length && (
              <Grid item xs={!isRoleChange ? 5 : 6}>
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
              </Grid>
            )}

            {!isRoleChange && !!(permissions?.length && members?.length) && (
              <Grid item xs={isDesktop ? 1.25 : 12}>
                <Divider
                  orientation={isDesktop ? "vertical" : "horizontal"}
                  sx={{
                    marginTop: isDesktop ? 0.6 : 1,
                    marginBottom: isDesktop ? 0 : 1,
                  }}
                />
              </Grid>
            )}

            {!!members?.length && (
              <Grid item xs={!isRoleChange ? 5.75 : 6}>
                <Typography fontFamily="Inter Bold" fontSize={15} gutterBottom>
                  {t("roles.labels.members")}
                </Typography>

                {members.map((member) => (
                  <ProposalActionRoleMember
                    key={"id" in member ? member.id : member.userId}
                    selectedUsers={selectedUsersData?.usersByIds}
                    actionType={actionType}
                    member={member}
                  />
                ))}
              </Grid>
            )}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProposalActionRole;
