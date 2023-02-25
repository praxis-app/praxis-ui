import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";

// THIS FILE IS GENERATED, DO NOT EDIT
/* eslint-disable */

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Upload: any;
};

export type ApproveMemberRequestPayload = {
  __typename?: "ApproveMemberRequestPayload";
  groupMember: GroupMember;
};

export type CreateGroupInput = {
  coverPhoto?: InputMaybe<Scalars["Upload"]>;
  description: Scalars["String"];
  name: Scalars["String"];
};

export type CreateGroupPayload = {
  __typename?: "CreateGroupPayload";
  group: Group;
};

export type CreateMemberRequestPayload = {
  __typename?: "CreateMemberRequestPayload";
  memberRequest: MemberRequest;
};

export type CreatePostInput = {
  body?: InputMaybe<Scalars["String"]>;
  groupId?: InputMaybe<Scalars["Int"]>;
  images?: InputMaybe<Array<Scalars["Upload"]>>;
};

export type CreatePostPayload = {
  __typename?: "CreatePostPayload";
  post: Post;
};

export type CreateProposalInput = {
  action: ProposalActionInput;
  body?: InputMaybe<Scalars["String"]>;
  groupId?: InputMaybe<Scalars["Int"]>;
  images?: InputMaybe<Array<Scalars["Upload"]>>;
};

export type CreateProposalPayload = {
  __typename?: "CreateProposalPayload";
  proposal: Proposal;
};

export type CreateRoleInput = {
  color: Scalars["String"];
  name: Scalars["String"];
};

export type CreateRolePayload = {
  __typename?: "CreateRolePayload";
  role: Role;
};

export type CreateServerInviteInput = {
  expiresAt?: InputMaybe<Scalars["DateTime"]>;
  maxUses?: InputMaybe<Scalars["Int"]>;
};

export type CreateServerInvitePayload = {
  __typename?: "CreateServerInvitePayload";
  serverInvite: ServerInvite;
};

export type CreateVoteInput = {
  proposalId: Scalars["Int"];
  voteType: Scalars["String"];
};

export type CreateVotePayload = {
  __typename?: "CreateVotePayload";
  vote: Vote;
};

export type DeleteRoleMemberPayload = {
  __typename?: "DeleteRoleMemberPayload";
  role: Role;
};

export type FeedItem = Post | Proposal;

export type Group = {
  __typename?: "Group";
  coverPhoto?: Maybe<Image>;
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  feed: Array<FeedItem>;
  id: Scalars["Int"];
  memberCount: Scalars["Int"];
  memberRequestCount: Scalars["Int"];
  members: Array<GroupMember>;
  name: Scalars["String"];
  posts: Array<Post>;
  proposals: Array<Proposal>;
  roles: Array<Role>;
  updatedAt: Scalars["DateTime"];
};

export type GroupMember = {
  __typename?: "GroupMember";
  createdAt: Scalars["DateTime"];
  group: Group;
  id: Scalars["Int"];
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type Image = {
  __typename?: "Image";
  createdAt: Scalars["DateTime"];
  filename: Scalars["String"];
  group: Group;
  id: Scalars["Int"];
  imageType: Scalars["String"];
  post: Post;
  proposal: Proposal;
  proposalAction: ProposalAction;
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type LoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type LoginPayload = {
  __typename?: "LoginPayload";
  user: User;
};

export type MemberRequest = {
  __typename?: "MemberRequest";
  createdAt: Scalars["DateTime"];
  group: Group;
  id: Scalars["Int"];
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  approveMemberRequest: ApproveMemberRequestPayload;
  cancelMemberRequest: Scalars["Boolean"];
  createGroup: CreateGroupPayload;
  createMemberRequest: CreateMemberRequestPayload;
  createPost: CreatePostPayload;
  createProposal: CreateProposalPayload;
  createRole: CreateRolePayload;
  createServerInvite: CreateServerInvitePayload;
  createVote: CreateVotePayload;
  deleteGroup: Scalars["Boolean"];
  deleteImage: Scalars["Boolean"];
  deletePost: Scalars["Boolean"];
  deleteProposal: Scalars["Boolean"];
  deleteRole: Scalars["Boolean"];
  deleteRoleMember: DeleteRoleMemberPayload;
  deleteServerInvite: Scalars["Boolean"];
  deleteUser: Scalars["Boolean"];
  deleteVote: Scalars["Boolean"];
  denyMemberRequest: Scalars["Boolean"];
  leaveGroup: Scalars["Boolean"];
  logOut: Scalars["Boolean"];
  login: LoginPayload;
  refreshToken: Scalars["Boolean"];
  signUp: SignUpPayload;
  updateGroup: UpdateGroupPayload;
  updatePost: UpdatePostPayload;
  updateProposal: UpdateProposalPayload;
  updateRole: UpdateRolePayload;
  updateUser: UpdateUserPayload;
  updateVote: UpdateVotePayload;
};

export type MutationApproveMemberRequestArgs = {
  id: Scalars["Int"];
};

export type MutationCancelMemberRequestArgs = {
  id: Scalars["Int"];
};

export type MutationCreateGroupArgs = {
  groupData: CreateGroupInput;
};

export type MutationCreateMemberRequestArgs = {
  groupId: Scalars["Int"];
};

export type MutationCreatePostArgs = {
  postData: CreatePostInput;
};

export type MutationCreateProposalArgs = {
  proposalData: CreateProposalInput;
};

export type MutationCreateRoleArgs = {
  roleData: CreateRoleInput;
};

export type MutationCreateServerInviteArgs = {
  serverInviteData: CreateServerInviteInput;
};

export type MutationCreateVoteArgs = {
  voteData: CreateVoteInput;
};

export type MutationDeleteGroupArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteImageArgs = {
  id: Scalars["Int"];
};

export type MutationDeletePostArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteProposalArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteRoleArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteRoleMemberArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteServerInviteArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteUserArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteVoteArgs = {
  id: Scalars["Int"];
};

export type MutationDenyMemberRequestArgs = {
  id: Scalars["Int"];
};

export type MutationLeaveGroupArgs = {
  id: Scalars["Int"];
};

export type MutationLoginArgs = {
  input: LoginInput;
};

export type MutationSignUpArgs = {
  input: SignUpInput;
};

export type MutationUpdateGroupArgs = {
  groupData: UpdateGroupInput;
};

export type MutationUpdatePostArgs = {
  postData: UpdatePostInput;
};

export type MutationUpdateProposalArgs = {
  proposalData: UpdateProposalInput;
};

export type MutationUpdateRoleArgs = {
  roleData: UpdateRoleInput;
};

export type MutationUpdateUserArgs = {
  userData: UpdateUserInput;
};

export type MutationUpdateVoteArgs = {
  voteData: UpdateVoteInput;
};

export type Permission = {
  __typename?: "Permission";
  enabled: Scalars["Boolean"];
  id: Scalars["Int"];
  name: Scalars["String"];
  role: Role;
};

export type PermissionInput = {
  enabled: Scalars["Boolean"];
  id: Scalars["Int"];
};

export type Post = {
  __typename?: "Post";
  body?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  group?: Maybe<Group>;
  id: Scalars["Int"];
  images: Array<Image>;
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type Proposal = {
  __typename?: "Proposal";
  action: ProposalAction;
  body?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  group?: Maybe<Group>;
  id: Scalars["Int"];
  images: Array<Image>;
  stage: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  user: User;
  voteCount: Scalars["Int"];
  votes: Array<Vote>;
};

export type ProposalAction = {
  __typename?: "ProposalAction";
  actionType: Scalars["String"];
  createdAt: Scalars["DateTime"];
  groupCoverPhoto?: Maybe<Image>;
  groupDescription?: Maybe<Scalars["String"]>;
  groupName?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  proposal: Proposal;
  updatedAt: Scalars["DateTime"];
};

export type ProposalActionInput = {
  actionType: Scalars["String"];
  groupCoverPhoto?: InputMaybe<Scalars["Upload"]>;
  groupDescription?: InputMaybe<Scalars["String"]>;
  groupName?: InputMaybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  authCheck: Scalars["Boolean"];
  group: Group;
  groups: Array<Group>;
  me: User;
  memberRequest?: Maybe<MemberRequest>;
  memberRequests: Array<MemberRequest>;
  post: Post;
  posts: Array<Post>;
  proposal: Proposal;
  proposals: Array<Proposal>;
  role: Role;
  serverInvite: ServerInvite;
  serverInvites: Array<ServerInvite>;
  serverRoles: Array<Role>;
  user: User;
  users: Array<User>;
  vote: Vote;
  votes: Array<Vote>;
};

export type QueryGroupArgs = {
  name: Scalars["String"];
};

export type QueryMemberRequestArgs = {
  groupId: Scalars["Int"];
};

export type QueryMemberRequestsArgs = {
  groupName: Scalars["String"];
};

export type QueryPostArgs = {
  id: Scalars["Int"];
};

export type QueryProposalArgs = {
  id: Scalars["Int"];
};

export type QueryRoleArgs = {
  id: Scalars["Int"];
};

export type QueryServerInviteArgs = {
  token: Scalars["String"];
};

export type QueryUserArgs = {
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type QueryVoteArgs = {
  id: Scalars["Int"];
};

export type Role = {
  __typename?: "Role";
  availableUsersToAdd: Array<User>;
  color: Scalars["String"];
  group?: Maybe<Group>;
  id: Scalars["Int"];
  memberCount: Scalars["Int"];
  members: Array<RoleMember>;
  name: Scalars["String"];
  permissions: Array<Permission>;
};

export type RoleMember = {
  __typename?: "RoleMember";
  id: Scalars["Int"];
  role: Role;
  user: User;
};

export type ServerInvite = {
  __typename?: "ServerInvite";
  createdAt: Scalars["DateTime"];
  expiresAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["Int"];
  maxUses?: Maybe<Scalars["Int"]>;
  token: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  user: User;
  uses: Scalars["Int"];
};

export type SignUpInput = {
  email: Scalars["String"];
  inviteToken: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type SignUpPayload = {
  __typename?: "SignUpPayload";
  user: User;
};

export type UpdateGroupInput = {
  coverPhoto?: InputMaybe<Scalars["Upload"]>;
  description?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  name?: InputMaybe<Scalars["String"]>;
};

export type UpdateGroupPayload = {
  __typename?: "UpdateGroupPayload";
  group: Group;
};

export type UpdatePostInput = {
  body?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  images?: InputMaybe<Array<Scalars["Upload"]>>;
};

export type UpdatePostPayload = {
  __typename?: "UpdatePostPayload";
  post: Post;
};

export type UpdateProposalInput = {
  action: ProposalActionInput;
  body?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  images?: InputMaybe<Array<Scalars["Upload"]>>;
};

export type UpdateProposalPayload = {
  __typename?: "UpdateProposalPayload";
  proposal: Proposal;
};

export type UpdateRoleInput = {
  color?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  name?: InputMaybe<Scalars["String"]>;
  permissions?: InputMaybe<Array<PermissionInput>>;
  selectedUserIds?: InputMaybe<Array<Scalars["Int"]>>;
};

export type UpdateRolePayload = {
  __typename?: "UpdateRolePayload";
  me: User;
  role: Role;
};

export type UpdateUserInput = {
  bio: Scalars["String"];
  coverPhoto?: InputMaybe<Scalars["Upload"]>;
  id: Scalars["Int"];
  name: Scalars["String"];
  profilePicture?: InputMaybe<Scalars["Upload"]>;
};

export type UpdateUserPayload = {
  __typename?: "UpdateUserPayload";
  user: User;
};

export type UpdateVoteInput = {
  id: Scalars["Int"];
  voteType: Scalars["String"];
};

export type UpdateVotePayload = {
  __typename?: "UpdateVotePayload";
  vote: Vote;
};

export type User = {
  __typename?: "User";
  bio?: Maybe<Scalars["String"]>;
  coverPhoto?: Maybe<Image>;
  createdAt: Scalars["DateTime"];
  email: Scalars["String"];
  homeFeed: Array<FeedItem>;
  id: Scalars["Int"];
  joinedGroups: Array<Group>;
  name: Scalars["String"];
  posts: Array<Post>;
  profileFeed: Array<FeedItem>;
  profilePicture: Image;
  proposals: Array<Proposal>;
  serverPermissions: Array<Scalars["String"]>;
  updatedAt: Scalars["DateTime"];
};

export type Vote = {
  __typename?: "Vote";
  createdAt: Scalars["DateTime"];
  id: Scalars["Int"];
  proposal: Proposal;
  updatedAt: Scalars["DateTime"];
  user: User;
  voteType: Scalars["String"];
};

export type LogOutMutationVariables = Exact<{ [key: string]: never }>;

export type LogOutMutation = { __typename?: "Mutation"; logOut: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginPayload";
    user: {
      __typename?: "User";
      id: number;
      serverPermissions: Array<string>;
      name: string;
      joinedGroups: Array<{ __typename?: "Group"; id: number; name: string }>;
      profilePicture: { __typename?: "Image"; id: number };
    };
  };
};

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never }>;

export type RefreshTokenMutation = {
  __typename?: "Mutation";
  refreshToken: boolean;
};

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: {
    __typename?: "SignUpPayload";
    user: {
      __typename?: "User";
      id: number;
      serverPermissions: Array<string>;
      name: string;
      joinedGroups: Array<{ __typename?: "Group"; id: number; name: string }>;
      profilePicture: { __typename?: "Image"; id: number };
    };
  };
};

export type AuthCheckQueryVariables = Exact<{ [key: string]: never }>;

export type AuthCheckQuery = { __typename?: "Query"; authCheck: boolean };

export type CurrentMemberFragment = {
  __typename?: "GroupMember";
  id: number;
  user: { __typename?: "User"; id: number };
};

export type GroupAvatarFragment = {
  __typename?: "Group";
  id: number;
  name: string;
  coverPhoto?: { __typename?: "Image"; id: number } | null;
};

export type GroupCardFragment = {
  __typename?: "Group";
  description: string;
  memberRequestCount: number;
  id: number;
  name: string;
  members: Array<{
    __typename?: "GroupMember";
    id: number;
    user: { __typename?: "User"; id: number };
  }>;
  coverPhoto?: { __typename?: "Image"; id: number } | null;
};

export type GroupFormFragment = {
  __typename?: "Group";
  id: number;
  name: string;
  description: string;
};

export type GroupMemberFragment = {
  __typename?: "GroupMember";
  id: number;
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  };
};

export type GroupProfileCardFragment = {
  __typename?: "Group";
  id: number;
  name: string;
  memberRequestCount: number;
  coverPhoto?: { __typename?: "Image"; id: number } | null;
  members: Array<{
    __typename?: "GroupMember";
    id: number;
    user: { __typename?: "User"; id: number };
  }>;
};

export type RequestToJoinFragment = {
  __typename?: "MemberRequest";
  id: number;
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  };
  group: { __typename?: "Group"; id: number };
};

export type ApproveMemberRequestMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type ApproveMemberRequestMutation = {
  __typename?: "Mutation";
  approveMemberRequest: {
    __typename?: "ApproveMemberRequestPayload";
    groupMember: {
      __typename?: "GroupMember";
      id: number;
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      };
    };
  };
};

export type CancelMemberRequestMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type CancelMemberRequestMutation = {
  __typename?: "Mutation";
  cancelMemberRequest: boolean;
};

export type CreateGroupMutationVariables = Exact<{
  groupData: CreateGroupInput;
}>;

export type CreateGroupMutation = {
  __typename?: "Mutation";
  createGroup: {
    __typename?: "CreateGroupPayload";
    group: {
      __typename?: "Group";
      description: string;
      id: number;
      name: string;
      members: Array<{
        __typename?: "GroupMember";
        id: number;
        user: { __typename?: "User"; id: number };
      }>;
      coverPhoto?: { __typename?: "Image"; id: number } | null;
    };
  };
};

export type CreateMemberRequestMutationVariables = Exact<{
  groupId: Scalars["Int"];
}>;

export type CreateMemberRequestMutation = {
  __typename?: "Mutation";
  createMemberRequest: {
    __typename?: "CreateMemberRequestPayload";
    memberRequest: {
      __typename?: "MemberRequest";
      id: number;
      group: { __typename?: "Group"; id: number; name: string };
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      };
    };
  };
};

export type DeleteGroupMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteGroupMutation = {
  __typename?: "Mutation";
  deleteGroup: boolean;
};

export type DenyMemberRequestMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DenyMemberRequestMutation = {
  __typename?: "Mutation";
  denyMemberRequest: boolean;
};

export type LeaveGroupMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type LeaveGroupMutation = {
  __typename?: "Mutation";
  leaveGroup: boolean;
};

export type UpdateGroupMutationVariables = Exact<{
  groupData: UpdateGroupInput;
}>;

export type UpdateGroupMutation = {
  __typename?: "Mutation";
  updateGroup: {
    __typename?: "UpdateGroupPayload";
    group: {
      __typename?: "Group";
      description: string;
      id: number;
      name: string;
      coverPhoto?: { __typename?: "Image"; id: number } | null;
    };
  };
};

export type EditGroupQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type EditGroupQuery = {
  __typename?: "Query";
  group: {
    __typename?: "Group";
    id: number;
    name: string;
    description: string;
  };
};

export type GroupMembersQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type GroupMembersQuery = {
  __typename?: "Query";
  group: {
    __typename?: "Group";
    id: number;
    members: Array<{
      __typename?: "GroupMember";
      id: number;
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      };
    }>;
  };
};

export type GroupProfileQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type GroupProfileQuery = {
  __typename?: "Query";
  group: {
    __typename?: "Group";
    id: number;
    name: string;
    memberRequestCount: number;
    feed: Array<
      | {
          __typename?: "Post";
          id: number;
          body?: string | null;
          createdAt: any;
          images: Array<{ __typename?: "Image"; id: number; filename: string }>;
          user: {
            __typename?: "User";
            id: number;
            name: string;
            profilePicture: { __typename?: "Image"; id: number };
          };
          group?: {
            __typename?: "Group";
            id: number;
            name: string;
            coverPhoto?: { __typename?: "Image"; id: number } | null;
          } | null;
        }
      | {
          __typename?: "Proposal";
          id: number;
          body?: string | null;
          voteCount: number;
          createdAt: any;
          stage: string;
          action: {
            __typename?: "ProposalAction";
            id: number;
            actionType: string;
            groupDescription?: string | null;
            groupName?: string | null;
            groupCoverPhoto?: {
              __typename?: "Image";
              id: number;
              filename: string;
            } | null;
          };
          user: {
            __typename?: "User";
            id: number;
            name: string;
            profilePicture: { __typename?: "Image"; id: number };
          };
          group?: {
            __typename?: "Group";
            id: number;
            name: string;
            coverPhoto?: { __typename?: "Image"; id: number } | null;
          } | null;
          images: Array<{ __typename?: "Image"; id: number; filename: string }>;
          votes: Array<{
            __typename?: "Vote";
            id: number;
            voteType: string;
            user: {
              __typename?: "User";
              id: number;
              name: string;
              profilePicture: { __typename?: "Image"; id: number };
            };
          }>;
        }
    >;
    coverPhoto?: { __typename?: "Image"; id: number } | null;
    members: Array<{
      __typename?: "GroupMember";
      id: number;
      user: { __typename?: "User"; id: number };
    }>;
  };
  me: {
    __typename?: "User";
    id: number;
    joinedGroups: Array<{ __typename?: "Group"; id: number; name: string }>;
  };
};

export type GroupsQueryVariables = Exact<{ [key: string]: never }>;

export type GroupsQuery = {
  __typename?: "Query";
  groups: Array<{
    __typename?: "Group";
    description: string;
    memberRequestCount: number;
    id: number;
    name: string;
    members: Array<{
      __typename?: "GroupMember";
      id: number;
      user: { __typename?: "User"; id: number };
    }>;
    coverPhoto?: { __typename?: "Image"; id: number } | null;
  }>;
  me: { __typename?: "User"; id: number };
};

export type MemberRequestQueryVariables = Exact<{
  groupId: Scalars["Int"];
}>;

export type MemberRequestQuery = {
  __typename?: "Query";
  memberRequest?: {
    __typename?: "MemberRequest";
    id: number;
    user: { __typename?: "User"; id: number };
  } | null;
};

export type MemberRequestsQueryVariables = Exact<{
  groupName: Scalars["String"];
}>;

export type MemberRequestsQuery = {
  __typename?: "Query";
  memberRequests: Array<{
    __typename?: "MemberRequest";
    id: number;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    };
    group: { __typename?: "Group"; id: number };
  }>;
};

export type AttachedImageFragment = {
  __typename?: "Image";
  id: number;
  filename: string;
};

export type DeleteImageMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteImageMutation = {
  __typename?: "Mutation";
  deleteImage: boolean;
};

export type ServerInviteRowFragment = {
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

export type CreateServerInviteMutationVariables = Exact<{
  serverInviteData: CreateServerInviteInput;
}>;

export type CreateServerInviteMutation = {
  __typename?: "Mutation";
  createServerInvite: {
    __typename?: "CreateServerInvitePayload";
    serverInvite: {
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
  };
};

export type DeleteServerInviteMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteServerInviteMutation = {
  __typename?: "Mutation";
  deleteServerInvite: boolean;
};

export type ServerInviteQueryVariables = Exact<{
  token: Scalars["String"];
}>;

export type ServerInviteQuery = {
  __typename?: "Query";
  serverInvite: { __typename?: "ServerInvite"; id: number; token: string };
};

export type ServerInvitesQueryVariables = Exact<{ [key: string]: never }>;

export type ServerInvitesQuery = {
  __typename?: "Query";
  serverInvites: Array<{
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
  }>;
  me: { __typename?: "User"; id: number; serverPermissions: Array<string> };
};

type FeedItem_Post_Fragment = {
  __typename?: "Post";
  id: number;
  body?: string | null;
  createdAt: any;
  images: Array<{ __typename?: "Image"; id: number; filename: string }>;
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  };
  group?: {
    __typename?: "Group";
    id: number;
    name: string;
    coverPhoto?: { __typename?: "Image"; id: number } | null;
  } | null;
};

type FeedItem_Proposal_Fragment = {
  __typename?: "Proposal";
  id: number;
  body?: string | null;
  voteCount: number;
  createdAt: any;
  stage: string;
  action: {
    __typename?: "ProposalAction";
    id: number;
    actionType: string;
    groupDescription?: string | null;
    groupName?: string | null;
    groupCoverPhoto?: {
      __typename?: "Image";
      id: number;
      filename: string;
    } | null;
  };
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  };
  group?: {
    __typename?: "Group";
    id: number;
    name: string;
    coverPhoto?: { __typename?: "Image"; id: number } | null;
  } | null;
  images: Array<{ __typename?: "Image"; id: number; filename: string }>;
  votes: Array<{
    __typename?: "Vote";
    id: number;
    voteType: string;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    };
  }>;
};

export type FeedItemFragment =
  | FeedItem_Post_Fragment
  | FeedItem_Proposal_Fragment;

export type PostCardFragment = {
  __typename?: "Post";
  id: number;
  body?: string | null;
  createdAt: any;
  images: Array<{ __typename?: "Image"; id: number; filename: string }>;
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  };
  group?: {
    __typename?: "Group";
    id: number;
    name: string;
    coverPhoto?: { __typename?: "Image"; id: number } | null;
  } | null;
};

export type PostFormFragment = {
  __typename?: "Post";
  id: number;
  body?: string | null;
  images: Array<{ __typename?: "Image"; id: number; filename: string }>;
};

export type CreatePostMutationVariables = Exact<{
  postData: CreatePostInput;
}>;

export type CreatePostMutation = {
  __typename?: "Mutation";
  createPost: {
    __typename?: "CreatePostPayload";
    post: {
      __typename?: "Post";
      id: number;
      body?: string | null;
      createdAt: any;
      images: Array<{ __typename?: "Image"; id: number; filename: string }>;
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      };
      group?: {
        __typename?: "Group";
        id: number;
        name: string;
        coverPhoto?: { __typename?: "Image"; id: number } | null;
      } | null;
    };
  };
};

export type DeletePostMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeletePostMutation = {
  __typename?: "Mutation";
  deletePost: boolean;
};

export type UpdatePostMutationVariables = Exact<{
  postData: UpdatePostInput;
}>;

export type UpdatePostMutation = {
  __typename?: "Mutation";
  updatePost: {
    __typename?: "UpdatePostPayload";
    post: {
      __typename?: "Post";
      id: number;
      body?: string | null;
      createdAt: any;
      images: Array<{ __typename?: "Image"; id: number; filename: string }>;
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      };
      group?: {
        __typename?: "Group";
        id: number;
        name: string;
        coverPhoto?: { __typename?: "Image"; id: number } | null;
      } | null;
    };
  };
};

export type EditPostQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type EditPostQuery = {
  __typename?: "Query";
  post: {
    __typename?: "Post";
    id: number;
    body?: string | null;
    images: Array<{ __typename?: "Image"; id: number; filename: string }>;
  };
};

export type PostQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type PostQuery = {
  __typename?: "Query";
  post: {
    __typename?: "Post";
    id: number;
    body?: string | null;
    createdAt: any;
    images: Array<{ __typename?: "Image"; id: number; filename: string }>;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    };
    group?: {
      __typename?: "Group";
      id: number;
      name: string;
      coverPhoto?: { __typename?: "Image"; id: number } | null;
    } | null;
  };
};

export type ProposalCardFragment = {
  __typename?: "Proposal";
  id: number;
  body?: string | null;
  voteCount: number;
  createdAt: any;
  stage: string;
  action: {
    __typename?: "ProposalAction";
    id: number;
    actionType: string;
    groupDescription?: string | null;
    groupName?: string | null;
    groupCoverPhoto?: {
      __typename?: "Image";
      id: number;
      filename: string;
    } | null;
  };
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  };
  group?: {
    __typename?: "Group";
    id: number;
    name: string;
    coverPhoto?: { __typename?: "Image"; id: number } | null;
  } | null;
  images: Array<{ __typename?: "Image"; id: number; filename: string }>;
  votes: Array<{
    __typename?: "Vote";
    id: number;
    voteType: string;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    };
  }>;
};

export type ProposalCardFooterFragment = {
  __typename?: "Proposal";
  id: number;
  stage: string;
  voteCount: number;
  votes: Array<{
    __typename?: "Vote";
    id: number;
    voteType: string;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    };
  }>;
};

export type ProposalFormFragment = {
  __typename?: "Proposal";
  id: number;
  body?: string | null;
  action: {
    __typename?: "ProposalAction";
    id: number;
    actionType: string;
    groupDescription?: string | null;
    groupName?: string | null;
    groupCoverPhoto?: {
      __typename?: "Image";
      id: number;
      filename: string;
    } | null;
  };
  images: Array<{ __typename?: "Image"; id: number; filename: string }>;
};

export type CreateProposalMutationVariables = Exact<{
  proposalData: CreateProposalInput;
}>;

export type CreateProposalMutation = {
  __typename?: "Mutation";
  createProposal: {
    __typename?: "CreateProposalPayload";
    proposal: {
      __typename?: "Proposal";
      id: number;
      body?: string | null;
      voteCount: number;
      createdAt: any;
      stage: string;
      action: {
        __typename?: "ProposalAction";
        id: number;
        actionType: string;
        groupDescription?: string | null;
        groupName?: string | null;
        groupCoverPhoto?: {
          __typename?: "Image";
          id: number;
          filename: string;
        } | null;
      };
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      };
      group?: {
        __typename?: "Group";
        id: number;
        name: string;
        coverPhoto?: { __typename?: "Image"; id: number } | null;
      } | null;
      images: Array<{ __typename?: "Image"; id: number; filename: string }>;
      votes: Array<{
        __typename?: "Vote";
        id: number;
        voteType: string;
        user: {
          __typename?: "User";
          id: number;
          name: string;
          profilePicture: { __typename?: "Image"; id: number };
        };
      }>;
    };
  };
};

export type DeleteProposalMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteProposalMutation = {
  __typename?: "Mutation";
  deleteProposal: boolean;
};

export type UpdateProposalMutationVariables = Exact<{
  proposalData: UpdateProposalInput;
}>;

export type UpdateProposalMutation = {
  __typename?: "Mutation";
  updateProposal: {
    __typename?: "UpdateProposalPayload";
    proposal: {
      __typename?: "Proposal";
      id: number;
      body?: string | null;
      voteCount: number;
      createdAt: any;
      stage: string;
      action: {
        __typename?: "ProposalAction";
        id: number;
        actionType: string;
        groupDescription?: string | null;
        groupName?: string | null;
        groupCoverPhoto?: {
          __typename?: "Image";
          id: number;
          filename: string;
        } | null;
      };
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      };
      group?: {
        __typename?: "Group";
        id: number;
        name: string;
        coverPhoto?: { __typename?: "Image"; id: number } | null;
      } | null;
      images: Array<{ __typename?: "Image"; id: number; filename: string }>;
      votes: Array<{
        __typename?: "Vote";
        id: number;
        voteType: string;
        user: {
          __typename?: "User";
          id: number;
          name: string;
          profilePicture: { __typename?: "Image"; id: number };
        };
      }>;
    };
  };
};

export type EditProposalQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type EditProposalQuery = {
  __typename?: "Query";
  proposal: {
    __typename?: "Proposal";
    id: number;
    body?: string | null;
    action: {
      __typename?: "ProposalAction";
      id: number;
      actionType: string;
      groupDescription?: string | null;
      groupName?: string | null;
      groupCoverPhoto?: {
        __typename?: "Image";
        id: number;
        filename: string;
      } | null;
    };
    images: Array<{ __typename?: "Image"; id: number; filename: string }>;
  };
};

export type ProposalQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type ProposalQuery = {
  __typename?: "Query";
  proposal: {
    __typename?: "Proposal";
    id: number;
    body?: string | null;
    voteCount: number;
    createdAt: any;
    stage: string;
    action: {
      __typename?: "ProposalAction";
      id: number;
      actionType: string;
      groupDescription?: string | null;
      groupName?: string | null;
      groupCoverPhoto?: {
        __typename?: "Image";
        id: number;
        filename: string;
      } | null;
    };
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    };
    group?: {
      __typename?: "Group";
      id: number;
      name: string;
      coverPhoto?: { __typename?: "Image"; id: number } | null;
    } | null;
    images: Array<{ __typename?: "Image"; id: number; filename: string }>;
    votes: Array<{
      __typename?: "Vote";
      id: number;
      voteType: string;
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      };
    }>;
  };
};

export type AddMemberTabFragment = {
  __typename?: "Role";
  id: number;
  members: Array<{
    __typename?: "RoleMember";
    id: number;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    };
  }>;
};

export type PermissionsFormFragment = {
  __typename?: "Permission";
  id: number;
  name: string;
  enabled: boolean;
};

export type RoleFragment = {
  __typename?: "Role";
  id: number;
  name: string;
  color: string;
  memberCount: number;
};

export type RoleMemberFragment = {
  __typename?: "RoleMember";
  id: number;
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  };
};

export type CreateRoleMutationVariables = Exact<{
  roleData: CreateRoleInput;
}>;

export type CreateRoleMutation = {
  __typename?: "Mutation";
  createRole: {
    __typename?: "CreateRolePayload";
    role: {
      __typename?: "Role";
      id: number;
      name: string;
      color: string;
      memberCount: number;
    };
  };
};

export type DeleteRoleMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteRoleMutation = {
  __typename?: "Mutation";
  deleteRole: boolean;
};

export type DeleteRoleMemberMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteRoleMemberMutation = {
  __typename?: "Mutation";
  deleteRoleMember: {
    __typename?: "DeleteRoleMemberPayload";
    role: {
      __typename?: "Role";
      availableUsersToAdd: Array<{
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      }>;
    };
  };
};

export type UpdateRoleMutationVariables = Exact<{
  roleData: UpdateRoleInput;
}>;

export type UpdateRoleMutation = {
  __typename?: "Mutation";
  updateRole: {
    __typename?: "UpdateRolePayload";
    role: {
      __typename?: "Role";
      id: number;
      name: string;
      color: string;
      memberCount: number;
      permissions: Array<{
        __typename?: "Permission";
        id: number;
        name: string;
        enabled: boolean;
      }>;
      members: Array<{
        __typename?: "RoleMember";
        id: number;
        user: {
          __typename?: "User";
          id: number;
          name: string;
          profilePicture: { __typename?: "Image"; id: number };
        };
      }>;
      availableUsersToAdd: Array<{
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      }>;
    };
    me: { __typename?: "User"; id: number; serverPermissions: Array<string> };
  };
};

export type EditServerRoleQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type EditServerRoleQuery = {
  __typename?: "Query";
  role: {
    __typename?: "Role";
    id: number;
    name: string;
    color: string;
    memberCount: number;
    permissions: Array<{
      __typename?: "Permission";
      id: number;
      name: string;
      enabled: boolean;
    }>;
    availableUsersToAdd: Array<{
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    }>;
    members: Array<{
      __typename?: "RoleMember";
      id: number;
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      };
    }>;
  };
};

export type ServerRolesQueryVariables = Exact<{ [key: string]: never }>;

export type ServerRolesQuery = {
  __typename?: "Query";
  serverRoles: Array<{
    __typename?: "Role";
    id: number;
    name: string;
    color: string;
    memberCount: number;
  }>;
};

export type ToggleFormsFragment = {
  __typename?: "User";
  id: number;
  joinedGroups: Array<{ __typename?: "Group"; id: number; name: string }>;
};

export type EditProfileFormFragment = {
  __typename?: "User";
  id: number;
  bio?: string | null;
  name: string;
  profilePicture: { __typename?: "Image"; id: number };
  coverPhoto?: { __typename?: "Image"; id: number } | null;
};

export type TopNavDropdownFragment = {
  __typename?: "User";
  id: number;
  name: string;
  serverPermissions: Array<string>;
};

export type UserAvatarFragment = {
  __typename?: "User";
  id: number;
  name: string;
  profilePicture: { __typename?: "Image"; id: number };
};

export type UserProfileCardFragment = {
  __typename?: "User";
  bio?: string | null;
  createdAt: any;
  id: number;
  name: string;
  coverPhoto?: { __typename?: "Image"; id: number } | null;
  profilePicture: { __typename?: "Image"; id: number };
};

export type UpdateUserMutationVariables = Exact<{
  userData: UpdateUserInput;
}>;

export type UpdateUserMutation = {
  __typename?: "Mutation";
  updateUser: {
    __typename?: "UpdateUserPayload";
    user: {
      __typename?: "User";
      id: number;
      name: string;
      bio?: string | null;
      profilePicture: { __typename?: "Image"; id: number };
      coverPhoto?: { __typename?: "Image"; id: number } | null;
    };
  };
};

export type EditUserQueryVariables = Exact<{
  name?: InputMaybe<Scalars["String"]>;
}>;

export type EditUserQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    bio?: string | null;
    createdAt: any;
    id: number;
    name: string;
    posts: Array<{
      __typename?: "Post";
      id: number;
      body?: string | null;
      createdAt: any;
      images: Array<{ __typename?: "Image"; id: number; filename: string }>;
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      };
      group?: {
        __typename?: "Group";
        id: number;
        name: string;
        coverPhoto?: { __typename?: "Image"; id: number } | null;
      } | null;
    }>;
    coverPhoto?: { __typename?: "Image"; id: number } | null;
    profilePicture: { __typename?: "Image"; id: number };
  };
};

export type HomePageQueryVariables = Exact<{ [key: string]: never }>;

export type HomePageQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: number;
    homeFeed: Array<
      | {
          __typename?: "Post";
          id: number;
          body?: string | null;
          createdAt: any;
          images: Array<{ __typename?: "Image"; id: number; filename: string }>;
          user: {
            __typename?: "User";
            id: number;
            name: string;
            profilePicture: { __typename?: "Image"; id: number };
          };
          group?: {
            __typename?: "Group";
            id: number;
            name: string;
            coverPhoto?: { __typename?: "Image"; id: number } | null;
          } | null;
        }
      | {
          __typename?: "Proposal";
          id: number;
          body?: string | null;
          voteCount: number;
          createdAt: any;
          stage: string;
          action: {
            __typename?: "ProposalAction";
            id: number;
            actionType: string;
            groupDescription?: string | null;
            groupName?: string | null;
            groupCoverPhoto?: {
              __typename?: "Image";
              id: number;
              filename: string;
            } | null;
          };
          user: {
            __typename?: "User";
            id: number;
            name: string;
            profilePicture: { __typename?: "Image"; id: number };
          };
          group?: {
            __typename?: "Group";
            id: number;
            name: string;
            coverPhoto?: { __typename?: "Image"; id: number } | null;
          } | null;
          images: Array<{ __typename?: "Image"; id: number; filename: string }>;
          votes: Array<{
            __typename?: "Vote";
            id: number;
            voteType: string;
            user: {
              __typename?: "User";
              id: number;
              name: string;
              profilePicture: { __typename?: "Image"; id: number };
            };
          }>;
        }
    >;
    joinedGroups: Array<{ __typename?: "Group"; id: number; name: string }>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: number;
    serverPermissions: Array<string>;
    name: string;
    joinedGroups: Array<{ __typename?: "Group"; id: number; name: string }>;
    profilePicture: { __typename?: "Image"; id: number };
  };
};

export type UserProfileQueryVariables = Exact<{
  name?: InputMaybe<Scalars["String"]>;
}>;

export type UserProfileQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    bio?: string | null;
    createdAt: any;
    id: number;
    name: string;
    profileFeed: Array<
      | {
          __typename?: "Post";
          id: number;
          body?: string | null;
          createdAt: any;
          images: Array<{ __typename?: "Image"; id: number; filename: string }>;
          user: {
            __typename?: "User";
            id: number;
            name: string;
            profilePicture: { __typename?: "Image"; id: number };
          };
          group?: {
            __typename?: "Group";
            id: number;
            name: string;
            coverPhoto?: { __typename?: "Image"; id: number } | null;
          } | null;
        }
      | {
          __typename?: "Proposal";
          id: number;
          body?: string | null;
          voteCount: number;
          createdAt: any;
          stage: string;
          action: {
            __typename?: "ProposalAction";
            id: number;
            actionType: string;
            groupDescription?: string | null;
            groupName?: string | null;
            groupCoverPhoto?: {
              __typename?: "Image";
              id: number;
              filename: string;
            } | null;
          };
          user: {
            __typename?: "User";
            id: number;
            name: string;
            profilePicture: { __typename?: "Image"; id: number };
          };
          group?: {
            __typename?: "Group";
            id: number;
            name: string;
            coverPhoto?: { __typename?: "Image"; id: number } | null;
          } | null;
          images: Array<{ __typename?: "Image"; id: number; filename: string }>;
          votes: Array<{
            __typename?: "Vote";
            id: number;
            voteType: string;
            user: {
              __typename?: "User";
              id: number;
              name: string;
              profilePicture: { __typename?: "Image"; id: number };
            };
          }>;
        }
    >;
    coverPhoto?: { __typename?: "Image"; id: number } | null;
    profilePicture: { __typename?: "Image"; id: number };
  };
  me: {
    __typename?: "User";
    id: number;
    joinedGroups: Array<{ __typename?: "Group"; id: number; name: string }>;
  };
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: "Query";
  users: Array<{ __typename?: "User"; id: number; name: string }>;
};

export type VoteFragment = {
  __typename?: "Vote";
  id: number;
  voteType: string;
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  };
};

export type VoteChipFragment = {
  __typename?: "Vote";
  id: number;
  voteType: string;
  user: { __typename?: "User"; id: number };
};

export type VoteChipsFragment = {
  __typename?: "Proposal";
  id: number;
  voteCount: number;
  votes: Array<{
    __typename?: "Vote";
    id: number;
    voteType: string;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    };
  }>;
};

export type VoteMenuFragment = {
  __typename?: "Proposal";
  id: number;
  votes: Array<{
    __typename?: "Vote";
    id: number;
    voteType: string;
    user: { __typename?: "User"; id: number };
  }>;
};

export type CreateVoteMutationVariables = Exact<{
  voteData: CreateVoteInput;
}>;

export type CreateVoteMutation = {
  __typename?: "Mutation";
  createVote: {
    __typename?: "CreateVotePayload";
    vote: {
      __typename?: "Vote";
      id: number;
      voteType: string;
      proposal: {
        __typename?: "Proposal";
        id: number;
        stage: string;
        action: {
          __typename?: "ProposalAction";
          id: number;
          actionType: string;
        };
        group?: {
          __typename?: "Group";
          id: number;
          name: string;
          description: string;
        } | null;
      };
    };
  };
};

export type DeleteVoteMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteVoteMutation = {
  __typename?: "Mutation";
  deleteVote: boolean;
};

export type UpdateVoteMutationVariables = Exact<{
  voteData: UpdateVoteInput;
}>;

export type UpdateVoteMutation = {
  __typename?: "Mutation";
  updateVote: {
    __typename?: "UpdateVotePayload";
    vote: {
      __typename?: "Vote";
      id: number;
      voteType: string;
      proposal: {
        __typename?: "Proposal";
        id: number;
        stage: string;
        action: {
          __typename?: "ProposalAction";
          id: number;
          actionType: string;
        };
        group?: {
          __typename?: "Group";
          id: number;
          name: string;
          description: string;
        } | null;
      };
    };
  };
};

export const GroupAvatarFragmentDoc = gql`
  fragment GroupAvatar on Group {
    id
    name
    coverPhoto {
      id
    }
  }
`;
export const CurrentMemberFragmentDoc = gql`
  fragment CurrentMember on GroupMember {
    id
    user {
      id
    }
  }
`;
export const GroupCardFragmentDoc = gql`
  fragment GroupCard on Group {
    ...GroupAvatar
    description
    members {
      ...CurrentMember
    }
    memberRequestCount
  }
  ${GroupAvatarFragmentDoc}
  ${CurrentMemberFragmentDoc}
`;
export const GroupFormFragmentDoc = gql`
  fragment GroupForm on Group {
    id
    name
    description
  }
`;
export const UserAvatarFragmentDoc = gql`
  fragment UserAvatar on User {
    id
    name
    profilePicture {
      id
    }
  }
`;
export const GroupMemberFragmentDoc = gql`
  fragment GroupMember on GroupMember {
    id
    user {
      ...UserAvatar
    }
  }
  ${UserAvatarFragmentDoc}
`;
export const GroupProfileCardFragmentDoc = gql`
  fragment GroupProfileCard on Group {
    id
    name
    coverPhoto {
      id
    }
    members {
      ...CurrentMember
    }
    memberRequestCount
  }
  ${CurrentMemberFragmentDoc}
`;
export const RequestToJoinFragmentDoc = gql`
  fragment RequestToJoin on MemberRequest {
    id
    user {
      ...UserAvatar
    }
    group {
      id
    }
  }
  ${UserAvatarFragmentDoc}
`;
export const ServerInviteRowFragmentDoc = gql`
  fragment ServerInviteRow on ServerInvite {
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
export const AttachedImageFragmentDoc = gql`
  fragment AttachedImage on Image {
    id
    filename
  }
`;
export const PostCardFragmentDoc = gql`
  fragment PostCard on Post {
    id
    body
    images {
      ...AttachedImage
    }
    user {
      ...UserAvatar
    }
    group {
      ...GroupAvatar
    }
    createdAt
  }
  ${AttachedImageFragmentDoc}
  ${UserAvatarFragmentDoc}
  ${GroupAvatarFragmentDoc}
`;
export const VoteMenuFragmentDoc = gql`
  fragment VoteMenu on Proposal {
    id
    votes {
      id
      voteType
      user {
        id
      }
    }
  }
`;
export const VoteFragmentDoc = gql`
  fragment Vote on Vote {
    id
    voteType
    user {
      ...UserAvatar
    }
  }
  ${UserAvatarFragmentDoc}
`;
export const VoteChipFragmentDoc = gql`
  fragment VoteChip on Vote {
    id
    voteType
    user {
      id
    }
  }
`;
export const VoteChipsFragmentDoc = gql`
  fragment VoteChips on Proposal {
    id
    voteCount
    votes {
      ...Vote
      ...VoteChip
    }
  }
  ${VoteFragmentDoc}
  ${VoteChipFragmentDoc}
`;
export const ProposalCardFooterFragmentDoc = gql`
  fragment ProposalCardFooter on Proposal {
    id
    stage
    votes {
      user {
        id
      }
    }
    ...VoteMenu
    ...VoteChips
  }
  ${VoteMenuFragmentDoc}
  ${VoteChipsFragmentDoc}
`;
export const ProposalCardFragmentDoc = gql`
  fragment ProposalCard on Proposal {
    id
    body
    voteCount
    createdAt
    action {
      id
      actionType
      groupDescription
      groupName
      groupCoverPhoto {
        ...AttachedImage
      }
    }
    user {
      ...UserAvatar
    }
    group {
      ...GroupAvatar
    }
    images {
      ...AttachedImage
    }
    ...ProposalCardFooter
  }
  ${AttachedImageFragmentDoc}
  ${UserAvatarFragmentDoc}
  ${GroupAvatarFragmentDoc}
  ${ProposalCardFooterFragmentDoc}
`;
export const FeedItemFragmentDoc = gql`
  fragment FeedItem on FeedItem {
    ... on Post {
      ...PostCard
    }
    ... on Proposal {
      ...ProposalCard
    }
  }
  ${PostCardFragmentDoc}
  ${ProposalCardFragmentDoc}
`;
export const PostFormFragmentDoc = gql`
  fragment PostForm on Post {
    id
    body
    images {
      ...AttachedImage
    }
  }
  ${AttachedImageFragmentDoc}
`;
export const ProposalFormFragmentDoc = gql`
  fragment ProposalForm on Proposal {
    id
    body
    action {
      id
      actionType
      groupDescription
      groupName
      groupCoverPhoto {
        ...AttachedImage
      }
    }
    images {
      ...AttachedImage
    }
  }
  ${AttachedImageFragmentDoc}
`;
export const RoleMemberFragmentDoc = gql`
  fragment RoleMember on RoleMember {
    id
    user {
      ...UserAvatar
    }
  }
  ${UserAvatarFragmentDoc}
`;
export const AddMemberTabFragmentDoc = gql`
  fragment AddMemberTab on Role {
    id
    members {
      ...RoleMember
    }
  }
  ${RoleMemberFragmentDoc}
`;
export const PermissionsFormFragmentDoc = gql`
  fragment PermissionsForm on Permission {
    id
    name
    enabled
  }
`;
export const RoleFragmentDoc = gql`
  fragment Role on Role {
    id
    name
    color
    memberCount
  }
`;
export const ToggleFormsFragmentDoc = gql`
  fragment ToggleForms on User {
    id
    joinedGroups {
      id
      name
    }
  }
`;
export const EditProfileFormFragmentDoc = gql`
  fragment EditProfileForm on User {
    id
    bio
    name
    profilePicture {
      id
    }
    coverPhoto {
      id
    }
  }
`;
export const TopNavDropdownFragmentDoc = gql`
  fragment TopNavDropdown on User {
    id
    name
    serverPermissions
  }
`;
export const UserProfileCardFragmentDoc = gql`
  fragment UserProfileCard on User {
    ...UserAvatar
    coverPhoto {
      id
    }
    bio
    createdAt
  }
  ${UserAvatarFragmentDoc}
`;
export const LogOutDocument = gql`
  mutation LogOut {
    logOut
  }
`;
export type LogOutMutationFn = Apollo.MutationFunction<
  LogOutMutation,
  LogOutMutationVariables
>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogOutMutation,
    LogOutMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(
    LogOutDocument,
    options
  );
}
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<
  LogOutMutation,
  LogOutMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        ...UserAvatar
        serverPermissions
        joinedGroups {
          id
          name
        }
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const RefreshTokenDocument = gql`
  mutation RefreshToken {
    refreshToken
  }
`;
export type RefreshTokenMutationFn = Apollo.MutationFunction<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    RefreshTokenMutation,
    RefreshTokenMutationVariables
  >(RefreshTokenDocument, options);
}
export type RefreshTokenMutationHookResult = ReturnType<
  typeof useRefreshTokenMutation
>;
export type RefreshTokenMutationResult =
  Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<
  RefreshTokenMutation,
  RefreshTokenMutationVariables
>;
export const SignUpDocument = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      user {
        id
        ...UserAvatar
        serverPermissions
        joinedGroups {
          id
          name
        }
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
export type SignUpMutationFn = Apollo.MutationFunction<
  SignUpMutation,
  SignUpMutationVariables
>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignUpMutation,
    SignUpMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(
    SignUpDocument,
    options
  );
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<
  SignUpMutation,
  SignUpMutationVariables
>;
export const AuthCheckDocument = gql`
  query AuthCheck {
    authCheck
  }
`;

/**
 * __useAuthCheckQuery__
 *
 * To run a query within a React component, call `useAuthCheckQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthCheckQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthCheckQuery(
  baseOptions?: Apollo.QueryHookOptions<AuthCheckQuery, AuthCheckQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AuthCheckQuery, AuthCheckQueryVariables>(
    AuthCheckDocument,
    options
  );
}
export function useAuthCheckLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    AuthCheckQuery,
    AuthCheckQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AuthCheckQuery, AuthCheckQueryVariables>(
    AuthCheckDocument,
    options
  );
}
export type AuthCheckQueryHookResult = ReturnType<typeof useAuthCheckQuery>;
export type AuthCheckLazyQueryHookResult = ReturnType<
  typeof useAuthCheckLazyQuery
>;
export type AuthCheckQueryResult = Apollo.QueryResult<
  AuthCheckQuery,
  AuthCheckQueryVariables
>;
export const ApproveMemberRequestDocument = gql`
  mutation ApproveMemberRequest($id: Int!) {
    approveMemberRequest(id: $id) {
      groupMember {
        id
        user {
          ...UserAvatar
        }
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
export type ApproveMemberRequestMutationFn = Apollo.MutationFunction<
  ApproveMemberRequestMutation,
  ApproveMemberRequestMutationVariables
>;

/**
 * __useApproveMemberRequestMutation__
 *
 * To run a mutation, you first call `useApproveMemberRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveMemberRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveMemberRequestMutation, { data, loading, error }] = useApproveMemberRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApproveMemberRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ApproveMemberRequestMutation,
    ApproveMemberRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ApproveMemberRequestMutation,
    ApproveMemberRequestMutationVariables
  >(ApproveMemberRequestDocument, options);
}
export type ApproveMemberRequestMutationHookResult = ReturnType<
  typeof useApproveMemberRequestMutation
>;
export type ApproveMemberRequestMutationResult =
  Apollo.MutationResult<ApproveMemberRequestMutation>;
export type ApproveMemberRequestMutationOptions = Apollo.BaseMutationOptions<
  ApproveMemberRequestMutation,
  ApproveMemberRequestMutationVariables
>;
export const CancelMemberRequestDocument = gql`
  mutation CancelMemberRequest($id: Int!) {
    cancelMemberRequest(id: $id)
  }
`;
export type CancelMemberRequestMutationFn = Apollo.MutationFunction<
  CancelMemberRequestMutation,
  CancelMemberRequestMutationVariables
>;

/**
 * __useCancelMemberRequestMutation__
 *
 * To run a mutation, you first call `useCancelMemberRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelMemberRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelMemberRequestMutation, { data, loading, error }] = useCancelMemberRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelMemberRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CancelMemberRequestMutation,
    CancelMemberRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CancelMemberRequestMutation,
    CancelMemberRequestMutationVariables
  >(CancelMemberRequestDocument, options);
}
export type CancelMemberRequestMutationHookResult = ReturnType<
  typeof useCancelMemberRequestMutation
>;
export type CancelMemberRequestMutationResult =
  Apollo.MutationResult<CancelMemberRequestMutation>;
export type CancelMemberRequestMutationOptions = Apollo.BaseMutationOptions<
  CancelMemberRequestMutation,
  CancelMemberRequestMutationVariables
>;
export const CreateGroupDocument = gql`
  mutation CreateGroup($groupData: CreateGroupInput!) {
    createGroup(groupData: $groupData) {
      group {
        ...GroupAvatar
        description
        members {
          ...CurrentMember
        }
      }
    }
  }
  ${GroupAvatarFragmentDoc}
  ${CurrentMemberFragmentDoc}
`;
export type CreateGroupMutationFn = Apollo.MutationFunction<
  CreateGroupMutation,
  CreateGroupMutationVariables
>;

/**
 * __useCreateGroupMutation__
 *
 * To run a mutation, you first call `useCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMutation, { data, loading, error }] = useCreateGroupMutation({
 *   variables: {
 *      groupData: // value for 'groupData'
 *   },
 * });
 */
export function useCreateGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGroupMutation,
    CreateGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateGroupMutation, CreateGroupMutationVariables>(
    CreateGroupDocument,
    options
  );
}
export type CreateGroupMutationHookResult = ReturnType<
  typeof useCreateGroupMutation
>;
export type CreateGroupMutationResult =
  Apollo.MutationResult<CreateGroupMutation>;
export type CreateGroupMutationOptions = Apollo.BaseMutationOptions<
  CreateGroupMutation,
  CreateGroupMutationVariables
>;
export const CreateMemberRequestDocument = gql`
  mutation CreateMemberRequest($groupId: Int!) {
    createMemberRequest(groupId: $groupId) {
      memberRequest {
        id
        group {
          id
          name
        }
        user {
          ...UserAvatar
        }
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
export type CreateMemberRequestMutationFn = Apollo.MutationFunction<
  CreateMemberRequestMutation,
  CreateMemberRequestMutationVariables
>;

/**
 * __useCreateMemberRequestMutation__
 *
 * To run a mutation, you first call `useCreateMemberRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMemberRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMemberRequestMutation, { data, loading, error }] = useCreateMemberRequestMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useCreateMemberRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateMemberRequestMutation,
    CreateMemberRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateMemberRequestMutation,
    CreateMemberRequestMutationVariables
  >(CreateMemberRequestDocument, options);
}
export type CreateMemberRequestMutationHookResult = ReturnType<
  typeof useCreateMemberRequestMutation
>;
export type CreateMemberRequestMutationResult =
  Apollo.MutationResult<CreateMemberRequestMutation>;
export type CreateMemberRequestMutationOptions = Apollo.BaseMutationOptions<
  CreateMemberRequestMutation,
  CreateMemberRequestMutationVariables
>;
export const DeleteGroupDocument = gql`
  mutation DeleteGroup($id: Int!) {
    deleteGroup(id: $id)
  }
`;
export type DeleteGroupMutationFn = Apollo.MutationFunction<
  DeleteGroupMutation,
  DeleteGroupMutationVariables
>;

/**
 * __useDeleteGroupMutation__
 *
 * To run a mutation, you first call `useDeleteGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupMutation, { data, loading, error }] = useDeleteGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteGroupMutation,
    DeleteGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteGroupMutation, DeleteGroupMutationVariables>(
    DeleteGroupDocument,
    options
  );
}
export type DeleteGroupMutationHookResult = ReturnType<
  typeof useDeleteGroupMutation
>;
export type DeleteGroupMutationResult =
  Apollo.MutationResult<DeleteGroupMutation>;
export type DeleteGroupMutationOptions = Apollo.BaseMutationOptions<
  DeleteGroupMutation,
  DeleteGroupMutationVariables
>;
export const DenyMemberRequestDocument = gql`
  mutation DenyMemberRequest($id: Int!) {
    denyMemberRequest(id: $id)
  }
`;
export type DenyMemberRequestMutationFn = Apollo.MutationFunction<
  DenyMemberRequestMutation,
  DenyMemberRequestMutationVariables
>;

/**
 * __useDenyMemberRequestMutation__
 *
 * To run a mutation, you first call `useDenyMemberRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDenyMemberRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [denyMemberRequestMutation, { data, loading, error }] = useDenyMemberRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDenyMemberRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DenyMemberRequestMutation,
    DenyMemberRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DenyMemberRequestMutation,
    DenyMemberRequestMutationVariables
  >(DenyMemberRequestDocument, options);
}
export type DenyMemberRequestMutationHookResult = ReturnType<
  typeof useDenyMemberRequestMutation
>;
export type DenyMemberRequestMutationResult =
  Apollo.MutationResult<DenyMemberRequestMutation>;
export type DenyMemberRequestMutationOptions = Apollo.BaseMutationOptions<
  DenyMemberRequestMutation,
  DenyMemberRequestMutationVariables
>;
export const LeaveGroupDocument = gql`
  mutation LeaveGroup($id: Int!) {
    leaveGroup(id: $id)
  }
`;
export type LeaveGroupMutationFn = Apollo.MutationFunction<
  LeaveGroupMutation,
  LeaveGroupMutationVariables
>;

/**
 * __useLeaveGroupMutation__
 *
 * To run a mutation, you first call `useLeaveGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveGroupMutation, { data, loading, error }] = useLeaveGroupMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useLeaveGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LeaveGroupMutation,
    LeaveGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LeaveGroupMutation, LeaveGroupMutationVariables>(
    LeaveGroupDocument,
    options
  );
}
export type LeaveGroupMutationHookResult = ReturnType<
  typeof useLeaveGroupMutation
>;
export type LeaveGroupMutationResult =
  Apollo.MutationResult<LeaveGroupMutation>;
export type LeaveGroupMutationOptions = Apollo.BaseMutationOptions<
  LeaveGroupMutation,
  LeaveGroupMutationVariables
>;
export const UpdateGroupDocument = gql`
  mutation UpdateGroup($groupData: UpdateGroupInput!) {
    updateGroup(groupData: $groupData) {
      group {
        ...GroupAvatar
        description
      }
    }
  }
  ${GroupAvatarFragmentDoc}
`;
export type UpdateGroupMutationFn = Apollo.MutationFunction<
  UpdateGroupMutation,
  UpdateGroupMutationVariables
>;

/**
 * __useUpdateGroupMutation__
 *
 * To run a mutation, you first call `useUpdateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupMutation, { data, loading, error }] = useUpdateGroupMutation({
 *   variables: {
 *      groupData: // value for 'groupData'
 *   },
 * });
 */
export function useUpdateGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateGroupMutation,
    UpdateGroupMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateGroupMutation, UpdateGroupMutationVariables>(
    UpdateGroupDocument,
    options
  );
}
export type UpdateGroupMutationHookResult = ReturnType<
  typeof useUpdateGroupMutation
>;
export type UpdateGroupMutationResult =
  Apollo.MutationResult<UpdateGroupMutation>;
export type UpdateGroupMutationOptions = Apollo.BaseMutationOptions<
  UpdateGroupMutation,
  UpdateGroupMutationVariables
>;
export const EditGroupDocument = gql`
  query EditGroup($name: String!) {
    group(name: $name) {
      ...GroupForm
    }
  }
  ${GroupFormFragmentDoc}
`;

/**
 * __useEditGroupQuery__
 *
 * To run a query within a React component, call `useEditGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditGroupQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useEditGroupQuery(
  baseOptions: Apollo.QueryHookOptions<EditGroupQuery, EditGroupQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EditGroupQuery, EditGroupQueryVariables>(
    EditGroupDocument,
    options
  );
}
export function useEditGroupLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EditGroupQuery,
    EditGroupQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EditGroupQuery, EditGroupQueryVariables>(
    EditGroupDocument,
    options
  );
}
export type EditGroupQueryHookResult = ReturnType<typeof useEditGroupQuery>;
export type EditGroupLazyQueryHookResult = ReturnType<
  typeof useEditGroupLazyQuery
>;
export type EditGroupQueryResult = Apollo.QueryResult<
  EditGroupQuery,
  EditGroupQueryVariables
>;
export const GroupMembersDocument = gql`
  query GroupMembers($name: String!) {
    group(name: $name) {
      id
      members {
        ...GroupMember
      }
    }
  }
  ${GroupMemberFragmentDoc}
`;

/**
 * __useGroupMembersQuery__
 *
 * To run a query within a React component, call `useGroupMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupMembersQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGroupMembersQuery(
  baseOptions: Apollo.QueryHookOptions<
    GroupMembersQuery,
    GroupMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GroupMembersQuery, GroupMembersQueryVariables>(
    GroupMembersDocument,
    options
  );
}
export function useGroupMembersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupMembersQuery,
    GroupMembersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GroupMembersQuery, GroupMembersQueryVariables>(
    GroupMembersDocument,
    options
  );
}
export type GroupMembersQueryHookResult = ReturnType<
  typeof useGroupMembersQuery
>;
export type GroupMembersLazyQueryHookResult = ReturnType<
  typeof useGroupMembersLazyQuery
>;
export type GroupMembersQueryResult = Apollo.QueryResult<
  GroupMembersQuery,
  GroupMembersQueryVariables
>;
export const GroupProfileDocument = gql`
  query GroupProfile($name: String!) {
    group(name: $name) {
      ...GroupProfileCard
      feed {
        ...FeedItem
      }
    }
    me {
      id
      ...ToggleForms
    }
  }
  ${GroupProfileCardFragmentDoc}
  ${FeedItemFragmentDoc}
  ${ToggleFormsFragmentDoc}
`;

/**
 * __useGroupProfileQuery__
 *
 * To run a query within a React component, call `useGroupProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupProfileQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGroupProfileQuery(
  baseOptions: Apollo.QueryHookOptions<
    GroupProfileQuery,
    GroupProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GroupProfileQuery, GroupProfileQueryVariables>(
    GroupProfileDocument,
    options
  );
}
export function useGroupProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupProfileQuery,
    GroupProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GroupProfileQuery, GroupProfileQueryVariables>(
    GroupProfileDocument,
    options
  );
}
export type GroupProfileQueryHookResult = ReturnType<
  typeof useGroupProfileQuery
>;
export type GroupProfileLazyQueryHookResult = ReturnType<
  typeof useGroupProfileLazyQuery
>;
export type GroupProfileQueryResult = Apollo.QueryResult<
  GroupProfileQuery,
  GroupProfileQueryVariables
>;
export const GroupsDocument = gql`
  query Groups {
    groups {
      ...GroupCard
    }
    me {
      id
    }
  }
  ${GroupCardFragmentDoc}
`;

/**
 * __useGroupsQuery__
 *
 * To run a query within a React component, call `useGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGroupsQuery(
  baseOptions?: Apollo.QueryHookOptions<GroupsQuery, GroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GroupsQuery, GroupsQueryVariables>(
    GroupsDocument,
    options
  );
}
export function useGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GroupsQuery, GroupsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GroupsQuery, GroupsQueryVariables>(
    GroupsDocument,
    options
  );
}
export type GroupsQueryHookResult = ReturnType<typeof useGroupsQuery>;
export type GroupsLazyQueryHookResult = ReturnType<typeof useGroupsLazyQuery>;
export type GroupsQueryResult = Apollo.QueryResult<
  GroupsQuery,
  GroupsQueryVariables
>;
export const MemberRequestDocument = gql`
  query MemberRequest($groupId: Int!) {
    memberRequest(groupId: $groupId) {
      id
      user {
        id
      }
    }
  }
`;

/**
 * __useMemberRequestQuery__
 *
 * To run a query within a React component, call `useMemberRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberRequestQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useMemberRequestQuery(
  baseOptions: Apollo.QueryHookOptions<
    MemberRequestQuery,
    MemberRequestQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MemberRequestQuery, MemberRequestQueryVariables>(
    MemberRequestDocument,
    options
  );
}
export function useMemberRequestLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MemberRequestQuery,
    MemberRequestQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MemberRequestQuery, MemberRequestQueryVariables>(
    MemberRequestDocument,
    options
  );
}
export type MemberRequestQueryHookResult = ReturnType<
  typeof useMemberRequestQuery
>;
export type MemberRequestLazyQueryHookResult = ReturnType<
  typeof useMemberRequestLazyQuery
>;
export type MemberRequestQueryResult = Apollo.QueryResult<
  MemberRequestQuery,
  MemberRequestQueryVariables
>;
export const MemberRequestsDocument = gql`
  query MemberRequests($groupName: String!) {
    memberRequests(groupName: $groupName) {
      ...RequestToJoin
    }
  }
  ${RequestToJoinFragmentDoc}
`;

/**
 * __useMemberRequestsQuery__
 *
 * To run a query within a React component, call `useMemberRequestsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberRequestsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberRequestsQuery({
 *   variables: {
 *      groupName: // value for 'groupName'
 *   },
 * });
 */
export function useMemberRequestsQuery(
  baseOptions: Apollo.QueryHookOptions<
    MemberRequestsQuery,
    MemberRequestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MemberRequestsQuery, MemberRequestsQueryVariables>(
    MemberRequestsDocument,
    options
  );
}
export function useMemberRequestsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    MemberRequestsQuery,
    MemberRequestsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MemberRequestsQuery, MemberRequestsQueryVariables>(
    MemberRequestsDocument,
    options
  );
}
export type MemberRequestsQueryHookResult = ReturnType<
  typeof useMemberRequestsQuery
>;
export type MemberRequestsLazyQueryHookResult = ReturnType<
  typeof useMemberRequestsLazyQuery
>;
export type MemberRequestsQueryResult = Apollo.QueryResult<
  MemberRequestsQuery,
  MemberRequestsQueryVariables
>;
export const DeleteImageDocument = gql`
  mutation DeleteImage($id: Int!) {
    deleteImage(id: $id)
  }
`;
export type DeleteImageMutationFn = Apollo.MutationFunction<
  DeleteImageMutation,
  DeleteImageMutationVariables
>;

/**
 * __useDeleteImageMutation__
 *
 * To run a mutation, you first call `useDeleteImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteImageMutation, { data, loading, error }] = useDeleteImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteImageMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteImageMutation,
    DeleteImageMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteImageMutation, DeleteImageMutationVariables>(
    DeleteImageDocument,
    options
  );
}
export type DeleteImageMutationHookResult = ReturnType<
  typeof useDeleteImageMutation
>;
export type DeleteImageMutationResult =
  Apollo.MutationResult<DeleteImageMutation>;
export type DeleteImageMutationOptions = Apollo.BaseMutationOptions<
  DeleteImageMutation,
  DeleteImageMutationVariables
>;
export const CreateServerInviteDocument = gql`
  mutation CreateServerInvite($serverInviteData: CreateServerInviteInput!) {
    createServerInvite(serverInviteData: $serverInviteData) {
      serverInvite {
        ...ServerInviteRow
      }
    }
  }
  ${ServerInviteRowFragmentDoc}
`;
export type CreateServerInviteMutationFn = Apollo.MutationFunction<
  CreateServerInviteMutation,
  CreateServerInviteMutationVariables
>;

/**
 * __useCreateServerInviteMutation__
 *
 * To run a mutation, you first call `useCreateServerInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServerInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServerInviteMutation, { data, loading, error }] = useCreateServerInviteMutation({
 *   variables: {
 *      serverInviteData: // value for 'serverInviteData'
 *   },
 * });
 */
export function useCreateServerInviteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateServerInviteMutation,
    CreateServerInviteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateServerInviteMutation,
    CreateServerInviteMutationVariables
  >(CreateServerInviteDocument, options);
}
export type CreateServerInviteMutationHookResult = ReturnType<
  typeof useCreateServerInviteMutation
>;
export type CreateServerInviteMutationResult =
  Apollo.MutationResult<CreateServerInviteMutation>;
export type CreateServerInviteMutationOptions = Apollo.BaseMutationOptions<
  CreateServerInviteMutation,
  CreateServerInviteMutationVariables
>;
export const DeleteServerInviteDocument = gql`
  mutation DeleteServerInvite($id: Int!) {
    deleteServerInvite(id: $id)
  }
`;
export type DeleteServerInviteMutationFn = Apollo.MutationFunction<
  DeleteServerInviteMutation,
  DeleteServerInviteMutationVariables
>;

/**
 * __useDeleteServerInviteMutation__
 *
 * To run a mutation, you first call `useDeleteServerInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServerInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServerInviteMutation, { data, loading, error }] = useDeleteServerInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteServerInviteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteServerInviteMutation,
    DeleteServerInviteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteServerInviteMutation,
    DeleteServerInviteMutationVariables
  >(DeleteServerInviteDocument, options);
}
export type DeleteServerInviteMutationHookResult = ReturnType<
  typeof useDeleteServerInviteMutation
>;
export type DeleteServerInviteMutationResult =
  Apollo.MutationResult<DeleteServerInviteMutation>;
export type DeleteServerInviteMutationOptions = Apollo.BaseMutationOptions<
  DeleteServerInviteMutation,
  DeleteServerInviteMutationVariables
>;
export const ServerInviteDocument = gql`
  query ServerInvite($token: String!) {
    serverInvite(token: $token) {
      id
      token
    }
  }
`;

/**
 * __useServerInviteQuery__
 *
 * To run a query within a React component, call `useServerInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerInviteQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useServerInviteQuery(
  baseOptions: Apollo.QueryHookOptions<
    ServerInviteQuery,
    ServerInviteQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ServerInviteQuery, ServerInviteQueryVariables>(
    ServerInviteDocument,
    options
  );
}
export function useServerInviteLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ServerInviteQuery,
    ServerInviteQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ServerInviteQuery, ServerInviteQueryVariables>(
    ServerInviteDocument,
    options
  );
}
export type ServerInviteQueryHookResult = ReturnType<
  typeof useServerInviteQuery
>;
export type ServerInviteLazyQueryHookResult = ReturnType<
  typeof useServerInviteLazyQuery
>;
export type ServerInviteQueryResult = Apollo.QueryResult<
  ServerInviteQuery,
  ServerInviteQueryVariables
>;
export const ServerInvitesDocument = gql`
  query ServerInvites {
    serverInvites {
      ...ServerInviteRow
    }
    me {
      id
      serverPermissions
    }
  }
  ${ServerInviteRowFragmentDoc}
`;

/**
 * __useServerInvitesQuery__
 *
 * To run a query within a React component, call `useServerInvitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerInvitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerInvitesQuery({
 *   variables: {
 *   },
 * });
 */
export function useServerInvitesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ServerInvitesQuery,
    ServerInvitesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ServerInvitesQuery, ServerInvitesQueryVariables>(
    ServerInvitesDocument,
    options
  );
}
export function useServerInvitesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ServerInvitesQuery,
    ServerInvitesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ServerInvitesQuery, ServerInvitesQueryVariables>(
    ServerInvitesDocument,
    options
  );
}
export type ServerInvitesQueryHookResult = ReturnType<
  typeof useServerInvitesQuery
>;
export type ServerInvitesLazyQueryHookResult = ReturnType<
  typeof useServerInvitesLazyQuery
>;
export type ServerInvitesQueryResult = Apollo.QueryResult<
  ServerInvitesQuery,
  ServerInvitesQueryVariables
>;
export const CreatePostDocument = gql`
  mutation CreatePost($postData: CreatePostInput!) {
    createPost(postData: $postData) {
      post {
        ...PostCard
      }
    }
  }
  ${PostCardFragmentDoc}
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      postData: // value for 'postData'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePostMutation,
    CreatePostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options
  );
}
export type CreatePostMutationHookResult = ReturnType<
  typeof useCreatePostMutation
>;
export type CreatePostMutationResult =
  Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>;
export const DeletePostDocument = gql`
  mutation DeletePost($id: Int!) {
    deletePost(id: $id)
  }
`;
export type DeletePostMutationFn = Apollo.MutationFunction<
  DeletePostMutation,
  DeletePostMutationVariables
>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePostMutation,
    DeletePostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
    options
  );
}
export type DeletePostMutationHookResult = ReturnType<
  typeof useDeletePostMutation
>;
export type DeletePostMutationResult =
  Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
  DeletePostMutation,
  DeletePostMutationVariables
>;
export const UpdatePostDocument = gql`
  mutation UpdatePost($postData: UpdatePostInput!) {
    updatePost(postData: $postData) {
      post {
        ...PostCard
      }
    }
  }
  ${PostCardFragmentDoc}
`;
export type UpdatePostMutationFn = Apollo.MutationFunction<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postData: // value for 'postData'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePostMutation,
    UpdatePostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    options
  );
}
export type UpdatePostMutationHookResult = ReturnType<
  typeof useUpdatePostMutation
>;
export type UpdatePostMutationResult =
  Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
  UpdatePostMutation,
  UpdatePostMutationVariables
>;
export const EditPostDocument = gql`
  query EditPost($id: Int!) {
    post(id: $id) {
      ...PostForm
    }
  }
  ${PostFormFragmentDoc}
`;

/**
 * __useEditPostQuery__
 *
 * To run a query within a React component, call `useEditPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditPostQuery(
  baseOptions: Apollo.QueryHookOptions<EditPostQuery, EditPostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EditPostQuery, EditPostQueryVariables>(
    EditPostDocument,
    options
  );
}
export function useEditPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EditPostQuery,
    EditPostQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EditPostQuery, EditPostQueryVariables>(
    EditPostDocument,
    options
  );
}
export type EditPostQueryHookResult = ReturnType<typeof useEditPostQuery>;
export type EditPostLazyQueryHookResult = ReturnType<
  typeof useEditPostLazyQuery
>;
export type EditPostQueryResult = Apollo.QueryResult<
  EditPostQuery,
  EditPostQueryVariables
>;
export const PostDocument = gql`
  query Post($id: Int!) {
    post(id: $id) {
      ...PostCard
    }
  }
  ${PostCardFragmentDoc}
`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(
  baseOptions: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PostQuery, PostQueryVariables>(PostDocument, options);
}
export function usePostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(
    PostDocument,
    options
  );
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const CreateProposalDocument = gql`
  mutation CreateProposal($proposalData: CreateProposalInput!) {
    createProposal(proposalData: $proposalData) {
      proposal {
        ...ProposalCard
      }
    }
  }
  ${ProposalCardFragmentDoc}
`;
export type CreateProposalMutationFn = Apollo.MutationFunction<
  CreateProposalMutation,
  CreateProposalMutationVariables
>;

/**
 * __useCreateProposalMutation__
 *
 * To run a mutation, you first call `useCreateProposalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProposalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProposalMutation, { data, loading, error }] = useCreateProposalMutation({
 *   variables: {
 *      proposalData: // value for 'proposalData'
 *   },
 * });
 */
export function useCreateProposalMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateProposalMutation,
    CreateProposalMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateProposalMutation,
    CreateProposalMutationVariables
  >(CreateProposalDocument, options);
}
export type CreateProposalMutationHookResult = ReturnType<
  typeof useCreateProposalMutation
>;
export type CreateProposalMutationResult =
  Apollo.MutationResult<CreateProposalMutation>;
export type CreateProposalMutationOptions = Apollo.BaseMutationOptions<
  CreateProposalMutation,
  CreateProposalMutationVariables
>;
export const DeleteProposalDocument = gql`
  mutation DeleteProposal($id: Int!) {
    deleteProposal(id: $id)
  }
`;
export type DeleteProposalMutationFn = Apollo.MutationFunction<
  DeleteProposalMutation,
  DeleteProposalMutationVariables
>;

/**
 * __useDeleteProposalMutation__
 *
 * To run a mutation, you first call `useDeleteProposalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProposalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProposalMutation, { data, loading, error }] = useDeleteProposalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProposalMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteProposalMutation,
    DeleteProposalMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteProposalMutation,
    DeleteProposalMutationVariables
  >(DeleteProposalDocument, options);
}
export type DeleteProposalMutationHookResult = ReturnType<
  typeof useDeleteProposalMutation
>;
export type DeleteProposalMutationResult =
  Apollo.MutationResult<DeleteProposalMutation>;
export type DeleteProposalMutationOptions = Apollo.BaseMutationOptions<
  DeleteProposalMutation,
  DeleteProposalMutationVariables
>;
export const UpdateProposalDocument = gql`
  mutation UpdateProposal($proposalData: UpdateProposalInput!) {
    updateProposal(proposalData: $proposalData) {
      proposal {
        ...ProposalCard
      }
    }
  }
  ${ProposalCardFragmentDoc}
`;
export type UpdateProposalMutationFn = Apollo.MutationFunction<
  UpdateProposalMutation,
  UpdateProposalMutationVariables
>;

/**
 * __useUpdateProposalMutation__
 *
 * To run a mutation, you first call `useUpdateProposalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProposalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProposalMutation, { data, loading, error }] = useUpdateProposalMutation({
 *   variables: {
 *      proposalData: // value for 'proposalData'
 *   },
 * });
 */
export function useUpdateProposalMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateProposalMutation,
    UpdateProposalMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateProposalMutation,
    UpdateProposalMutationVariables
  >(UpdateProposalDocument, options);
}
export type UpdateProposalMutationHookResult = ReturnType<
  typeof useUpdateProposalMutation
>;
export type UpdateProposalMutationResult =
  Apollo.MutationResult<UpdateProposalMutation>;
export type UpdateProposalMutationOptions = Apollo.BaseMutationOptions<
  UpdateProposalMutation,
  UpdateProposalMutationVariables
>;
export const EditProposalDocument = gql`
  query EditProposal($id: Int!) {
    proposal(id: $id) {
      ...ProposalForm
    }
  }
  ${ProposalFormFragmentDoc}
`;

/**
 * __useEditProposalQuery__
 *
 * To run a query within a React component, call `useEditProposalQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditProposalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditProposalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditProposalQuery(
  baseOptions: Apollo.QueryHookOptions<
    EditProposalQuery,
    EditProposalQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EditProposalQuery, EditProposalQueryVariables>(
    EditProposalDocument,
    options
  );
}
export function useEditProposalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EditProposalQuery,
    EditProposalQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EditProposalQuery, EditProposalQueryVariables>(
    EditProposalDocument,
    options
  );
}
export type EditProposalQueryHookResult = ReturnType<
  typeof useEditProposalQuery
>;
export type EditProposalLazyQueryHookResult = ReturnType<
  typeof useEditProposalLazyQuery
>;
export type EditProposalQueryResult = Apollo.QueryResult<
  EditProposalQuery,
  EditProposalQueryVariables
>;
export const ProposalDocument = gql`
  query Proposal($id: Int!) {
    proposal(id: $id) {
      ...ProposalCard
    }
  }
  ${ProposalCardFragmentDoc}
`;

/**
 * __useProposalQuery__
 *
 * To run a query within a React component, call `useProposalQuery` and pass it any options that fit your needs.
 * When your component renders, `useProposalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProposalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProposalQuery(
  baseOptions: Apollo.QueryHookOptions<ProposalQuery, ProposalQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ProposalQuery, ProposalQueryVariables>(
    ProposalDocument,
    options
  );
}
export function useProposalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ProposalQuery,
    ProposalQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ProposalQuery, ProposalQueryVariables>(
    ProposalDocument,
    options
  );
}
export type ProposalQueryHookResult = ReturnType<typeof useProposalQuery>;
export type ProposalLazyQueryHookResult = ReturnType<
  typeof useProposalLazyQuery
>;
export type ProposalQueryResult = Apollo.QueryResult<
  ProposalQuery,
  ProposalQueryVariables
>;
export const CreateRoleDocument = gql`
  mutation CreateRole($roleData: CreateRoleInput!) {
    createRole(roleData: $roleData) {
      role {
        ...Role
      }
    }
  }
  ${RoleFragmentDoc}
`;
export type CreateRoleMutationFn = Apollo.MutationFunction<
  CreateRoleMutation,
  CreateRoleMutationVariables
>;

/**
 * __useCreateRoleMutation__
 *
 * To run a mutation, you first call `useCreateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRoleMutation, { data, loading, error }] = useCreateRoleMutation({
 *   variables: {
 *      roleData: // value for 'roleData'
 *   },
 * });
 */
export function useCreateRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateRoleMutation,
    CreateRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateRoleMutation, CreateRoleMutationVariables>(
    CreateRoleDocument,
    options
  );
}
export type CreateRoleMutationHookResult = ReturnType<
  typeof useCreateRoleMutation
>;
export type CreateRoleMutationResult =
  Apollo.MutationResult<CreateRoleMutation>;
export type CreateRoleMutationOptions = Apollo.BaseMutationOptions<
  CreateRoleMutation,
  CreateRoleMutationVariables
>;
export const DeleteRoleDocument = gql`
  mutation DeleteRole($id: Int!) {
    deleteRole(id: $id)
  }
`;
export type DeleteRoleMutationFn = Apollo.MutationFunction<
  DeleteRoleMutation,
  DeleteRoleMutationVariables
>;

/**
 * __useDeleteRoleMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoleMutation, { data, loading, error }] = useDeleteRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteRoleMutation,
    DeleteRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteRoleMutation, DeleteRoleMutationVariables>(
    DeleteRoleDocument,
    options
  );
}
export type DeleteRoleMutationHookResult = ReturnType<
  typeof useDeleteRoleMutation
>;
export type DeleteRoleMutationResult =
  Apollo.MutationResult<DeleteRoleMutation>;
export type DeleteRoleMutationOptions = Apollo.BaseMutationOptions<
  DeleteRoleMutation,
  DeleteRoleMutationVariables
>;
export const DeleteRoleMemberDocument = gql`
  mutation DeleteRoleMember($id: Int!) {
    deleteRoleMember(id: $id) {
      role {
        availableUsersToAdd {
          ...UserAvatar
        }
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
export type DeleteRoleMemberMutationFn = Apollo.MutationFunction<
  DeleteRoleMemberMutation,
  DeleteRoleMemberMutationVariables
>;

/**
 * __useDeleteRoleMemberMutation__
 *
 * To run a mutation, you first call `useDeleteRoleMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteRoleMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteRoleMemberMutation, { data, loading, error }] = useDeleteRoleMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteRoleMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteRoleMemberMutation,
    DeleteRoleMemberMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteRoleMemberMutation,
    DeleteRoleMemberMutationVariables
  >(DeleteRoleMemberDocument, options);
}
export type DeleteRoleMemberMutationHookResult = ReturnType<
  typeof useDeleteRoleMemberMutation
>;
export type DeleteRoleMemberMutationResult =
  Apollo.MutationResult<DeleteRoleMemberMutation>;
export type DeleteRoleMemberMutationOptions = Apollo.BaseMutationOptions<
  DeleteRoleMemberMutation,
  DeleteRoleMemberMutationVariables
>;
export const UpdateRoleDocument = gql`
  mutation UpdateRole($roleData: UpdateRoleInput!) {
    updateRole(roleData: $roleData) {
      role {
        ...Role
        permissions {
          ...PermissionsForm
        }
        members {
          ...RoleMember
        }
        availableUsersToAdd {
          ...UserAvatar
        }
      }
      me {
        id
        serverPermissions
      }
    }
  }
  ${RoleFragmentDoc}
  ${PermissionsFormFragmentDoc}
  ${RoleMemberFragmentDoc}
  ${UserAvatarFragmentDoc}
`;
export type UpdateRoleMutationFn = Apollo.MutationFunction<
  UpdateRoleMutation,
  UpdateRoleMutationVariables
>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      roleData: // value for 'roleData'
 *   },
 * });
 */
export function useUpdateRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateRoleMutation,
    UpdateRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(
    UpdateRoleDocument,
    options
  );
}
export type UpdateRoleMutationHookResult = ReturnType<
  typeof useUpdateRoleMutation
>;
export type UpdateRoleMutationResult =
  Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<
  UpdateRoleMutation,
  UpdateRoleMutationVariables
>;
export const EditServerRoleDocument = gql`
  query EditServerRole($id: Int!) {
    role(id: $id) {
      ...Role
      ...AddMemberTab
      permissions {
        ...PermissionsForm
      }
      availableUsersToAdd {
        ...UserAvatar
      }
    }
  }
  ${RoleFragmentDoc}
  ${AddMemberTabFragmentDoc}
  ${PermissionsFormFragmentDoc}
  ${UserAvatarFragmentDoc}
`;

/**
 * __useEditServerRoleQuery__
 *
 * To run a query within a React component, call `useEditServerRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditServerRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditServerRoleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditServerRoleQuery(
  baseOptions: Apollo.QueryHookOptions<
    EditServerRoleQuery,
    EditServerRoleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EditServerRoleQuery, EditServerRoleQueryVariables>(
    EditServerRoleDocument,
    options
  );
}
export function useEditServerRoleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EditServerRoleQuery,
    EditServerRoleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EditServerRoleQuery, EditServerRoleQueryVariables>(
    EditServerRoleDocument,
    options
  );
}
export type EditServerRoleQueryHookResult = ReturnType<
  typeof useEditServerRoleQuery
>;
export type EditServerRoleLazyQueryHookResult = ReturnType<
  typeof useEditServerRoleLazyQuery
>;
export type EditServerRoleQueryResult = Apollo.QueryResult<
  EditServerRoleQuery,
  EditServerRoleQueryVariables
>;
export const ServerRolesDocument = gql`
  query ServerRoles {
    serverRoles {
      ...Role
    }
  }
  ${RoleFragmentDoc}
`;

/**
 * __useServerRolesQuery__
 *
 * To run a query within a React component, call `useServerRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerRolesQuery({
 *   variables: {
 *   },
 * });
 */
export function useServerRolesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    ServerRolesQuery,
    ServerRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ServerRolesQuery, ServerRolesQueryVariables>(
    ServerRolesDocument,
    options
  );
}
export function useServerRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ServerRolesQuery,
    ServerRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ServerRolesQuery, ServerRolesQueryVariables>(
    ServerRolesDocument,
    options
  );
}
export type ServerRolesQueryHookResult = ReturnType<typeof useServerRolesQuery>;
export type ServerRolesLazyQueryHookResult = ReturnType<
  typeof useServerRolesLazyQuery
>;
export type ServerRolesQueryResult = Apollo.QueryResult<
  ServerRolesQuery,
  ServerRolesQueryVariables
>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($userData: UpdateUserInput!) {
    updateUser(userData: $userData) {
      user {
        id
        name
        bio
        profilePicture {
          id
        }
        coverPhoto {
          id
        }
      }
    }
  }
`;
export type UpdateUserMutationFn = Apollo.MutationFunction<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userData: // value for 'userData'
 *   },
 * });
 */
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserMutation,
    UpdateUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(
    UpdateUserDocument,
    options
  );
}
export type UpdateUserMutationHookResult = ReturnType<
  typeof useUpdateUserMutation
>;
export type UpdateUserMutationResult =
  Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserMutation,
  UpdateUserMutationVariables
>;
export const EditUserDocument = gql`
  query EditUser($name: String) {
    user(name: $name) {
      ...UserProfileCard
      posts {
        ...PostCard
      }
    }
  }
  ${UserProfileCardFragmentDoc}
  ${PostCardFragmentDoc}
`;

/**
 * __useEditUserQuery__
 *
 * To run a query within a React component, call `useEditUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditUserQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useEditUserQuery(
  baseOptions?: Apollo.QueryHookOptions<EditUserQuery, EditUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EditUserQuery, EditUserQueryVariables>(
    EditUserDocument,
    options
  );
}
export function useEditUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EditUserQuery,
    EditUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EditUserQuery, EditUserQueryVariables>(
    EditUserDocument,
    options
  );
}
export type EditUserQueryHookResult = ReturnType<typeof useEditUserQuery>;
export type EditUserLazyQueryHookResult = ReturnType<
  typeof useEditUserLazyQuery
>;
export type EditUserQueryResult = Apollo.QueryResult<
  EditUserQuery,
  EditUserQueryVariables
>;
export const HomePageDocument = gql`
  query HomePage {
    me {
      id
      homeFeed {
        ...FeedItem
      }
      ...ToggleForms
    }
  }
  ${FeedItemFragmentDoc}
  ${ToggleFormsFragmentDoc}
`;

/**
 * __useHomePageQuery__
 *
 * To run a query within a React component, call `useHomePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomePageQuery(
  baseOptions?: Apollo.QueryHookOptions<HomePageQuery, HomePageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HomePageQuery, HomePageQueryVariables>(
    HomePageDocument,
    options
  );
}
export function useHomePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomePageQuery,
    HomePageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HomePageQuery, HomePageQueryVariables>(
    HomePageDocument,
    options
  );
}
export type HomePageQueryHookResult = ReturnType<typeof useHomePageQuery>;
export type HomePageLazyQueryHookResult = ReturnType<
  typeof useHomePageLazyQuery
>;
export type HomePageQueryResult = Apollo.QueryResult<
  HomePageQuery,
  HomePageQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      ...UserAvatar
      serverPermissions
      joinedGroups {
        id
        name
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UserProfileDocument = gql`
  query UserProfile($name: String) {
    user(name: $name) {
      ...UserProfileCard
      profileFeed {
        ...FeedItem
      }
    }
    me {
      id
      ...ToggleForms
    }
  }
  ${UserProfileCardFragmentDoc}
  ${FeedItemFragmentDoc}
  ${ToggleFormsFragmentDoc}
`;

/**
 * __useUserProfileQuery__
 *
 * To run a query within a React component, call `useUserProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProfileQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUserProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserProfileQuery,
    UserProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserProfileQuery, UserProfileQueryVariables>(
    UserProfileDocument,
    options
  );
}
export function useUserProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserProfileQuery,
    UserProfileQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserProfileQuery, UserProfileQueryVariables>(
    UserProfileDocument,
    options
  );
}
export type UserProfileQueryHookResult = ReturnType<typeof useUserProfileQuery>;
export type UserProfileLazyQueryHookResult = ReturnType<
  typeof useUserProfileLazyQuery
>;
export type UserProfileQueryResult = Apollo.QueryResult<
  UserProfileQuery,
  UserProfileQueryVariables
>;
export const UsersDocument = gql`
  query Users {
    users {
      id
      name
    }
  }
`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export function useUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(
    UsersDocument,
    options
  );
}
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<
  UsersQuery,
  UsersQueryVariables
>;
export const CreateVoteDocument = gql`
  mutation CreateVote($voteData: CreateVoteInput!) {
    createVote(voteData: $voteData) {
      vote {
        id
        voteType
        proposal {
          id
          stage
          action {
            id
            actionType
          }
          group {
            id
            name
            description
          }
        }
      }
    }
  }
`;
export type CreateVoteMutationFn = Apollo.MutationFunction<
  CreateVoteMutation,
  CreateVoteMutationVariables
>;

/**
 * __useCreateVoteMutation__
 *
 * To run a mutation, you first call `useCreateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVoteMutation, { data, loading, error }] = useCreateVoteMutation({
 *   variables: {
 *      voteData: // value for 'voteData'
 *   },
 * });
 */
export function useCreateVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateVoteMutation,
    CreateVoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateVoteMutation, CreateVoteMutationVariables>(
    CreateVoteDocument,
    options
  );
}
export type CreateVoteMutationHookResult = ReturnType<
  typeof useCreateVoteMutation
>;
export type CreateVoteMutationResult =
  Apollo.MutationResult<CreateVoteMutation>;
export type CreateVoteMutationOptions = Apollo.BaseMutationOptions<
  CreateVoteMutation,
  CreateVoteMutationVariables
>;
export const DeleteVoteDocument = gql`
  mutation DeleteVote($id: Int!) {
    deleteVote(id: $id)
  }
`;
export type DeleteVoteMutationFn = Apollo.MutationFunction<
  DeleteVoteMutation,
  DeleteVoteMutationVariables
>;

/**
 * __useDeleteVoteMutation__
 *
 * To run a mutation, you first call `useDeleteVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteVoteMutation, { data, loading, error }] = useDeleteVoteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteVoteMutation,
    DeleteVoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteVoteMutation, DeleteVoteMutationVariables>(
    DeleteVoteDocument,
    options
  );
}
export type DeleteVoteMutationHookResult = ReturnType<
  typeof useDeleteVoteMutation
>;
export type DeleteVoteMutationResult =
  Apollo.MutationResult<DeleteVoteMutation>;
export type DeleteVoteMutationOptions = Apollo.BaseMutationOptions<
  DeleteVoteMutation,
  DeleteVoteMutationVariables
>;
export const UpdateVoteDocument = gql`
  mutation UpdateVote($voteData: UpdateVoteInput!) {
    updateVote(voteData: $voteData) {
      vote {
        id
        voteType
        proposal {
          id
          stage
          action {
            id
            actionType
          }
          group {
            id
            name
            description
          }
        }
      }
    }
  }
`;
export type UpdateVoteMutationFn = Apollo.MutationFunction<
  UpdateVoteMutation,
  UpdateVoteMutationVariables
>;

/**
 * __useUpdateVoteMutation__
 *
 * To run a mutation, you first call `useUpdateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVoteMutation, { data, loading, error }] = useUpdateVoteMutation({
 *   variables: {
 *      voteData: // value for 'voteData'
 *   },
 * });
 */
export function useUpdateVoteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateVoteMutation,
    UpdateVoteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateVoteMutation, UpdateVoteMutationVariables>(
    UpdateVoteDocument,
    options
  );
}
export type UpdateVoteMutationHookResult = ReturnType<
  typeof useUpdateVoteMutation
>;
export type UpdateVoteMutationResult =
  Apollo.MutationResult<UpdateVoteMutation>;
export type UpdateVoteMutationOptions = Apollo.BaseMutationOptions<
  UpdateVoteMutation,
  UpdateVoteMutationVariables
>;
