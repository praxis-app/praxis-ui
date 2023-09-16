import { Typography } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useEditProposalQuery } from "../../../apollo/proposals/generated/EditProposal.query";
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

  // TODO: Uncomment when implementing revisions or drafts for proposals
  // const { proposal } = data;
  // return (
  //   <>
  //     <Card sx={{ marginBottom: 2.5 }}>
  //       <ProposalForm editProposal={proposal} />
  //     </Card>
  //     <DeleteProposalButton proposalId={proposal.id} />
  //   </>
  // );

  return <Typography>{t("prompts.inDev")}</Typography>;
};

export default EditProposalPage;
