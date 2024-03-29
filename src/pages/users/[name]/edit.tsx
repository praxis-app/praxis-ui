import { Card, CardContent, Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEditUserQuery } from "../../../apollo/users/generated/EditUser.query";
import ProgressBar from "../../../components/Shared/ProgressBar";
import EditProfileForm from "../../../components/Users/EditProfileForm";

const EditUser: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useEditUserQuery({
    variables: { name },
    skip: !name,
  });

  const { t } = useTranslation();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        <EditProfileForm
          submitButtonText={t("actions.save")}
          user={data.user}
        />
      </CardContent>
    </Card>
  );
};

export default EditUser;
