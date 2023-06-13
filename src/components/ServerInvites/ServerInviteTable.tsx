import {
  Card,
  styled,
  Table,
  TableBody,
  TableCell as MuiTableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { ServerInviteCardFragment, ServerInvitesQuery } from "../../apollo/gen";
import ServerInviteRow from "../../components/ServerInvites/ServerInviteRow";

const TableCell = styled(MuiTableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderColor: theme.palette.divider,
}));

interface Props {
  serverInvites: ServerInviteCardFragment[];
  me: ServerInvitesQuery["me"];
}

const ServerInviteTable = ({ serverInvites, me }: Props) => {
  const { t } = useTranslation();
  return (
    <Card>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("invites.columnNames.inviter")}</TableCell>
            <TableCell>{t("invites.columnNames.code")}</TableCell>
            <TableCell>{t("invites.columnNames.uses")}</TableCell>
            <TableCell>{t("invites.columnNames.expires")}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {serverInvites.map((serverInvite, index) => (
            <ServerInviteRow
              isLast={index + 1 === serverInvites.length}
              key={serverInvite.id}
              me={me}
              serverInvite={serverInvite}
            />
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ServerInviteTable;
