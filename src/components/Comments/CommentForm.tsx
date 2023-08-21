import { FilledInput, FormGroup, SxProps } from "@mui/material";
import { Form, Formik, FormikFormProps, FormikHelpers } from "formik";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  CommentFormFragment,
  CreateCommentInput,
  UpdateCommentInput,
  useCreateCommentMutation,
  useUpdateCommentMutation,
} from "../../apollo/gen";
import {
  FieldNames,
  KeyCodes,
  TypeNames,
} from "../../constants/common.constants";
import UserAvatar from "../Users/UserAvatar";

interface Props extends FormikFormProps {
  editComment?: CommentFormFragment;
  postId?: number;
}

const CommentForm = ({ editComment, postId, ...formProps }: Props) => {
  const [createComment] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();

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
  ) =>
    await createComment({
      variables: { commentData: { postId, ...formValues } },
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
      },
    });

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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      {...formProps}
    >
      {({ handleChange, values, submitForm }) => (
        <Form>
          <FormGroup row>
            <UserAvatar size={35} sx={{ marginRight: 1 }} />

            <FilledInput
              autoComplete="off"
              name={FieldNames.Body}
              onChange={handleChange}
              onKeyDown={(e) => handleFilledInputKeyDown(e, submitForm)}
              placeholder={t("comments.prompts.leaveAComment")}
              sx={filledInputStyles}
              value={values.body || ""}
              disableUnderline
              multiline
            />
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export default CommentForm;
