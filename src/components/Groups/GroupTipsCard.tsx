import { useReactiveVar } from "@apollo/client";
import {
  Card,
  CardContent as MuiCardContent,
  CardHeader,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { inviteTokenVar } from "../../apollo/cache";
import Link from "../../components/Shared/Link";
import { NavigationPaths } from "../../constants/common.constants";

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 18,
  },
}));

const GroupTipsCard = () => {
  const inviteToken = useReactiveVar(inviteTokenVar);
  const { t } = useTranslation();
  const theme = useTheme();

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
        <Typography gutterBottom>{t("groups.tips.groupProposals")}</Typography>

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
          <Link
            href={NavigationPaths.LogIn}
            sx={{ marginLeft: inviteToken ? "0.5ch" : 0 }}
          >
            {t("users.actions.logIn")}
          </Link>{" "}
          to explore groups
        </Typography>
      </CardContent>
    </Card>
  );
};

export default GroupTipsCard;
