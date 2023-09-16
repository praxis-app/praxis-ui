// TODO: Remove this page when no longer needed for testing

import { Person as UserIcon } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { useUsersQuery } from "../../apollo/users/queries/gen/Users.query";
import Flex from "../../components/Shared/Flex";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import Link from "../../components/Shared/Link";
import ProgressBar from "../../components/Shared/ProgressBar";
import { isDeniedAccess } from "../../utils/error.utils";
import { getUserProfilePath } from "../../utils/user.utils";

const UsersIndex: NextPage = () => {
  const { data, error, loading } = useUsersQuery();
  const { t } = useTranslation();

  if (isDeniedAccess(error)) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <>
      <LevelOneHeading header>{t("navigation.users")}</LevelOneHeading>

      {data?.users.map((user) => (
        <Flex key={user.id} sx={{ marginBottom: 1 }}>
          <UserIcon
            fontSize="small"
            sx={{ marginTop: 0.25, marginRight: 0.5 }}
          />
          <Link href={getUserProfilePath(user.name)}>{user.name}</Link>
        </Flex>
      ))}
    </>
  );
};

export default UsersIndex;
