import { gql } from "@apollo/client";
import { UserAvatarFragmentDoc } from "./UserAvatar.fragment.generated";
import { FollowButtonFragmentDoc } from "./FollowButton.fragment.generated";

// THIS FILE IS GENERATED, DO NOT EDIT
/* eslint-disable */

export type FollowFragment = {
  __typename?: "User";
  id: number;
  name: string;
  isFollowedByMe: boolean;
  profilePicture: { __typename?: "Image"; id: number };
};

export const FollowFragmentDoc = gql`
  fragment Follow on User {
    id
    ...UserAvatar
    ...FollowButton
  }
  ${UserAvatarFragmentDoc}
  ${FollowButtonFragmentDoc}
`;
