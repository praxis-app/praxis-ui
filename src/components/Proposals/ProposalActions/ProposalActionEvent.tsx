import { ProposalActionEventFragment } from "../../../apollo/gen";

interface Props {
  event: ProposalActionEventFragment;
}

const ProposalActionEvent = ({ event }: Props) => <>{JSON.stringify(event)}</>;

export default ProposalActionEvent;
