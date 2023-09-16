import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../../users/fragments/generated/UserAvatar.fragment.generated";

// THIS FILE IS GENERATED, DO NOT EDIT
/* eslint-disable */

export type RoleMemberFragment = {
  __typename?: "User";
  id: number;
  name: string;
  profilePicture: { __typename?: "Image"; id: number };
};

export const RoleMemberFragmentDoc = gql`
  fragment RoleMember on User {
    id
    ...UserAvatar
  }
  ${UserAvatarFragmentDoc}
`;
