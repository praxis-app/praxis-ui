import { Typography } from "@mui/material";
import { t } from "i18next";
import { ProposalActionPermissionFragment } from "../../apollo/gen";
import { getPermissionText } from "../../utils/role.utils";

interface Props {
  permission: ProposalActionPermissionFragment;
}

const ProposalActionPermission = ({ permission: { name } }: Props) => {
  const { displayName } = getPermissionText(name, t);

  return <Typography>{displayName}</Typography>;
};

export default ProposalActionPermission;
