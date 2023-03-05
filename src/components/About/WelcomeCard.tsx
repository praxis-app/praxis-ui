import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";

const WelcomeCard = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        title={t("about.welcomeCard.heading")}
        sx={{ color: theme.palette.primary.main }}
      />
      <CardContent>
        <Typography sx={{ marginBottom: 3 }}>
          {t("about.welcomeCard.projectDescription")}
        </Typography>
        <Typography>{t("about.welcomeCard.inDev")}</Typography>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;
