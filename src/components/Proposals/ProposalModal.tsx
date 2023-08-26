import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ProposalCardFragment } from "../../apollo/gen";
import { useIsDesktop } from "../../hooks/common.hooks";
import CommentForm from "../Comments/CommentForm";
import Modal from "../Shared/Modal";
import ProposalCard from "./ProposalCard";

interface Props {
  proposal: ProposalCardFragment;
  open: boolean;
  onClose(): void;
}

const ProposalModal = ({ proposal, open, onClose }: Props) => {
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  const title = t("proposals.labels.usersProposal", {
    name: proposal.user.name[0].toUpperCase() + proposal.user.name.slice(1),
  });

  return (
    <Modal
      contentStyles={{
        width: isDesktop ? "700px" : "100%",
        paddingBottom: 0,
        minHeight: "50vh",
      }}
      footerContent={
        <Box
          bgcolor="background.paper"
          bottom={0}
          left={0}
          paddingTop="12px"
          paddingX="16px"
          width="100%"
        >
          <CommentForm proposalId={proposal.id} expanded />
        </Box>
      }
      maxWidth="md"
      onClose={onClose}
      open={open}
      title={title}
    >
      <ProposalCard proposal={proposal} inModal />
    </Modal>
  );
};

export default ProposalModal;
