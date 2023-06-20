import { FormikHelpers } from "formik";
import produce from "immer";
import { useState } from "react";
import { toastVar } from "../../apollo/cache";
import {
  CreateServerRoleInput,
  RoleFragment,
  ServerRolesDocument,
  ServerRolesQuery,
  useCreateServerRoleMutation,
  useUpdateServerRoleMutation,
} from "../../apollo/gen";
import { DEFAULT_ROLE_COLOR } from "../../constants/role.constants";
import { getRandomString } from "../../utils/common.utils";
import RoleForm from "./RoleForm";

interface Props {
  editRole?: RoleFragment;
}

const ServerRoleForm = ({ editRole }: Props) => {
  const [color, setColor] = useState(
    editRole ? editRole.color : DEFAULT_ROLE_COLOR
  );
  const [colorPickerKey, setColorPickerKey] = useState("");
  const [createRole] = useCreateServerRoleMutation();
  const [updateRole] = useUpdateServerRoleMutation();

  const initialValues = {
    name: editRole ? editRole.name : "",
  };

  const handleCreate = async (
    formValues: Omit<CreateServerRoleInput, "color">,
    {
      setSubmitting,
      resetForm,
    }: FormikHelpers<Omit<CreateServerRoleInput, "color">>
  ) =>
    await createRole({
      variables: {
        roleData: { color, ...formValues },
      },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const {
          createServerRole: { role },
        } = data;
        cache.updateQuery<ServerRolesQuery>(
          { query: ServerRolesDocument },
          (postsData) =>
            produce(postsData, (draft) => {
              draft?.serverRoles.unshift(role);
            })
        );
      },
      onCompleted() {
        setColor(DEFAULT_ROLE_COLOR);
        setSubmitting(false);
        resetForm();
      },
    });

  const handleSubmit = async (
    formValues: Omit<CreateServerRoleInput, "color">,
    formHelpers: FormikHelpers<Omit<CreateServerRoleInput, "color">>
  ) => {
    try {
      if (editRole) {
        await updateRole({
          variables: {
            roleData: {
              id: editRole.id,
              ...formValues,
              color,
            },
          },
        });
        return;
      }
      await handleCreate(formValues, formHelpers);
    } catch (err) {
      toastVar({
        status: "error",
        title: String(err),
      });
    } finally {
      setColorPickerKey(getRandomString());
    }
  };

  return (
    <RoleForm
      color={color}
      setColor={setColor}
      colorPickerKey={colorPickerKey}
      handleSubmit={handleSubmit}
      initialValues={initialValues}
      editRole={editRole}
    />
  );
};

export default ServerRoleForm;
