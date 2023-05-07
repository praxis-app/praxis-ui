import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ProposalActionFragment } from "../../apollo/gen";
import { ProposalActionType } from "../../constants/proposal.constants";
import AttachedImage from "../Images/AttachedImage";
import ProposalActionRole from "./ProposalActionRole";

interface Props {
  action: ProposalActionFragment;
  ratified: boolean;
}

const ProposalAction = ({
  action: { actionType, groupDescription, groupName, groupCoverPhoto, role },
  ratified,
}: Props) => {
  const { t } = useTranslation();

  if (actionType === ProposalActionType.ChangeName) {
    return (
      <Typography marginBottom={3.5}>
        {t("proposals.labels.newGroupName")}: {groupName}
      </Typography>
    );
  }

  if (actionType === ProposalActionType.ChangeDescription) {
    return (
      <Typography marginBottom={3.5}>
        {t("proposals.labels.newGroupDescription")}: {groupDescription}
      </Typography>
    );
  }

  if (actionType === ProposalActionType.ChangeCoverPhoto) {
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

  if (
    actionType === ProposalActionType.CreateRole ||
    actionType === ProposalActionType.ChangeRole
  ) {
    if (!role) {
      return <Typography>{t("errors.somethingWentWrong")}</Typography>;
    }
    return (
      <ProposalActionRole
        actionType={actionType}
        ratified={ratified}
        role={role}
      />
    );
  }

  return null;
};

export default ProposalAction;
