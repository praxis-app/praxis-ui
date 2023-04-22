import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ProposalActionFragment } from "../../apollo/gen";
import { ProposalActionTypes } from "../../constants/proposal.constants";
import AttachedImage from "../Images/AttachedImage";

interface Props {
  action: ProposalActionFragment;
}

const ProposalAction = ({
  action: { actionType, groupDescription, groupName, groupCoverPhoto },
}: Props) => {
  const { t } = useTranslation();
  return (
    <>
      {actionType === ProposalActionTypes.ChangeName && (
        <Typography marginBottom={3.5}>
          {t("proposals.labels.newGroupName")}: {groupName}
        </Typography>
      )}

      {actionType === ProposalActionTypes.ChangeDescription && (
        <Typography marginBottom={3.5}>
          {t("proposals.labels.newGroupDescription")}: {groupDescription}
        </Typography>
      )}

      {actionType === ProposalActionTypes.ChangeCoverPhoto && groupCoverPhoto && (
        <Box marginBottom="20px">
          <Typography gutterBottom fontSize={14}>
            {t("proposals.labels.proposedGroupCoverPhoto")}:
          </Typography>
          <AttachedImage image={groupCoverPhoto} width="55%" />
        </Box>
      )}
    </>
  );
};

export default ProposalAction;
