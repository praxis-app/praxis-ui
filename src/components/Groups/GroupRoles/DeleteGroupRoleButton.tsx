import { useTranslation } from "react-i18next";
import { toastVar } from "../../../apollo/cache";
import {
  DeleteGroupRoleButtonFragment,
  useDeleteGroupRoleMutation,
} from "../../../apollo/gen";
import { NavigationPaths } from "../../../constants/common.constants";
import { redirectTo } from "../../../utils/common.utils";
import DeleteButton from "../../Shared/DeleteButton";

interface Props {
  role: DeleteGroupRoleButtonFragment;
}

const DeleteGroupRoleButton = ({ role: { id, group, __typename } }: Props) => {
  const [deleteRole] = useDeleteGroupRoleMutation();
  const { t } = useTranslation();

  const handleClick = async () => {
    const groupRolesPath = `${NavigationPaths.Groups}/${group?.name}/roles`;
    await redirectTo(groupRolesPath);

    await deleteRole({
      variables: { id },
      update(cache) {
        const cacheId = cache.identify({ id, __typename });
        cache.evict({ id: cacheId });
        cache.gc();
      },
      onError() {
        toastVar({
          status: "error",
          title: t("errors.somethingWentWrong"),
        });
      },
    });
  };

  const handleClickWithConfirm = () =>
    window.confirm(t("prompts.deleteItem", { itemType: "role" })) &&
    handleClick();

  return (
    <DeleteButton onClick={handleClickWithConfirm}>
      {t("roles.actions.delete")}
    </DeleteButton>
  );
};

export default DeleteGroupRoleButton;
