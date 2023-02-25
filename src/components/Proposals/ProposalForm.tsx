import {
  Divider,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  Form,
  Formik,
  FormikErrors,
  FormikFormProps,
  FormikHelpers,
} from "formik";
import produce from "immer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  CreateProposalInput,
  HomePageDocument,
  HomePageQuery,
  ProposalActionInput,
  ProposalFormFragment,
  UpdateProposalInput,
  useCreateProposalMutation,
  useDeleteImageMutation,
  useMeQuery,
  useUpdateProposalMutation,
} from "../../apollo/gen";
import {
  FieldNames,
  NavigationPaths,
  TypeNames,
} from "../../constants/common.constants";
import {
  ProposalActionFieldNames,
  ProposalActionTypes,
} from "../../constants/proposal.constants";
import { redirectTo } from "../../utils/common.utils";
import { getProposalActionTypeOptions } from "../../utils/proposal.utils";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import TextFieldWithAvatar from "../Shared/TextFieldWithAvatar";
import ProposalActionFields from "./ProposalActionFields";

type ProposalFormErrors = {
  action: FormikErrors<ProposalActionInput>;
  groupId?: string;
};

interface Props extends FormikFormProps {
  editProposal?: ProposalFormFragment;
  groupId?: number;
}

const ProposalForm = ({ editProposal, groupId, ...formProps }: Props) => {
  const [clicked, setClicked] = useState(false);
  const { data } = useMeQuery();

  const [createProposal] = useCreateProposalMutation();
  const [updateProposal] = useUpdateProposalMutation();
  const [deleteImage] = useDeleteImageMutation();

  const { t } = useTranslation();

  const action: ProposalActionInput = {
    actionType: editProposal?.action.actionType || "",
    groupDescription: editProposal?.action.groupDescription || "",
    groupName: editProposal?.action.groupName || "",
  };
  const initialValues: CreateProposalInput = {
    body: editProposal?.body || "",
    action,
    groupId,
  };
  const actionTypeOptions = getProposalActionTypeOptions(t);
  const joinedGroups = data?.me.joinedGroups;

  const validateProposal = ({ action, groupId }: CreateProposalInput) => {
    const errors: ProposalFormErrors = {
      action: {},
    };
    if (!action.actionType) {
      errors.action.actionType = t("proposals.errors.missingActionType");
    }
    if (
      action.actionType === ProposalActionTypes.ChangeName &&
      !action.groupName
    ) {
      errors.action.groupName = t("proposals.errors.missingGroupName");
    }
    if (
      action.actionType === ProposalActionTypes.ChangeDescription &&
      !action.groupDescription
    ) {
      errors.action.groupDescription = t(
        "proposals.errors.missingGroupDescription"
      );
    }
    if (
      action.actionType === ProposalActionTypes.ChangeCoverPhoto &&
      !editProposal?.action.groupCoverPhoto &&
      !action.groupCoverPhoto
    ) {
      errors.action.groupCoverPhoto = t(
        "proposals.errors.missingGroupCoverPhoto"
      );
    }
    if (!groupId && !editProposal) {
      errors.groupId = t("proposals.errors.missingGroupId");
    }
    if (!Object.keys(errors.action).length && !errors.groupId) {
      return {};
    }
    return errors;
  };

  const handleCreate = async (
    formValues: CreateProposalInput,
    { resetForm, setSubmitting }: FormikHelpers<CreateProposalInput>
  ) =>
    await createProposal({
      variables: {
        proposalData: formValues,
      },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          createProposal: { proposal },
        } = data;
        cache.updateQuery<HomePageQuery>(
          { query: HomePageDocument },
          (homePageData) =>
            produce(homePageData, (draft) => {
              draft?.me.homeFeed.unshift(proposal);
            })
        );
        cache.modify({
          id: cache.identify(proposal.user),
          fields: {
            profileFeed(existingRefs, { toReference }) {
              return [toReference(proposal), ...existingRefs];
            },
          },
        });
        if (!proposal.group) {
          return;
        }
        cache.modify({
          id: cache.identify(proposal.group),
          fields: {
            feed(existingRefs, { toReference }) {
              return [toReference(proposal), ...existingRefs];
            },
          },
        });
      },
      onCompleted() {
        resetForm();
        setClicked(false);
        setSubmitting(false);
      },
    });

  const handleUpdate = async (
    formValues: Omit<UpdateProposalInput, "id">,
    editProposal: ProposalFormFragment
  ) => {
    await redirectTo(NavigationPaths.Home);
    await updateProposal({
      variables: {
        proposalData: {
          id: editProposal.id,
          ...formValues,
        },
      },
    });
  };

  const handleSubmit = async (
    formValues: CreateProposalInput | UpdateProposalInput,
    formHelpers: FormikHelpers<CreateProposalInput | UpdateProposalInput>
  ) => {
    try {
      if (editProposal) {
        await handleUpdate(formValues, editProposal);
        return;
      }
      await handleCreate(formValues, formHelpers);
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
      console.error(err);
    }
  };

  const handleDeleteSavedImage = async (id: number) => {
    if (!editProposal) {
      return;
    }
    await deleteImage({
      variables: { id },
      update(cache) {
        const cacheId = cache.identify({ id, __typename: TypeNames.Image });
        cache.evict({ id: cacheId });
        cache.gc();
      },
    });
  };

  const handleImageInputChange =
    (setFieldValue: (field: string, value: File[]) => void) =>
    (images: File[]) =>
      setFieldValue(FieldNames.Images, images);

  const handleRemoveImage =
    (
      setFieldValue: (field: string, value: File[]) => void,
      images: CreateProposalInput["images"]
    ) =>
    (imageName: string) => {
      if (!images) {
        return;
      }
      setFieldValue(
        FieldNames.Images,
        images.filter((image) => image.name !== imageName)
      );
    };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validateProposal}
      enableReinitialize
      {...formProps}
    >
      {({
        dirty,
        errors,
        handleChange,
        isSubmitting,
        submitCount,
        setFieldValue,
        touched,
        values,
      }) => (
        <Form onClick={() => setClicked(true)}>
          <FormGroup>
            <TextFieldWithAvatar
              autoComplete="off"
              name={FieldNames.Body}
              onChange={handleChange}
              placeholder={t("proposals.prompts.createProposal")}
              value={values.body}
              multiline
            />

            {!!(clicked || editProposal || values.body?.length) && (
              <>
                <FormControl
                  variant="standard"
                  sx={{ marginBottom: 1 }}
                  error={
                    !!errors.action?.actionType && touched.action?.actionType
                  }
                >
                  <InputLabel>{t("proposals.labels.action")}</InputLabel>
                  <Select
                    name={ProposalActionFieldNames.ActionType}
                    onChange={handleChange}
                    value={values.action.actionType}
                  >
                    {actionTypeOptions.map((option) => (
                      <MenuItem value={option.value} key={option.value}>
                        {option.message}
                      </MenuItem>
                    ))}
                  </Select>
                  {!!(errors.action?.actionType && submitCount) && (
                    <Typography color="error" fontSize="small" marginTop={0.5}>
                      {t("proposals.errors.missingActionType")}
                    </Typography>
                  )}
                </FormControl>

                {joinedGroups && !editProposal && (
                  <FormControl
                    variant="standard"
                    sx={{ marginBottom: values.action.actionType ? 1 : 0.25 }}
                    error={!!(errors.groupId && touched.groupId)}
                  >
                    <InputLabel>{t("groups.labels.group")}</InputLabel>
                    <Select
                      name="groupId"
                      onChange={handleChange}
                      value={values.groupId || ""}
                    >
                      {joinedGroups.map(({ id, name }) => (
                        <MenuItem value={id} key={id}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                    {!!(errors.groupId && submitCount) && (
                      <Typography
                        color="error"
                        fontSize="small"
                        marginTop={0.5}
                        gutterBottom
                      >
                        {t("proposals.errors.missingGroupId")}
                      </Typography>
                    )}
                  </FormControl>
                )}

                <ProposalActionFields
                  editProposal={editProposal}
                  errors={errors}
                  setFieldValue={setFieldValue}
                  submitCount={submitCount}
                  touched={touched}
                  values={values}
                />
              </>
            )}

            <AttachedImagePreview
              handleDelete={handleDeleteSavedImage}
              savedImages={editProposal?.images || []}
              selectedImages={values.images || []}
              handleRemove={handleRemoveImage(
                setFieldValue,
                values.images || []
              )}
            />
          </FormGroup>

          {!clicked && !editProposal && <Divider sx={{ marginBottom: 1.3 }} />}

          <Flex sx={{ justifyContent: "space-between" }}>
            <ImageInput
              key={values.images?.length}
              onChange={handleImageInputChange(setFieldValue)}
              multiple
            />

            <PrimaryActionButton
              disabled={isSubmitting || !dirty}
              sx={{ marginTop: 1.5 }}
              type="submit"
            >
              {editProposal
                ? t("actions.save")
                : t("proposals.actions.createProposal")}
            </PrimaryActionButton>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default ProposalForm;
