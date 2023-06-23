// TODO: Move hex color values to theme

import { EmojiPeople, PostAdd } from "@mui/icons-material";
import {
  styled,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { ToggleFormsFragment } from "../../apollo/gen";
import { DarkMode } from "../../styles/theme";
import PostForm from "../Posts/PostForm";
import ProposalForm from "../Proposals/ProposalForm";
import Card from "./Card";

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(() => ({
  height: 32,
  marginLeft: 3.5,
  marginTop: 13,

  position: "absolute",
  bottom: 22,
  left: 60.5,

  "& .MuiToggleButtonGroup-grouped": {
    border: "none",
  },
}));

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
  color: theme.palette.text.secondary,
  background: DarkMode.PhantomShip,
  transition: "0.2s",
  "&:hover": {
    backgroundColor: DarkMode.PhantomShip,
    opacity: 0.85,
  },
}));

const INACTIVE_BTN_STYLES = {
  color: DarkMode.Nero,
  backgroundColor: DarkMode.Liver,
  "&:hover": {
    backgroundColor: DarkMode.Liver,
  },
};

interface Props {
  groupId?: number;
  me: ToggleFormsFragment;
}

const ToggleForms = ({ groupId, me }: Props) => {
  const [showProposalForm, setShowProposalForm] = useState(false);
  const { t } = useTranslation();

  const { joinedGroups } = me;
  const hasGroups = !!joinedGroups.length;

  const handleChange = (_: MouseEvent<HTMLElement>, value: boolean) =>
    setShowProposalForm(value);

  return (
    <Card sx={{ position: "relative" }}>
      {showProposalForm ? (
        <ProposalForm groupId={groupId} />
      ) : (
        <PostForm groupId={groupId} />
      )}

      <ToggleButtonGroup
        disabled={!hasGroups}
        exclusive
        onChange={handleChange}
        size="small"
      >
        <ToggleButton
          sx={showProposalForm ? INACTIVE_BTN_STYLES : {}}
          aria-label={t("labels.toggleButton")}
          value={false}
        >
          <PostAdd />
        </ToggleButton>
        <ToggleButton
          sx={showProposalForm ? {} : INACTIVE_BTN_STYLES}
          aria-label={t("labels.toggleButton")}
          value={true}
        >
          <EmojiPeople />
        </ToggleButton>
      </ToggleButtonGroup>
    </Card>
  );
};

export default ToggleForms;
