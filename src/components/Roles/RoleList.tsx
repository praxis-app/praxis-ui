import { Card, CardContent as MuiCardContent, styled } from "@mui/material";
import { RoleFragment } from "../../apollo/gen";
import Role from "../../components/Roles/Role";

const CardContent = styled(MuiCardContent)(() => ({
  padding: 10,
  "&:last-child": {
    paddingBottom: 10,
  },
}));

interface Props {
  roles: RoleFragment[];
}

const RoleList = ({ roles }: Props) => (
  <Card>
    <CardContent>
      {roles.map((role, index) => (
        <Role
          gutterBottom={index + 1 !== roles.length}
          key={role.id}
          role={role}
        />
      ))}
    </CardContent>
  </Card>
);

export default RoleList;
