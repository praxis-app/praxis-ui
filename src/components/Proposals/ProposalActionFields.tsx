import { CropOriginal } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FormikErrors, FormikTouched } from "formik";
import { t } from "i18next";
import { CreateProposalInput, ProposalFormFragment } from "../../apollo/gen";
import {
  ProposalActionFieldNames,
  ProposalActionTypes,
} from "../../constants/proposal.constants";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import { TextField } from "../Shared/TextField";

interface Props {
  editProposal?: ProposalFormFragment;
  errors: FormikErrors<CreateProposalInput>;
  setFieldValue: (field: string, value: any) => void;
  submitCount: number;
  touched: FormikTouched<CreateProposalInput>;
  values: CreateProposalInput;
}

const ProposalActionFields = ({
  editProposal,
  errors,
  setFieldValue,
  submitCount,
  touched,
  values,
}: Props) => {
  if (values.action.actionType === ProposalActionTypes.ChangeName) {
    const isInvalid = !!errors.action?.groupName && touched.action?.groupName;
    return (
      <TextField
        autoComplete="off"
        error={isInvalid}
        label={t("proposals.labels.newGroupName")}
        name={ProposalActionFieldNames.GroupName}
      />
    );
  }

  if (values.action.actionType === ProposalActionTypes.ChangeDescription) {
    const isInvalid =
      !!errors.action?.groupDescription && touched.action?.groupDescription;
    return (
      <TextField
        autoComplete="off"
        error={isInvalid}
        label={t("proposals.labels.newGroupDescription")}
        name={ProposalActionFieldNames.GroupDescription}
      />
    );
  }

  if (values.action.actionType === ProposalActionTypes.ChangeCoverPhoto) {
    const isInvalid = !!(errors.action?.groupCoverPhoto && submitCount);
    const savedImage =
      editProposal?.action.groupCoverPhoto && !values.action.groupCoverPhoto
        ? [editProposal.action.groupCoverPhoto]
        : [];

    const handleChange = (images: File[]) =>
      setFieldValue(ProposalActionFieldNames.GroupCoverPhoto, images[0]);

    return (
      <Box marginTop={1.5}>
        <AttachedImagePreview
          imageContainerStyles={{ marginBottom: 1 }}
          savedImages={savedImage}
          selectedImages={
            values.action.groupCoverPhoto ? [values.action.groupCoverPhoto] : []
          }
          sx={{ marginTop: 1 }}
        />

        <ImageInput
          sx={{ cursor: "pointer", marginTop: 0 }}
          name={ProposalActionFieldNames.GroupCoverPhoto}
          onChange={handleChange}
        >
          <Typography
            color={isInvalid ? "error" : "primary"}
            sx={{ display: "flex", fontSize: 14 }}
          >
            <CropOriginal sx={{ marginRight: "0.25ch", fontSize: 20 }} />
            {t("proposals.actions.attachNewCoverPhoto")}
          </Typography>
        </ImageInput>

        {isInvalid && (
          <Typography color="error" fontSize="small" marginLeft={0.25}>
            {t("proposals.errors.missingGroupCoverPhoto")}
          </Typography>
        )}
      </Box>
    );
  }

  return null;
};

export default ProposalActionFields;
