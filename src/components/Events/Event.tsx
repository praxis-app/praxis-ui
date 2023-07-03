import { EventFragment } from "../../apollo/gen";

interface Props {
  event: EventFragment;
}

const Event = ({ event }: Props) => <>{event.name}</>;

export default Event;
