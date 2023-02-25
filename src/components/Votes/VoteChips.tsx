/**
 * TODO: Find a better name, or determine if "chip" is the right choice here
 */

import {
  PanTool as BlockIcon,
  ThumbDown as StandAsideIcon,
  ThumbsUpDown as ReservationsIcon,
  ThumbUp as AgreementIcon,
} from "@mui/icons-material";
import { SxProps, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import { VoteChipsFragment } from "../../apollo/gen";
import { VoteTypes } from "../../constants/vote.constants";
import { filterVotesByType } from "../../utils/vote.utils";
import Flex from "../Shared/Flex";
import VoteChip from "./VoteChip";
import VotesModal from "./VotesModal";

const CHIPS_CONTAINER_STYLES: SxProps = {
  cursor: "pointer",
  paddingBottom: 1,
  paddingLeft: "16px",
};

interface Props {
  proposal: VoteChipsFragment;
}

const VoteChips = ({ proposal: { votes, voteCount } }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { agreements, reservations, standAsides, blocks } = useMemo(
    () => filterVotesByType(votes),
    [votes]
  );

  const agreementsChip = {
    Icon: AgreementIcon,
    votes: agreements,
    voteType: VoteTypes.Agreement,
  };
  const reservationsChip = {
    Icon: ReservationsIcon,
    votes: reservations,
    voteType: VoteTypes.Reservations,
  };
  const standAsidesChip = {
    Icon: StandAsideIcon,
    votes: standAsides,
    voteType: VoteTypes.StandAside,
  };
  const blocksChip = {
    Icon: BlockIcon,
    votes: blocks,
    voteType: VoteTypes.Block,
  };

  const chips = [agreementsChip, standAsidesChip, reservationsChip, blocksChip]
    .filter((chip) => chip.votes.length)
    .sort((a, b) => b.votes.length - a.votes.length);

  const handleClick = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <>
      <Flex sx={CHIPS_CONTAINER_STYLES} onClick={handleClick}>
        <Flex paddingRight={1}>
          {chips.map((chip, index) => (
            <VoteChip
              {...chip}
              key={chip.voteType}
              sx={{ zIndex: chips.length - index }}
            />
          ))}
        </Flex>

        <Typography>{voteCount}</Typography>
      </Flex>

      <VotesModal
        allVotes={votes}
        agreements={agreements}
        blocks={blocks}
        open={isModalOpen}
        reservations={reservations}
        standAsides={standAsides}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default VoteChips;
