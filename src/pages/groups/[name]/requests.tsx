// TODO: Add remaining functionality - below is a WIP

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
import { useMemberRequestsQuery } from "../../../apollo/gen";
import RequestToJoin from "../../../components/Groups/RequestToJoin";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop } from "../../../hooks/common.hooks";
import { getGroupPath } from "../../../utils/group.utils";

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 15,
  },
}));

const MemberRequests: NextPage = () => {
  const { query } = useRouter();
  const groupName = String(query?.name || "");
  const { data, loading, error } = useMemberRequestsQuery({
    variables: { groupName },
    skip: !groupName,
  });

  const { asPath } = useRouter();
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (data) {
      breadcrumbsVar({
        path: asPath,
        breadcrumbs: [
          {
            label: truncate(groupName, {
              length: isDesktop
                ? TruncationSizes.Small
                : TruncationSizes.ExtraSmall,
            }),
            href: getGroupPath(groupName),
          },
          {
            label: t("groups.labels.memberRequests", {
              count: data.memberRequests.length || 0,
            }),
          },
        ],
      });
    }
  }, [t, isDesktop, data, asPath, groupName]);

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data || !data.memberRequests.length) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        {data.memberRequests.map((memberRequest) => (
          <RequestToJoin
            key={memberRequest.id}
            groupName={groupName}
            memberRequest={memberRequest}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default MemberRequests;
