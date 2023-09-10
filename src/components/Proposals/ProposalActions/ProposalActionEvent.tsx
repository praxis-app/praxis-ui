import { Box, SxProps, Typography } from "@mui/material";
import { useState } from "react";
import { ProposalActionEventFragment } from "../../../apollo/gen";
import Accordion, {
  AccordionDetails,
  AccordionSummary,
} from "../../Shared/Accordion";

interface Props {
  event: ProposalActionEventFragment;
}

const ProposalActionEvent = ({ event }: Props) => {
  const [showEvent, setShowEvent] = useState(false);

  const accordionStyles: SxProps = {
    backgroundColor: "rgb(0, 0, 0, 0.1)",
    borderRadius: 2,
    paddingX: 2,
  };

  return (
    <Box marginBottom={2.5}>
      <Accordion
        expanded={showEvent}
        onChange={() => setShowEvent(!showEvent)}
        sx={accordionStyles}
      >
        <AccordionSummary>
          <Typography marginRight="0.5ch" fontFamily="Inter Bold">
            Proposed event:
          </Typography>
          {event.name}
        </AccordionSummary>

        <AccordionDetails>
          <Typography>{JSON.stringify(event)}</Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProposalActionEvent;
