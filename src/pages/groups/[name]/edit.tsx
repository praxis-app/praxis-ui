// TODO: Ensure EditGroup page is unreachable without role

import { Typography } from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEditGroupQuery } from "../../../apollo/gen";
import GroupForm from "../../../components/Groups/GroupForm";
import Breadcrumbs from "../../../components/Shared/Breadcrumbs";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop } from "../../../hooks/common.hooks";
import { getGroupPath } from "../../../utils/group.utils";

const EditGroup: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useEditGroupQuery({
    variables: { name },
    skip: !name,
  });
  const group = data?.group;

  const { t } = useTranslation();
  const isDesktop = useIsDesktop();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!group) {
    return null;
  }

  if (!group.myPermissions?.updateGroup) {
    return <Typography>{t("prompts.permissionDenied")}</Typography>;
  }

  const breadcrumbs = [
    {
      label: truncate(name, {
        length: isDesktop ? TruncationSizes.Small : TruncationSizes.ExtraSmall,
      }),
      href: getGroupPath(name),
    },
    {
      label: t("groups.actions.edit"),
    },
  ];

  return (
    <>
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <GroupForm editGroup={group} />
    </>
  );
};

export default EditGroup;
