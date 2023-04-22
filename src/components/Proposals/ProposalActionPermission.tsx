import { CheckBox } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { t } from "i18next";
import { ProposalActionPermissionFragment } from "../../apollo/gen";
import { getPermissionText } from "../../utils/role.utils";

interface Props {
  permission: ProposalActionPermissionFragment;
}

const ProposalActionPermission = ({ permission: { name } }: Props) => {
  const { displayName } = getPermissionText(name, t);

  return (
    <Typography sx={{ verticalAlign: "middle", display: "flex" }}>
      <CheckBox sx={{ fontSize: 18, marginRight: "0.5ch", marginTop: 0.35 }} />
      {displayName}
    </Typography>
  );
};

export default ProposalActionPermission;
