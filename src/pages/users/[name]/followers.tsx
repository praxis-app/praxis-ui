import {
  Card,
  CardContent as MuiCardContent,
  styled,
  Typography,
} from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useFollowersQuery } from "../../../apollo/users/generated/Followers.query";
import Breadcrumbs from "../../../components/Shared/Breadcrumbs";
import ProgressBar from "../../../components/Shared/ProgressBar";
import Follow from "../../../components/Users/Follow";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop } from "../../../hooks/common.hooks";
import { getUserProfilePath } from "../../../utils/user.utils";

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 16,
  },
}));

const Followers: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useFollowersQuery({
    variables: { name },
    skip: !name,
  });
  const user = data?.user;
  const me = data?.me;

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!me || !user) {
    return null;
  }

  const breadcrumbs = [
    {
      label: truncate(name, {
        length: isDesktop ? TruncationSizes.Small : TruncationSizes.ExtraSmall,
      }),
      href: getUserProfilePath(name),
    },
    {
      label: t("users.labels.followers", {
        count: user.followerCount,
      }),
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      {!!user.followerCount && (
        <Card>
          <CardContent>
            {user.followers.map((follower) => (
              <Follow user={follower} currentUserId={me.id} key={follower.id} />
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Followers;
