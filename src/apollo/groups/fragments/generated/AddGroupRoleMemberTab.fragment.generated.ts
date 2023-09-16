import { gql } from "@apollo/client";
import { RoleMemberFragmentDoc } from "../../../roles/fragments/generated/RoleMember.fragment.generated";

// THIS FILE IS GENERATED, DO NOT EDIT
/* eslint-disable */

export type AddGroupRoleMemberTabFragment = {
  __typename?: "GroupRole";
  id: number;
  members: Array<{
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  }>;
};

export const AddGroupRoleMemberTabFragmentDoc = gql`
  fragment AddGroupRoleMemberTab on GroupRole {
    id
    members {
      ...RoleMember
    }
  }
  ${RoleMemberFragmentDoc}
`;
