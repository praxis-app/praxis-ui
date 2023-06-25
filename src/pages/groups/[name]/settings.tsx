import { Typography } from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useGroupSettingsQuery } from "../../../apollo/gen";
import GroupSettingsForm from "../../../components/Groups/GroupSettingsForm";
import Breadcrumbs from "../../../components/Shared/Breadcrumbs";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop } from "../../../hooks/common.hooks";
import { isDeniedAccess } from "../../../utils/error.utils";
import { getGroupPath } from "../../../utils/group.utils";

const GroupSettings: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useGroupSettingsQuery({
    variables: { name },
    skip: !name,
  });

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  const group = data?.group;
  const canManageSettings = group?.myPermissions?.manageSettings;

  if (isDeniedAccess(error) || (group && !canManageSettings)) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }
  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }
  if (loading) {
    return <ProgressBar />;
  }
  if (!group) {
    return null;
  }

  const breadcrumbs = [
    {
      label: truncate(name, {
        length: isDesktop ? TruncationSizes.Small : TruncationSizes.ExtraSmall,
      }),
      href: getGroupPath(name),
    },
    {
      label: t("groups.labels.groupSettings"),
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} sx={{ marginBottom: 3 }} />
      <GroupSettingsForm group={group} />
    </>
  );
};

export default GroupSettings;
