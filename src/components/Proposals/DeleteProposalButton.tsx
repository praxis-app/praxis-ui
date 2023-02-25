import { ApolloCache } from "@apollo/client";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import { useDeleteProposalMutation } from "../../apollo/gen";
import { NavigationPaths, TypeNames } from "../../constants/common.constants";
import { redirectTo } from "../../utils/common.utils";

export const removeProposal =
  (proposalId: number) => (cache: ApolloCache<any>) => {
    const proposalCacheId = cache.identify({
      __typename: TypeNames.Proposal,
      id: proposalId,
    });
    cache.evict({ id: proposalCacheId });
    cache.gc();
  };

interface Props {
  proposalId: number;
}

const DeleteProposalButton = ({ proposalId }: Props) => {
  const [deleteProposal] = useDeleteProposalMutation();
  const { t } = useTranslation();

  const handleClick = async () => {
    await redirectTo(NavigationPaths.Home);

    await deleteProposal({
      variables: { id: proposalId },
      update: removeProposal(proposalId),
      onError(err) {
        toastVar({
          status: "error",
          title: err.message,
        });
      },
    });
  };

  const handleClickWithConfirm = () =>
    window.confirm(t("prompts.deleteItem", { itemType: "proposal" })) &&
    handleClick();

  return (
    <Button
      color="error"
      onClick={handleClickWithConfirm}
      sx={{ marginTop: 1.5 }}
      variant="outlined"
      fullWidth
    >
      {t("actions.delete")}
    </Button>
  );
};

export default DeleteProposalButton;
