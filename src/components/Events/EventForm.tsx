// TODO: Add remaining layout and functionality - below is a WIP

import { Add } from "@mui/icons-material";
import { Button, FormGroup, SxProps } from "@mui/material";
import { Dayjs } from "dayjs";
import { Form, Formik, FormikHelpers } from "formik";
import produce from "immer";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  CreateEventInput,
  EventFormFragment,
  EventsDocument,
  EventsQuery,
  GroupEventsTabDocument,
  GroupEventsTabQuery,
  useCreateEventMutation,
} from "../../apollo/gen";
import { Blurple } from "../../styles/theme";
import { getRandomString } from "../../utils/common.utils";
import { startOfNextHour } from "../../utils/time.utils";
import AttachedImagePreview from "../Images/AttachedImagePreview";
import ImageInput from "../Images/ImageInput";
import DateTimePicker from "../Shared/DateTimePicker";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import { TextField } from "../Shared/TextField";

export enum EventFormFieldName {
  Name = "name",
  Description = "description",
  Location = "location",
  StartsAt = "startsAt",
  EndsAt = "endsAt",
}

interface Props {
  editEvent?: EventFormFragment;
  groupId?: number;
  onSubmit?: () => void;
}

const EventForm = ({ editEvent, groupId, onSubmit }: Props) => {
  const [imageInputKey, setImageInputKey] = useState("");
  const [coverPhoto, setCoverPhoto] = useState<File>();
  const [showEndsAt, setShowEndsAt] = useState(false);
  const [createEvent] = useCreateEventMutation();

  const { t } = useTranslation();

  const initialValues = {
    name: editEvent ? editEvent.name : "",
    description: editEvent ? editEvent.description : "",
    startsAt: editEvent ? editEvent.startsAt : startOfNextHour(),
    endsAt: editEvent ? editEvent.endsAt : null,
    location: editEvent ? editEvent.location : "",
  };

  const showEndsAtButtonStyles: SxProps = {
    color: Blurple.SkyDancer,
    padding: 0,
    textTransform: "none",
    width: "fit-content",
    "&.MuiButtonBase-root:hover": {
      bgcolor: "transparent",
      textDecoration: "underline",
    },
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
        if (groupId) {
          cache.updateQuery<GroupEventsTabQuery>(
            { query: GroupEventsTabDocument, variables: { groupId } },
            (eventsData) =>
              produce(eventsData, (draft) => {
                draft?.group.upcomingEvents.unshift(event);
              })
          );
        }
      },
      onCompleted() {
        onSubmit && onSubmit();
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
      {({ isSubmitting, dirty, setFieldValue, values }) => (
        <Form>
          <FormGroup sx={{ marginBottom: 2 }}>
            <TextField
              autoComplete="off"
              label={t("events.form.name")}
              name={EventFormFieldName.Name}
            />
            <TextField
              autoComplete="off"
              label={t("events.form.description")}
              name={EventFormFieldName.Description}
            />
            <DateTimePicker
              label={t("events.form.startDateAndTime")}
              onChange={(value: Dayjs | null) =>
                setFieldValue(EventFormFieldName.StartsAt, value)
              }
              defaultValue={values.startsAt}
            />

            {showEndsAt && (
              <DateTimePicker
                label={t("events.form.endDateAndTime")}
                onChange={(value: Dayjs | null) =>
                  setFieldValue(EventFormFieldName.EndsAt, value)
                }
                defaultValue={values.endsAt}
              />
            )}
            <Button
              onClick={() => setShowEndsAt(!showEndsAt)}
              sx={showEndsAtButtonStyles}
              startIcon={<Add />}
            >
              {t("events.form.endDateAndTime")}
            </Button>

            <TextField
              autoComplete="off"
              label={t("events.form.location")}
              name={EventFormFieldName.Location}
              placeholder={t("events.form.includeLocation")}
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
