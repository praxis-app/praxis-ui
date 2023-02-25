// TODO: Move hex color values to theme

import { EmojiPeople, PostAdd } from "@mui/icons-material";
import {
  styled,
  ToggleButton as MuiToggleButton,
  ToggleButtonGroup as MuiToggleButtonGroup,
} from "@mui/material";
import { MouseEvent, useState } from "react";
import { ToggleFormsFragment } from "../../apollo/gen";
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

const ToggleButton = styled(MuiToggleButton)(() => ({
  background: "#555555",
  transition: "0.2s",
  "&:hover": {
    backgroundColor: "#555555",
    opacity: 0.85,
  },
}));

const INACTIVE_BTN_STYLES = {
  color: "#3c3c3c",
  backgroundColor: "#616161",
  "&:hover": {
    backgroundColor: "#616161",
  },
};

interface Props {
  groupId?: number;
  me: ToggleFormsFragment;
}

const ToggleForms = ({ groupId, me }: Props) => {
  const [showProposalForm, setShowProposalForm] = useState(false);

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
          value={false}
        >
          <PostAdd />
        </ToggleButton>
        <ToggleButton
          sx={showProposalForm ? {} : INACTIVE_BTN_STYLES}
          value={true}
        >
          <EmojiPeople />
        </ToggleButton>
      </ToggleButtonGroup>
    </Card>
  );
};

export default ToggleForms;
