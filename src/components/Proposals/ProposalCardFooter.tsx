// TODO: Add basic functionality for comments and sharing - below is a WIP

import { Comment, HowToVote, Reply } from "@mui/icons-material";
import { CardActions, Divider, SxProps } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import { ProposalCardFooterFragment } from "../../apollo/gen";
import { ProposalStage } from "../../constants/proposal.constants";
import { Blurple } from "../../styles/theme";
import { inDevToast } from "../../utils/common.utils";
import CardFooterButton from "../Shared/CardFooterButton";
import VoteBadges from "../Votes/VoteBadges";
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

  const { stage, voteCount, votes, group } = proposal;
  const isDisabled = !!group && !group.isJoinedByMe;
  const isRatified = stage === ProposalStage.Ratified;

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

  const handleCardActionsClick = () => {
    if (!isDisabled) {
      return;
    }
    toastVar({
      status: "info",
      title: t("proposals.prompts.joinGroupToVote"),
    });
  };

  return (
    <>
      {!!voteCount && <VoteBadges proposal={proposal} />}

      <Divider sx={{ margin: "0 16px" }} />

      <CardActions
        sx={{ justifyContent: "space-around" }}
        onClick={handleCardActionsClick}
      >
        <CardFooterButton
          onClick={handleVoteButtonClick}
          sx={voteByCurrentUser ? { color: Blurple.Marina } : {}}
          disabled={isDisabled}
        >
          <HowToVote sx={ICON_STYLES} />
          {voteButtonLabel}
        </CardFooterButton>

        <CardFooterButton onClick={inDevToast} disabled={isDisabled}>
          <Comment sx={ROTATED_ICON_STYLES} />
          {t("actions.comment")}
        </CardFooterButton>

        <CardFooterButton onClick={inDevToast} disabled={isDisabled}>
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
