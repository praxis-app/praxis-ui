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
import { useTranslation } from "react-i18next";
import { useMemberRequestsQuery } from "../../../apollo/groups/generated/MemberRequests.query";
import MemberRequest from "../../../components/Groups/MemberRequest";
import Breadcrumbs from "../../../components/Shared/Breadcrumbs";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop } from "../../../hooks/common.hooks";
import { isDeniedAccess } from "../../../utils/error.utils";
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
  const memberRequests = data?.group.memberRequests;

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  if (isDeniedAccess(error)) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!memberRequests) {
    return null;
  }

  const breadcrumbs = [
    {
      label: truncate(groupName, {
        length: isDesktop ? TruncationSizes.Small : TruncationSizes.ExtraSmall,
      }),
      href: getGroupPath(groupName),
    },
    {
      label: t("groups.labels.memberRequests", {
        count: memberRequests.length || 0,
      }),
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      {!!memberRequests.length && (
        <Card>
          <CardContent>
            {memberRequests.map((memberRequest) => (
              <MemberRequest
                key={memberRequest.id}
                groupName={groupName}
                memberRequest={memberRequest}
              />
            ))}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default MemberRequests;
