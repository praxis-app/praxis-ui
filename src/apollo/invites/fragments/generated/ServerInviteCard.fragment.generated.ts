import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "../../../users/fragments/generated/UserAvatar.fragment.generated";

// THIS FILE IS GENERATED, DO NOT EDIT
/* eslint-disable */

export type ServerInviteCardFragment = {
  __typename?: "ServerInvite";
  id: number;
  maxUses?: number | null;
  token: string;
  uses: number;
  expiresAt?: any | null;
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  };
};

export const ServerInviteCardFragmentDoc = gql`
  fragment ServerInviteCard on ServerInvite {
    id
    maxUses
    token
    uses
    expiresAt
    user {
      ...UserAvatar
    }
  }
  ${UserAvatarFragmentDoc}
`;
