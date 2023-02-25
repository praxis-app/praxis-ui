import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { usePostQuery } from "../../apollo/gen";
import PostCard from "../../components/Posts/PostCard";
import ProgressBar from "../../components/Shared/ProgressBar";

const PostPage: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = usePostQuery({
    variables: { id },
    skip: !id,
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

  return <PostCard post={data.post} />;
};

export default PostPage;
