import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { isLoggedInVar } from "../../apollo/cache";
import { useProposalQuery } from "../../apollo/proposals/generated/Proposal.query";
import ProposalCard from "../../components/Proposals/ProposalCard";
import ProgressBar from "../../components/Shared/ProgressBar";
import { isDeniedAccess } from "../../utils/error.utils";

const ProposalPage: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data, loading, error } = useProposalQuery({
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

  return <ProposalCard proposal={data.proposal} />;
};

export default ProposalPage;
