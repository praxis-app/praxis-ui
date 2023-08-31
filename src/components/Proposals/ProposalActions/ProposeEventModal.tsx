import { Add } from "@mui/icons-material";
import { Button, FormGroup } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ProposalActionEventInput } from "../../../apollo/gen";
import {
  ProposalActionFieldName,
  ProposalActionType,
} from "../../../constants/proposal.constants";
import { startOfNextHour } from "../../../utils/time.utils";
import {
  EventFormFieldName,
  SHOW_ENDS_AT_BUTTON_STYLES,
} from "../../Events/EventForm";
import DateTimePicker from "../../Shared/DateTimePicker";
import Flex from "../../Shared/Flex";
import Modal from "../../Shared/Modal";
import PrimaryActionButton from "../../Shared/PrimaryActionButton";
import { TextField } from "../../Shared/TextField";

interface Props {
  actionType?: string;
  groupId?: number | null;
  currentUserId: number;
  setFieldValue: (
    field: ProposalActionFieldName,
    value: ProposalActionEventInput
  ) => void;
  onClose(): void;
}

const ProposeEventModal = ({
  actionType,
  currentUserId,
  groupId,
  onClose,
  setFieldValue,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [showEndsAt, setShowEndsAt] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (groupId && actionType === ProposalActionType.PlanEvent) {
      setOpen(true);
    }
  }, [groupId, actionType]);

  const initialValues: ProposalActionEventInput = {
    name: "",
    description: "",
    location: "",
    online: false,
    hostUserId: currentUserId,
    startsAt: startOfNextHour(),
    endsAt: null,
  };

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleSubmit = async (formValues: ProposalActionEventInput) => {
    setFieldValue(ProposalActionFieldName.Event, formValues);
    setOpen(false);
  };

  const handleStartsAtChange =
    (setFieldValue: (field: string, value: Dayjs | null) => void) =>
    (value: Dayjs | null) => {
      setFieldValue(EventFormFieldName.StartsAt, value);

      if (showEndsAt) {
        setFieldValue(
          EventFormFieldName.EndsAt,
          dayjs(value).add(1, "hour").startOf("hour")
        );
      }
    };

  const handleShowEndsAtButtonClick =
    (
      values: ProposalActionEventInput,
      setFieldValue: (field: string, value: Dayjs | null) => void
    ) =>
    () => {
      if (!showEndsAt) {
        setFieldValue(
          EventFormFieldName.EndsAt,
          dayjs(values.startsAt).add(1, "hour").startOf("hour")
        );
      } else {
        setFieldValue(EventFormFieldName.EndsAt, null);
      }
      setShowEndsAt(!showEndsAt);
    };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t("proposals.actionTypes.planEvent")}
      centeredTitle
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting, values, setFieldValue }) => (
          <Form>
            <FormGroup>
              <TextField
                autoComplete="off"
                label={t("events.form.name")}
                name={EventFormFieldName.Name}
              />
              <TextField
                autoComplete="off"
                label={t("events.form.description")}
                name={EventFormFieldName.Description}
                multiline
              />
              <DateTimePicker
                label={t("events.form.startDateAndTime")}
                onChange={handleStartsAtChange(setFieldValue)}
                value={values.startsAt}
              />
              {showEndsAt && (
                <DateTimePicker
                  label={t("events.form.endDateAndTime")}
                  onChange={(value: Dayjs | null) =>
                    setFieldValue(EventFormFieldName.EndsAt, value)
                  }
                  value={values.endsAt}
                />
              )}
              <Button
                onClick={handleShowEndsAtButtonClick(values, setFieldValue)}
                sx={SHOW_ENDS_AT_BUTTON_STYLES}
                startIcon={<Add />}
              >
                {t("events.form.endDateAndTime")}
              </Button>
            </FormGroup>

            <Flex justifyContent="end">
              <PrimaryActionButton
                isLoading={isSubmitting}
                sx={{ marginTop: 1.5 }}
                type="submit"
              >
                {t("actions.confirm")}
              </PrimaryActionButton>
            </Flex>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ProposeEventModal;
