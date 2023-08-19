import { Divider, FormGroup } from "@mui/material";
import { Form, Formik, FormikFormProps, FormikHelpers } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  CreateCommentInput,
  UpdateCommentInput,
  useCreateCommentMutation,
  useDeleteImageMutation,
  useUpdateCommentMutation,
} from "../../apollo/gen";
import { FieldNames, TypeNames } from "../../constants/common.constants";
import { getRandomString } from "../../utils/common.utils";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import TextFieldWithAvatar from "../Shared/TextFieldWithAvatar";

interface Props extends FormikFormProps {
  editComment?: any;
}

const CommentForm = ({ editComment, ...formProps }: Props) => {
  const [imagesInputKey, setImagesInputKey] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteImage] = useDeleteImageMutation();

  const { t } = useTranslation();

  const initialValues: CreateCommentInput = {
    body: editComment?.body || "",
  };

  const handleCreate = async (
    formValues: CreateCommentInput,
    { resetForm, setSubmitting }: FormikHelpers<CreateCommentInput>
  ) =>
    await createComment({
      variables: { commentData: { ...formValues, images } },
      onCompleted() {
        resetForm();
        setImages([]);
        setImagesInputKey(getRandomString());
        setSubmitting(false);
      },
    });

  const handleUpdate = async (
    formValues: Omit<UpdateCommentInput, "id">,
    editComment: any
  ) => {
    await updateComment({
      variables: {
        commentData: {
          id: editComment.id,
          ...formValues,
          images,
        },
      },
    });
  };

  const handleSubmit = async (
    formValues: CreateCommentInput | UpdateCommentInput,
    formikHelpers: FormikHelpers<CreateCommentInput | UpdateCommentInput>
  ) => {
    try {
      if (editComment) {
        await handleUpdate(formValues, editComment);
        return;
      }
      await handleCreate(formValues, formikHelpers);
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
    }
  };

  const handleDeleteSavedImage = async (id: number) => {
    if (!editComment) {
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
    setImagesInputKey(getRandomString());
  };

  const handleRemoveSelectedImage = (imageName: string) => {
    setImages(images.filter((image) => image.name !== imageName));
    setImagesInputKey(getRandomString());
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      {...formProps}
    >
      {({ isSubmitting, dirty, handleChange, values }) => (
        <Form>
          <FormGroup>
            <TextFieldWithAvatar
              autoComplete="off"
              name={FieldNames.Body}
              onChange={handleChange}
              placeholder={t("prompts.whatsHappening")}
              value={values.body}
              multiline
            />

            <AttachedImagePreview
              handleDelete={handleDeleteSavedImage}
              handleRemove={handleRemoveSelectedImage}
              savedImages={editComment?.images || []}
              selectedImages={images}
            />
          </FormGroup>

          <Divider sx={{ marginBottom: 1.3 }} />

          <Flex sx={{ justifyContent: "space-between" }}>
            <ImageInput
              refreshKey={imagesInputKey}
              setImages={setImages}
              multiple
            />

            <PrimaryActionButton
              disabled={isSubmitting || (!dirty && !images.length)}
              isLoading={isSubmitting}
              sx={{ marginTop: 1.5 }}
              type="submit"
            >
              {t(editComment ? "actions.save" : "actions.comment")}
            </PrimaryActionButton>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
