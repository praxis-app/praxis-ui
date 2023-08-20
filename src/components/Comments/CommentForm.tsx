import { FilledInput, FormGroup } from "@mui/material";
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
import { FieldNames, KeyCodes } from "../../constants/common.constants";

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

  const handleCreate = async (
    formValues: CreateCommentInput,
    { resetForm, setSubmitting }: FormikHelpers<CreateCommentInput>
  ) =>
    await createComment({
      variables: { commentData: { postId, ...formValues } },
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
      {...formProps}
    >
      {({ handleChange, values, submitForm }) => (
        <Form>
          <FormGroup>
            <FilledInput
              autoComplete="off"
              placeholder={t("comments.prompts.leaveAComment")}
              name={FieldNames.Body}
              onChange={handleChange}
              value={values.body || ""}
              sx={{
                borderRadius: 9999,
                marginBottom: 1.25,
                paddingY: 1,
              }}
              onKeyDown={(e) => {
                if (e.code !== KeyCodes.Enter) {
                  return;
                }
                if (e.shiftKey) {
                  return;
                }
                e.preventDefault();
                submitForm();
              }}
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
