import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ProposalActionFragment } from "../../apollo/gen";
import { ProposalActionTypes } from "../../constants/proposal.constants";
import AttachedImage from "../Images/AttachedImage";

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
    return (
      <Typography marginBottom={3.5}>
        {t("proposals.labels.proposedRole")}: {role.name}
      </Typography>
    );
  }

  return null;
};

export default ProposalAction;
