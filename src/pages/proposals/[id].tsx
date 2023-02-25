import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useProposalQuery } from "../../apollo/gen";
import ProposalCard from "../../components/Proposals/ProposalCard";
import ProgressBar from "../../components/Shared/ProgressBar";

const ProposalPage: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useProposalQuery({
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

  return <ProposalCard proposal={data.proposal} />;
};

export default ProposalPage;
