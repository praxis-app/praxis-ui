import produce from "immer";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  DeleteRoleButtonFragment,
  ServerRolesDocument,
  ServerRolesQuery,
  useDeleteRoleMutation,
} from "../../apollo/gen";
import { NavigationPaths } from "../../constants/common.constants";
import { redirectTo } from "../../utils/common.utils";
import DeleteButton from "../Shared/DeleteButton";

interface Props {
  role: DeleteRoleButtonFragment;
}

const DeleteRoleButton = ({ role: { id, group, __typename } }: Props) => {
  const [deleteRole] = useDeleteRoleMutation();
  const { t } = useTranslation();

  const handleClick = async () => {
    const groupRolesPath = `${NavigationPaths.Groups}/${group?.name}/roles`;
    await redirectTo(group ? groupRolesPath : NavigationPaths.Roles);

    await deleteRole({
      variables: { id },
      update(cache) {
        if (!group) {
          cache.updateQuery<ServerRolesQuery>(
            { query: ServerRolesDocument },
            (rolesData) =>
              produce(rolesData, (draft) => {
                if (!draft) {
                  return;
                }
                const index = draft.serverRoles.findIndex(
                  (role) => role.id === id
                );
                draft.serverRoles.splice(index, 1);
              })
          );
        }
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

export default DeleteRoleButton;
