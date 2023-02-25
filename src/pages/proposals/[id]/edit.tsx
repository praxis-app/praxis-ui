import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEditProposalQuery } from "../../../apollo/gen";
import DeleteProposalButton from "../../../components/Proposals/DeleteProposalButton";
import ProposalForm from "../../../components/Proposals/ProposalForm";
import Card from "../../../components/Shared/Card";
import ProgressBar from "../../../components/Shared/ProgressBar";

const EditProposalPage: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = useEditProposalQuery({
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

  const { proposal } = data;

  return (
    <>
      <Card sx={{ marginBottom: 2.5 }}>
        <ProposalForm editProposal={proposal} />
      </Card>

      <DeleteProposalButton proposalId={proposal.id} />
    </>
  );
};

export default EditProposalPage;
