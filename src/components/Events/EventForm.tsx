// TODO: Add remaining layout and functionality - below is a WIP

import { FormGroup } from "@mui/material";
import { Form, Formik, FormikHelpers } from "formik";
import produce from "immer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  CreateEventInput,
  Event,
  EventsDocument,
  EventsQuery,
  useCreateEventMutation,
} from "../../apollo/gen";
import { FieldNames } from "../../constants/common.constants";
import { getRandomString } from "../../utils/common.utils";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import { TextField } from "../Shared/TextField";

interface Props {
  // TODO: Replace with fragment type
  editEvent?: Event;

  groupId?: number;
}

const EventForm = ({ editEvent, groupId }: Props) => {
  const [imageInputKey, setImageInputKey] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<File>();
  const [createEvent] = useCreateEventMutation();

  const { t } = useTranslation();

  const initialValues = {
    name: editEvent ? editEvent.name : "",
    description: editEvent ? editEvent.description : "",
    startsAt: editEvent ? editEvent.startsAt : "",
  };

  const handleCreate = async (
    formValues: CreateEventInput,
    { setSubmitting, resetForm }: FormikHelpers<CreateEventInput>
  ) =>
    await createEvent({
      variables: {
        eventData: {
          ...formValues,
          coverPhoto,
          groupId,
        },
      },
      async update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          createEvent: { event },
        } = data;

        cache.updateQuery<EventsQuery>(
          { query: EventsDocument },
          (eventsData) =>
            produce(eventsData, (draft) => {
              draft?.events.unshift(event);
            })
        );
      },
      onCompleted() {
        setImageInputKey(getRandomString());
        setCoverPhoto(undefined);
        setSubmitting(false);
        resetForm();
      },
      onError() {
        throw new Error(t("groups.errors.couldNotCreate"));
      },
    });

  const handleSubmit = async (
    formValues: CreateEventInput,
    formikHelpers: FormikHelpers<CreateEventInput>
  ) => {
    try {
      if (editEvent) {
        // TODO: Add update logic here
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

  const handleRemoveSelectedImage = () => {
    setCoverPhoto(undefined);
    setImageInputKey(getRandomString());
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ isSubmitting, dirty }) => (
        <Form>
          <FormGroup>
            <TextField
              autoComplete="off"
              label={t("groups.form.name")}
              name={FieldNames.Name}
            />
            <TextField
              autoComplete="off"
              label={t("groups.form.description")}
              name={FieldNames.Description}
            />
            {coverPhoto && (
              <AttachedImagePreview
                handleRemove={handleRemoveSelectedImage}
                selectedImages={[coverPhoto]}
              />
            )}
          </FormGroup>

          <Flex sx={{ justifyContent: "space-between" }}>
            <ImageInput refreshKey={imageInputKey} setImage={setCoverPhoto} />
            <PrimaryActionButton
              disabled={isSubmitting || (!dirty && !coverPhoto)}
              isLoading={isSubmitting}
              sx={{ marginTop: 1.5 }}
              type="submit"
            >
              {editEvent ? t("actions.save") : t("actions.create")}
            </PrimaryActionButton>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default EventForm;
