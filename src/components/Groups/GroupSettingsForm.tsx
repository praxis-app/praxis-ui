// TODO: Add basic functionality for events - below is a WIP

import {
  Box,
  Divider,
  FormGroup,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useTranslation } from "react-i18next";
import Flex from "../Shared/Flex";
import PrimaryActionButton from "../Shared/PrimaryActionButton";

const GroupSettingsForm = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const initialValues = { privacy: "private" };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => console.log("TODO: Add submit function")}
    >
      {({ dirty, isSubmitting }) => (
        <Form>
          <FormGroup>
            <Flex justifyContent="space-between">
              <Box>
                <Typography>{t("groups.settings.names.privacy")}</Typography>

                <Typography
                  fontSize={12}
                  sx={{ color: theme.palette.text.secondary }}
                >
                  {t("groups.settings.descriptions.privacy")}
                </Typography>
              </Box>

              <Select
                name="privacy"
                value={"private"}
                variant="standard"
                disableUnderline
              >
                <MenuItem value="private">
                  {t("groups.labels.private")}
                </MenuItem>
                <MenuItem value="public">{t("groups.labels.public")}</MenuItem>
              </Select>
            </Flex>
          </FormGroup>

          <Divider sx={{ marginY: 3 }} />

          <Flex flexEnd>
            <PrimaryActionButton
              disabled={isSubmitting || !dirty}
              isLoading={isSubmitting}
              type="submit"
            >
              {t("actions.save")}
            </PrimaryActionButton>
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default GroupSettingsForm;
