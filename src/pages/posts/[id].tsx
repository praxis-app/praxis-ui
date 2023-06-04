import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import { usePostQuery } from "../../apollo/gen";
import PostCard from "../../components/Posts/PostCard";
import ProgressBar from "../../components/Shared/ProgressBar";
import { isDeniedAccess } from "../../utils/error.utils";

const PostPage: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, loading, error } = usePostQuery({
    variables: { id, isLoggedIn },
    errorPolicy: "all",
    skip: !id,
  });

  const { t } = useTranslation();

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    if (isDeniedAccess(error)) {
      return <Typography>{t("prompts.permissionDenied")}</Typography>;
    }

    if (error) {
      return <Typography>{t("errors.somethingWentWrong")}</Typography>;
    }
    return null;
  }

  return <PostCard post={data.post} />;
};

export default PostPage;
