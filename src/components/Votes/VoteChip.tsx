// TODO: Find a better name, or determine if "chip" is the right choice here

import { SvgIconComponent } from "@mui/icons-material";
import { SxProps, useTheme } from "@mui/material";
import { useState } from "react";
import { VoteFragment } from "../../apollo/gen";
import { VoteTypes } from "../../constants/vote.constants";
import { useIsDesktop } from "../../hooks/common.hooks";
import { Blurple } from "../../theme";
import Flex from "../Shared/Flex";
import VotesPopover from "./VotesPopover";

export const SHARED_CHIP_STYLES: SxProps = {
  backgroundColor: Blurple.Primary,
  borderRadius: "50%",
  display: "inline-flex",
  justifyContent: "center",
};

interface Props {
  Icon: SvgIconComponent;
  sx?: SxProps;
  votes: VoteFragment[];
  voteType: string;
}

const VoteChip = ({ Icon, voteType, sx, votes }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isDesktop = useIsDesktop();
  const theme = useTheme();

  const chipStyles: SxProps = {
    ...SHARED_CHIP_STYLES,
    border: `2px solid ${theme.palette.background.paper}`,
    height: 25,
    width: 25,
    marginLeft: "-5px",
    "&:first-of-type": {
      marginLeft: 0,
    },
    ...sx,
  };
  const iconStyles: SxProps = {
    fontSize: 13,
    marginTop: 0.5,
    transform: voteType === VoteTypes.Block ? "translateX(-1px)" : null,
  };

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => setAnchorEl(event.currentTarget);

  const handlePopoverClose = () => setAnchorEl(null);

  return (
    <>
      <Flex
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        sx={chipStyles}
        aria-haspopup
      >
        <Icon color="primary" sx={iconStyles} />
      </Flex>

      {isDesktop && (
        <VotesPopover
          anchorEl={anchorEl}
          handlePopoverClose={handlePopoverClose}
          votes={votes}
          voteType={voteType}
        />
      )}
    </>
  );
};

export default VoteChip;
