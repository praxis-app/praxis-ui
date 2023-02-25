// TODO: Add basic functionality for comments and sharing - below is a WIP

import { Comment, HowToVote, Reply } from "@mui/icons-material";
import { CardActions, Divider, SxProps } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import { ProposalCardFooterFragment } from "../../apollo/gen";
import { ProposalStages } from "../../constants/proposal.constants";
import { Blurple } from "../../theme";
import { inDevToast } from "../../utils/common.utils";
import CardFooterButton from "../Shared/CardFooterButton";
import VoteChips from "../Votes/VoteChips";
import VoteMenu from "../Votes/VoteMenu";

const ICON_STYLES: SxProps = {
  marginRight: "0.4ch",
};

const ROTATED_ICON_STYLES = {
  transform: "rotateY(180deg)",
  ...ICON_STYLES,
};

interface Props {
  currentUserId: number;
  proposal: ProposalCardFooterFragment;
}

const ProposalCardFooter = ({ proposal, currentUserId }: Props) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();

  const { stage, voteCount, votes } = proposal;
  const isRatified = stage === ProposalStages.Ratified;
  const voteByCurrentUser = votes.find(
    (vote) => vote.user.id === currentUserId
  );

  const voteButtonLabel = isRatified
    ? t("proposals.labels.ratified")
    : t("proposals.actions.vote");

  const handleVoteButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (isRatified) {
      toastVar({
        status: "info",
        title: t("proposals.toasts.noVotingAfterRatification"),
      });
      return;
    }
    setMenuAnchorEl(event.currentTarget);
  };

  const handleVoteMenuClose = () => setMenuAnchorEl(null);

  return (
    <>
      {!!voteCount && <VoteChips proposal={proposal} />}

      <Divider sx={{ margin: "0 16px" }} />

      <CardActions sx={{ justifyContent: "space-around" }}>
        <CardFooterButton
          onClick={handleVoteButtonClick}
          sx={voteByCurrentUser ? { color: Blurple.Primary } : {}}
        >
          <HowToVote sx={ICON_STYLES} />
          {voteButtonLabel}
        </CardFooterButton>

        <CardFooterButton onClick={inDevToast}>
          <Comment sx={ROTATED_ICON_STYLES} />
          {t("actions.comment")}
        </CardFooterButton>

        <CardFooterButton onClick={inDevToast}>
          <Reply sx={ROTATED_ICON_STYLES} />
          {t("actions.share")}
        </CardFooterButton>
      </CardActions>

      <VoteMenu
        anchorEl={menuAnchorEl}
        currentUserId={currentUserId}
        onClose={handleVoteMenuClose}
        proposal={proposal}
      />
    </>
  );
};

export default ProposalCardFooter;
