// TODO: Add basic functionality for search

import { Search as SearchIcon } from "@mui/icons-material";
import { Box, InputBase, styled, SxProps } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FieldNames } from "../../constants/common.constants";
import { inDevToast } from "../../utils/common.utils";

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    color: theme.palette.grey[100],
    padding: theme.spacing(0.5, 1, 0, 1),
    transition: theme.transitions.create("width"),
    width: 230,
    [theme.breakpoints.down("lg")]: {
      width: 215,
    },
    [theme.breakpoints.down("sm")]: {
      width: 120,
    },
  },
}));

const SEARCH_BAR_STYLES: SxProps = {
  backgroundColor: "rgba(255, 255, 255, 0.15)",
  borderRadius: "8px",
  marginTop: 0.5,
  maxHeight: 35,
};

const SEARCH_ICON_STYLES: SxProps = {
  position: "relative",
  top: 7,
  transition: "0.2s",
};

const SearchBar = () => {
  const [focused, setFocused] = useState<boolean>(false);
  const { t } = useTranslation();

  const initialValues = { query: "" };

  const searchIconBoxStyles: SxProps = {
    color: focused ? grey[100] : "rgba(255, 255, 255, 0.40)",
    display: "inline-block",
    height: "100%",
    paddingLeft: 2,
    pointerEvents: "none",
  };

  return (
    <Box sx={SEARCH_BAR_STYLES}>
      <Formik initialValues={initialValues} onSubmit={inDevToast}>
        {() => (
          <Form>
            <Box sx={searchIconBoxStyles}>
              <SearchIcon sx={SEARCH_ICON_STYLES} />
            </Box>

            <Field
              component={SearchInput}
              name={FieldNames.Query}
              onBlur={() => setFocused(false)}
              onFocus={() => setFocused(true)}
              placeholder={t("search.placeholder")}
            />
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default SearchBar;
