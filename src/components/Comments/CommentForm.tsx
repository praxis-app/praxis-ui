import { FilledInput, FormGroup, SxProps } from "@mui/material";
import { Form, Formik, FormikFormProps, FormikHelpers } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  CommentFormFragment,
  CreateCommentInput,
  UpdateCommentInput,
  useCreateCommentMutation,
  useDeleteImageMutation,
  useUpdateCommentMutation,
} from "../../apollo/gen";
import {
  FieldNames,
  KeyCodes,
  TypeNames,
} from "../../constants/common.constants";
import { getRandomString } from "../../utils/common.utils";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import UserAvatar from "../Users/UserAvatar";

interface Props extends FormikFormProps {
  editComment?: CommentFormFragment;
  postId?: number;
}

const CommentForm = ({ editComment, postId, ...formProps }: Props) => {
  const [imagesInputKey, setImagesInputKey] = useState("");
  const [images, setImages] = useState<File[]>([]);

  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteImage] = useDeleteImageMutation();

  const { t } = useTranslation();

  const initialValues: CreateCommentInput = {
    body: editComment?.body || "",
  };

  const filledInputStyles: SxProps = {
    borderRadius: 8,
    marginBottom: 1.25,
    paddingY: 0.8,
    flex: 1,
  };

  const handleCreate = async (
    formValues: CreateCommentInput,
    { resetForm, setSubmitting }: FormikHelpers<CreateCommentInput>
  ) => {
    if (!formValues.body && !images?.length) {
      return;
    }
    await createComment({
      variables: {
        commentData: {
          ...formValues,
          postId,
          images,
        },
      },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          createComment: { comment },
        } = data;

        const cacheId = cache.identify({
          __typename: TypeNames.Post,
          id: postId,
        });
        cache.modify({
          id: cacheId,
          fields: {
            comments(existingRefs, { toReference }) {
              return [toReference(comment), ...existingRefs];
            },
          },
        });
      },
      onCompleted() {
        resetForm();
        setSubmitting(false);
        setImages([]);
        setImagesInputKey(getRandomString());
      },
    });
  };

  const handleUpdate = async (
    formValues: Omit<UpdateCommentInput, "id">,
    editComment: CommentFormFragment
  ) => {
    await updateComment({
      variables: {
        commentData: {
          id: editComment.id,
          ...formValues,
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

  const handleFilledInputKeyDown = (
    e: React.KeyboardEvent,
    submitForm: () => void
  ) => {
    if (e.code !== KeyCodes.Enter) {
      return;
    }
    if (e.shiftKey) {
      return;
    }
    e.preventDefault();
    submitForm();
  };

  const handleDeleteSavedImage = async (id: number) => {
    if (editComment) {
      await deleteImage({
        variables: { id },
        update(cache) {
          const cacheId = cache.identify({ id, __typename: TypeNames.Image });
          cache.evict({ id: cacheId });
          cache.gc();
        },
      });
      setImagesInputKey(getRandomString());
    }
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
      {({ handleChange, values, submitForm }) => (
        <Form>
          <FormGroup row sx={{ position: "relative" }}>
            <UserAvatar size={35} sx={{ marginRight: 1 }} />

            <FilledInput
              autoComplete="off"
              name={FieldNames.Body}
              onChange={handleChange}
              onKeyDown={(e) => handleFilledInputKeyDown(e, submitForm)}
              placeholder={t("comments.prompts.writeComment")}
              sx={filledInputStyles}
              value={values.body || ""}
              disableUnderline
              multiline
            />

            <ImageInput
              setImages={setImages}
              refreshKey={imagesInputKey}
              iconStyles={{ color: "text.secondary", fontSize: 25 }}
              position="absolute"
              right={5}
              bottom={7}
              multiple
            />
          </FormGroup>

          <AttachedImagePreview
            handleDelete={handleDeleteSavedImage}
            handleRemove={handleRemoveSelectedImage}
            savedImages={editComment?.images || []}
            selectedImages={images}
            sx={{ marginLeft: 5.5 }}
          />
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
