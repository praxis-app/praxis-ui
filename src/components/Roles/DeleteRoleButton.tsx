import produce from "immer";
import { useTranslation } from "react-i18next";
import { toastVar } from "../../apollo/cache";
import {
  ServerRolesDocument,
  ServerRolesQuery,
  useDeleteRoleMutation,
} from "../../apollo/gen";
import { NavigationPaths, TypeNames } from "../../constants/common.constants";
import { redirectTo } from "../../utils/common.utils";
import DeleteButton from "../Shared/DeleteButton";

interface Props {
  roleId: number;
}

const DeleteRoleButton = ({ roleId }: Props) => {
  const [deleteRole] = useDeleteRoleMutation();
  const { t } = useTranslation();

  const handleClick = async () => {
    await redirectTo(NavigationPaths.Roles);

    await deleteRole({
      variables: { id: roleId },
      update(cache) {
        cache.updateQuery<ServerRolesQuery>(
          { query: ServerRolesDocument },
          (rolesData) =>
            produce(rolesData, (draft) => {
              if (!draft) {
                return;
              }
              const index = draft.serverRoles.findIndex(
                (role) => role.id === roleId
              );
              draft.serverRoles.splice(index, 1);
            })
        );
        const cacheId = cache.identify({
          id: roleId,
          __typename: TypeNames.Role,
        });
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
