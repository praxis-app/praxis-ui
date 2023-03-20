// TODO: Add remaining layout and functionality - below is a WIP

import {
  Card,
  CardContent as MuiCardContent,
  styled,
  Typography,
} from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { breadcrumbsVar } from "../../../apollo/cache";
import { useFollowersQuery } from "../../../apollo/gen";
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
  const { query, asPath } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useFollowersQuery({
    variables: { name },
    skip: !name,
  });
  const user = data?.user;
  const me = data?.me;

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (user) {
      breadcrumbsVar({
        path: asPath,
        breadcrumbs: [
          {
            label: truncate(name, {
              length: isDesktop
                ? TruncationSizes.Small
                : TruncationSizes.ExtraSmall,
            }),
            href: getUserProfilePath(name),
          },
          {
            label: t("users.labels.followers", {
              count: user.followers.length || 0,
            }),
          },
        ],
      });
    }
  }, [user, t, isDesktop, asPath, name]);

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!user?.followers || !me) {
    return null;
  }

  return (
    <>
      <Card>
        <CardContent>
          {user.followers.map((follower) => (
            <Follow follow={follower} currentUserId={me.id} key={follower.id} />
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default Followers;
