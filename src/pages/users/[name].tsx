import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useUserProfileQuery } from "../../apollo/gen";
import Feed from "../../components/Shared/Feed";
import ProgressBar from "../../components/Shared/ProgressBar";
import ToggleForms from "../../components/Shared/ToggleForms";
import UserProfileCard from "../../components/Users/UserProfileCard";

const UserProfile: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useUserProfileQuery({
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

  const { me, user } = data;
  const isMe = me.id === user.id;

  return (
    <>
      <UserProfileCard user={user} />
      {isMe && <ToggleForms me={me} />}

      {user.profileFeed && <Feed feed={user.profileFeed} />}
    </>
  );
};

export default UserProfile;
