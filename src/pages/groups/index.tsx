import { useReactiveVar } from "@apollo/client";
import {
  Card,
  CardContent as MuiCardContent,
  CardHeader,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { inviteTokenVar, isLoggedInVar } from "../../apollo/cache";
import { useGroupsQuery } from "../../apollo/gen";
import GroupCard from "../../components/Groups/GroupCard";
import GroupForm from "../../components/Groups/GroupForm";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import Link from "../../components/Shared/Link";
import ProgressBar from "../../components/Shared/ProgressBar";
import { NavigationPaths } from "../../constants/common.constants";
import { isDeniedAccess } from "../../utils/error.utils";

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 18,
  },
}));

const GroupsIndex: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const inviteToken = useReactiveVar(inviteTokenVar);

  const { data, loading, error } = useGroupsQuery({
    skip: !isLoggedIn,
  });

  const { t } = useTranslation();
  const theme = useTheme();

  if (!isLoggedIn) {
    return (
      <Card>
        <CardHeader
          title={t("groups.headers.organizeWithGroups")}
          sx={{ color: theme.palette.primary.main, paddingBottom: 0.75 }}
        />

        <CardContent>
          <Typography gutterBottom>
            {t("groups.tips.organizeWithGroups")}
          </Typography>

          <Typography>
            {inviteToken && (
              <>
                <Link
                  href={`/signup/${inviteToken}`}
                  sx={{ marginRight: "0.5ch" }}
                >
                  {t("users.actions.signUp")}
                </Link>
                or
              </>
            )}
            <Link href={NavigationPaths.LogIn} sx={{ marginLeft: "0.5ch" }}>
              {t("users.actions.logIn")}
            </Link>{" "}
            to explore groups
          </Typography>
        </CardContent>
      </Card>
    );
  }

  if (isDeniedAccess(error)) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  const { groups, me } = data;

  return (
    <>
      <LevelOneHeading header>
        {t("groups.headers.discoverGroups")}
      </LevelOneHeading>

      {isLoggedIn && <GroupForm />}

      {groups.map((group) => (
        <GroupCard group={group} currentUserId={me?.id} key={group.id} />
      ))}
    </>
  );
};

export default GroupsIndex;
