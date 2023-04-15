// TODO: Add remaining layout and functionality - below is a WIP

import { FormGroup } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { ColorResult } from "react-color";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import { CreateRoleInput } from "../../apollo/gen";
import { FieldNames } from "../../constants/common.constants";
import { ProposalActionTypes } from "../../constants/proposal.constants";
import { DEFAULT_ROLE_COLOR } from "../../constants/role.constants";
import { getRandomString } from "../../utils/common.utils";
import ColorPicker from "../Shared/ColorPicker";
import Flex from "../Shared/Flex";
import Modal from "../Shared/Modal";
import PrimaryActionButton from "../Shared/PrimaryActionButton";
import { TextField } from "../Shared/TextField";

interface Props {
  groupId?: number | null;
  actionType?: string;
}

const ProposeRoleModal = ({ groupId, actionType }: Props) => {
  const [color, setColor] = useState(DEFAULT_ROLE_COLOR);
  const [colorPickerKey, setColorPickerKey] = useState("");
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (!groupId) {
      return;
    }
    if (
      actionType === ProposalActionTypes.CreateRole ||
      actionType === ProposalActionTypes.ChangeRole
    ) {
      setOpen(true);
    }
  }, [groupId, actionType]);

  const initialValues = {
    name: "",
  };

  const handleSubmit = async () =>
    // formValues: Omit<CreateRoleInput, "color">,
    // formHelpers: FormikHelpers<Omit<CreateRoleInput, "color">>
    {
      try {
        console.log("TODO: Add submit logic here");
      } catch (err) {
        toastVar({
          status: "error",
          title: String(err),
        });
      } finally {
        setColorPickerKey(getRandomString());
      }
    };

  const handleChangeComplete = (color: ColorResult) => setColor(color.hex);
  const handleClose = () => setOpen(false);

  const isSubmitButtonDisabled = ({
    dirty,
    isSubmitting,
  }: FormikProps<Omit<CreateRoleInput, "color">>) => {
    if (isSubmitting) {
      return true;
    }
    return !dirty;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={t("proposals.actions.createGroupRole")}
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <FormGroup>
              <TextField
                autoComplete="off"
                label={t("groups.form.name")}
                name={FieldNames.Name}
              />

              <ColorPicker
                color={color}
                key={colorPickerKey}
                label={"Role Color"}
                onChange={handleChangeComplete}
                sx={{ marginBottom: 1.25 }}
              />
            </FormGroup>

            <Flex justifyContent="end">
              <PrimaryActionButton
                disabled={isSubmitButtonDisabled(formik)}
                isLoading={formik.isSubmitting}
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

export default ProposeRoleModal;
