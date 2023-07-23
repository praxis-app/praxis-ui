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

export type ApproveGroupMemberRequestPayload = {
  __typename?: "ApproveGroupMemberRequestPayload";
  groupMember: User;
};

export type CreateEventAttendeeInput = {
  eventId: Scalars["Int"];
  status: Scalars["String"];
};

export type CreateEventAttendeePayload = {
  __typename?: "CreateEventAttendeePayload";
  event: Event;
};

export type CreateEventInput = {
  coverPhoto?: InputMaybe<Scalars["Upload"]>;
  description: Scalars["String"];
  endsAt?: InputMaybe<Scalars["DateTime"]>;
  externalLink?: InputMaybe<Scalars["String"]>;
  groupId?: InputMaybe<Scalars["Int"]>;
  location?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  online?: InputMaybe<Scalars["Boolean"]>;
  startsAt: Scalars["DateTime"];
};

export type CreateEventPayload = {
  __typename?: "CreateEventPayload";
  event: Event;
};

export type CreateGroupInput = {
  coverPhoto?: InputMaybe<Scalars["Upload"]>;
  description: Scalars["String"];
  name: Scalars["String"];
};

export type CreateGroupMemberRequestPayload = {
  __typename?: "CreateGroupMemberRequestPayload";
  groupMemberRequest: GroupMemberRequest;
};

export type CreateGroupPayload = {
  __typename?: "CreateGroupPayload";
  group: Group;
};

export type CreateGroupRoleInput = {
  color: Scalars["String"];
  groupId: Scalars["Int"];
  name: Scalars["String"];
};

export type CreateGroupRolePayload = {
  __typename?: "CreateGroupRolePayload";
  groupRole: GroupRole;
};

export type CreateLikeInput = {
  postId?: InputMaybe<Scalars["Int"]>;
};

export type CreateLikePayload = {
  __typename?: "CreateLikePayload";
  like: Like;
};

export type CreatePostInput = {
  body?: InputMaybe<Scalars["String"]>;
  eventId?: InputMaybe<Scalars["Int"]>;
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

export type CreateServerInviteInput = {
  expiresAt?: InputMaybe<Scalars["DateTime"]>;
  maxUses?: InputMaybe<Scalars["Int"]>;
};

export type CreateServerInvitePayload = {
  __typename?: "CreateServerInvitePayload";
  serverInvite: ServerInvite;
};

export type CreateServerRoleInput = {
  color: Scalars["String"];
  name: Scalars["String"];
};

export type CreateServerRolePayload = {
  __typename?: "CreateServerRolePayload";
  serverRole: ServerRole;
};

export type CreateVoteInput = {
  proposalId: Scalars["Int"];
  voteType: Scalars["String"];
};

export type CreateVotePayload = {
  __typename?: "CreateVotePayload";
  vote: Vote;
};

export type DeleteGroupRoleMemberInput = {
  groupRoleId: Scalars["Int"];
  userId: Scalars["Int"];
};

export type DeleteGroupRoleMemberPayload = {
  __typename?: "DeleteGroupRoleMemberPayload";
  groupRole: GroupRole;
};

export type DeleteLikeInput = {
  postId?: InputMaybe<Scalars["Int"]>;
};

export type DeleteServerRoleMemberInput = {
  serverRoleId: Scalars["Int"];
  userId: Scalars["Int"];
};

export type DeleteServerRoleMemberPayload = {
  __typename?: "DeleteServerRoleMemberPayload";
  me: User;
  serverRole: ServerRole;
};

export type Event = {
  __typename?: "Event";
  attendees: Array<EventAttendee>;
  attendingStatus?: Maybe<Scalars["String"]>;
  coverPhoto: Image;
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  endsAt?: Maybe<Scalars["DateTime"]>;
  externalLink?: Maybe<Scalars["String"]>;
  goingCount: Scalars["Int"];
  group?: Maybe<Group>;
  id: Scalars["Int"];
  images: Array<Image>;
  interestedCount: Scalars["Int"];
  location?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  online: Scalars["Boolean"];
  posts: Array<Post>;
  startsAt: Scalars["DateTime"];
  updatedAt: Scalars["DateTime"];
};

export type EventAttendee = {
  __typename?: "EventAttendee";
  createdAt: Scalars["DateTime"];
  event: Event;
  id: Scalars["Int"];
  status: Scalars["String"];
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type EventsInput = {
  online?: InputMaybe<Scalars["Boolean"]>;
  timeFrame?: InputMaybe<Scalars["String"]>;
};

export type FeedItem = Post | Proposal;

export type FollowUserPayload = {
  __typename?: "FollowUserPayload";
  followedUser: User;
  follower: User;
};

export type Group = {
  __typename?: "Group";
  coverPhoto?: Maybe<Image>;
  createdAt: Scalars["DateTime"];
  description: Scalars["String"];
  feed: Array<FeedItem>;
  futureEvents: Array<Event>;
  id: Scalars["Int"];
  isJoinedByMe: Scalars["Boolean"];
  memberCount: Scalars["Int"];
  memberRequestCount?: Maybe<Scalars["Int"]>;
  memberRequests?: Maybe<Array<GroupMemberRequest>>;
  members: Array<User>;
  myPermissions: GroupPermissions;
  name: Scalars["String"];
  pastEvents: Array<Event>;
  posts: Array<Post>;
  proposals: Array<Proposal>;
  roles: Array<GroupRole>;
  settings: GroupConfig;
  updatedAt: Scalars["DateTime"];
};

export type GroupConfig = {
  __typename?: "GroupConfig";
  createdAt: Scalars["DateTime"];
  group: Group;
  id: Scalars["Int"];
  isPublic: Scalars["Boolean"];
  updatedAt: Scalars["DateTime"];
};

export type GroupMemberRequest = {
  __typename?: "GroupMemberRequest";
  createdAt: Scalars["DateTime"];
  group: Group;
  id: Scalars["Int"];
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type GroupPermissions = {
  __typename?: "GroupPermissions";
  approveMemberRequests: Scalars["Boolean"];
  createEvents: Scalars["Boolean"];
  deleteGroup: Scalars["Boolean"];
  manageComments: Scalars["Boolean"];
  manageEvents: Scalars["Boolean"];
  managePosts: Scalars["Boolean"];
  manageRoles: Scalars["Boolean"];
  manageSettings: Scalars["Boolean"];
  removeMembers: Scalars["Boolean"];
  updateGroup: Scalars["Boolean"];
};

export type GroupRole = {
  __typename?: "GroupRole";
  availableUsersToAdd: Array<User>;
  color: Scalars["String"];
  group: Group;
  id: Scalars["Int"];
  memberCount: Scalars["Int"];
  members: Array<User>;
  name: Scalars["String"];
  permissions: GroupRolePermission;
  proposalActionRoles: Array<ProposalActionRole>;
};

export type GroupRolePermission = {
  __typename?: "GroupRolePermission";
  approveMemberRequests: Scalars["Boolean"];
  createEvents: Scalars["Boolean"];
  deleteGroup: Scalars["Boolean"];
  groupRole: GroupRole;
  id: Scalars["Int"];
  manageComments: Scalars["Boolean"];
  manageEvents: Scalars["Boolean"];
  managePosts: Scalars["Boolean"];
  manageRoles: Scalars["Boolean"];
  manageSettings: Scalars["Boolean"];
  removeMembers: Scalars["Boolean"];
  updateGroup: Scalars["Boolean"];
};

export type GroupRolePermissionInput = {
  approveMemberRequests?: InputMaybe<Scalars["Boolean"]>;
  createEvents?: InputMaybe<Scalars["Boolean"]>;
  deleteGroup?: InputMaybe<Scalars["Boolean"]>;
  manageComments?: InputMaybe<Scalars["Boolean"]>;
  manageEvents?: InputMaybe<Scalars["Boolean"]>;
  managePosts?: InputMaybe<Scalars["Boolean"]>;
  manageRoles?: InputMaybe<Scalars["Boolean"]>;
  manageSettings?: InputMaybe<Scalars["Boolean"]>;
  removeMembers?: InputMaybe<Scalars["Boolean"]>;
  updateGroup?: InputMaybe<Scalars["Boolean"]>;
};

export type Image = {
  __typename?: "Image";
  createdAt: Scalars["DateTime"];
  event?: Maybe<Event>;
  filename: Scalars["String"];
  group?: Maybe<Group>;
  id: Scalars["Int"];
  imageType: Scalars["String"];
  post?: Maybe<Post>;
  proposal?: Maybe<Proposal>;
  proposalAction?: Maybe<ProposalAction>;
  updatedAt: Scalars["DateTime"];
  user?: Maybe<User>;
};

export type Like = {
  __typename?: "Like";
  createdAt: Scalars["DateTime"];
  id: Scalars["Int"];
  post: Post;
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

export type Mutation = {
  __typename?: "Mutation";
  approveGroupMemberRequest: ApproveGroupMemberRequestPayload;
  cancelGroupMemberRequest: Scalars["Boolean"];
  createEvent: CreateEventPayload;
  createEventAttendee: CreateEventAttendeePayload;
  createGroup: CreateGroupPayload;
  createGroupMemberRequest: CreateGroupMemberRequestPayload;
  createGroupRole: CreateGroupRolePayload;
  createLike: CreateLikePayload;
  createPost: CreatePostPayload;
  createProposal: CreateProposalPayload;
  createServerInvite: CreateServerInvitePayload;
  createServerRole: CreateServerRolePayload;
  createVote: CreateVotePayload;
  deleteEvent: Scalars["Boolean"];
  deleteEventAttendee: Scalars["Boolean"];
  deleteGroup: Scalars["Boolean"];
  deleteGroupRole: Scalars["Boolean"];
  deleteGroupRoleMember: DeleteGroupRoleMemberPayload;
  deleteImage: Scalars["Boolean"];
  deleteLike: Scalars["Boolean"];
  deletePost: Scalars["Boolean"];
  deleteProposal: Scalars["Boolean"];
  deleteServerInvite: Scalars["Boolean"];
  deleteServerRole: Scalars["Boolean"];
  deleteServerRoleMember: DeleteServerRoleMemberPayload;
  deleteUser: Scalars["Boolean"];
  deleteVote: Scalars["Boolean"];
  denyGroupMemberRequest: Scalars["Boolean"];
  followUser: FollowUserPayload;
  leaveGroup: Scalars["Boolean"];
  logOut: Scalars["Boolean"];
  login: LoginPayload;
  refreshToken: Scalars["Boolean"];
  signUp: SignUpPayload;
  unfollowUser: Scalars["Boolean"];
  updateEvent: UpdateEventPayload;
  updateEventAttendee: UpdateEventAttendeePayload;
  updateGroup: UpdateGroupPayload;
  updateGroupConfig: UpdateGroupPayload;
  updateGroupRole: UpdateGroupRolePayload;
  updatePost: UpdatePostPayload;
  updateProposal: UpdateProposalPayload;
  updateServerRole: UpdateServerRolePayload;
  updateUser: UpdateUserPayload;
  updateVote: UpdateVotePayload;
};

export type MutationApproveGroupMemberRequestArgs = {
  id: Scalars["Int"];
};

export type MutationCancelGroupMemberRequestArgs = {
  id: Scalars["Int"];
};

export type MutationCreateEventArgs = {
  eventData: CreateEventInput;
};

export type MutationCreateEventAttendeeArgs = {
  eventAttendeeData: CreateEventAttendeeInput;
};

export type MutationCreateGroupArgs = {
  groupData: CreateGroupInput;
};

export type MutationCreateGroupMemberRequestArgs = {
  groupId: Scalars["Int"];
};

export type MutationCreateGroupRoleArgs = {
  groupRoleData: CreateGroupRoleInput;
};

export type MutationCreateLikeArgs = {
  likeData: CreateLikeInput;
};

export type MutationCreatePostArgs = {
  postData: CreatePostInput;
};

export type MutationCreateProposalArgs = {
  proposalData: CreateProposalInput;
};

export type MutationCreateServerInviteArgs = {
  serverInviteData: CreateServerInviteInput;
};

export type MutationCreateServerRoleArgs = {
  serverRoleData: CreateServerRoleInput;
};

export type MutationCreateVoteArgs = {
  voteData: CreateVoteInput;
};

export type MutationDeleteEventArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteEventAttendeeArgs = {
  eventId: Scalars["Int"];
};

export type MutationDeleteGroupArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteGroupRoleArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteGroupRoleMemberArgs = {
  groupRoleMemberData: DeleteGroupRoleMemberInput;
};

export type MutationDeleteImageArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteLikeArgs = {
  likeData: DeleteLikeInput;
};

export type MutationDeletePostArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteProposalArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteServerInviteArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteServerRoleArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteServerRoleMemberArgs = {
  serverRoleMemberData: DeleteServerRoleMemberInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteVoteArgs = {
  id: Scalars["Int"];
};

export type MutationDenyGroupMemberRequestArgs = {
  id: Scalars["Int"];
};

export type MutationFollowUserArgs = {
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

export type MutationUnfollowUserArgs = {
  id: Scalars["Int"];
};

export type MutationUpdateEventArgs = {
  eventData: UpdateEventInput;
};

export type MutationUpdateEventAttendeeArgs = {
  eventAttendeeData: UpdateEventAttendeeInput;
};

export type MutationUpdateGroupArgs = {
  groupData: UpdateGroupInput;
};

export type MutationUpdateGroupConfigArgs = {
  groupConfigData: UpdateGroupConfigInput;
};

export type MutationUpdateGroupRoleArgs = {
  groupRoleData: UpdateGroupRoleInput;
};

export type MutationUpdatePostArgs = {
  postData: UpdatePostInput;
};

export type MutationUpdateProposalArgs = {
  proposalData: UpdateProposalInput;
};

export type MutationUpdateServerRoleArgs = {
  serverRoleData: UpdateServerRoleInput;
};

export type MutationUpdateUserArgs = {
  userData: UpdateUserInput;
};

export type MutationUpdateVoteArgs = {
  voteData: UpdateVoteInput;
};

export type Post = {
  __typename?: "Post";
  body?: Maybe<Scalars["String"]>;
  createdAt: Scalars["DateTime"];
  event?: Maybe<Event>;
  group?: Maybe<Group>;
  id: Scalars["Int"];
  images: Array<Image>;
  isLikedByMe: Scalars["Boolean"];
  likes: Array<Like>;
  likesCount: Scalars["Int"];
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
  role?: Maybe<ProposalActionRole>;
  updatedAt: Scalars["DateTime"];
};

export type ProposalActionInput = {
  actionType: Scalars["String"];
  groupCoverPhoto?: InputMaybe<Scalars["Upload"]>;
  groupDescription?: InputMaybe<Scalars["String"]>;
  groupName?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<ProposalActionRoleInput>;
};

export type ProposalActionPermission = {
  __typename?: "ProposalActionPermission";
  approveMemberRequests?: Maybe<Scalars["Boolean"]>;
  createEvents?: Maybe<Scalars["Boolean"]>;
  deleteGroup?: Maybe<Scalars["Boolean"]>;
  id: Scalars["Int"];
  manageComments?: Maybe<Scalars["Boolean"]>;
  manageEvents?: Maybe<Scalars["Boolean"]>;
  managePosts?: Maybe<Scalars["Boolean"]>;
  manageRoles?: Maybe<Scalars["Boolean"]>;
  manageSettings?: Maybe<Scalars["Boolean"]>;
  removeMembers?: Maybe<Scalars["Boolean"]>;
  role: ProposalActionRole;
  updateGroup?: Maybe<Scalars["Boolean"]>;
};

export type ProposalActionRole = {
  __typename?: "ProposalActionRole";
  color?: Maybe<Scalars["String"]>;
  groupRole?: Maybe<GroupRole>;
  id: Scalars["Int"];
  members?: Maybe<Array<ProposalActionRoleMember>>;
  name?: Maybe<Scalars["String"]>;
  oldColor?: Maybe<Scalars["String"]>;
  oldName?: Maybe<Scalars["String"]>;
  permissions: ProposalActionPermission;
  proposalAction: ProposalAction;
};

export type ProposalActionRoleInput = {
  color?: InputMaybe<Scalars["String"]>;
  members?: InputMaybe<Array<ProposalActionRoleMemberInput>>;
  name?: InputMaybe<Scalars["String"]>;
  permissions?: InputMaybe<GroupRolePermissionInput>;
  roleToUpdateId?: InputMaybe<Scalars["Int"]>;
};

export type ProposalActionRoleMember = {
  __typename?: "ProposalActionRoleMember";
  changeType: Scalars["String"];
  createdAt: Scalars["DateTime"];
  id: Scalars["Int"];
  role: ProposalActionRole;
  updatedAt: Scalars["DateTime"];
  user: User;
};

export type ProposalActionRoleMemberInput = {
  changeType: Scalars["String"];
  userId: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  authCheck: Scalars["Boolean"];
  event: Event;
  events: Array<Event>;
  group: Group;
  groupMemberRequest?: Maybe<GroupMemberRequest>;
  groupRole: GroupRole;
  groupRoles: Array<GroupRole>;
  groups: Array<Group>;
  isFirstUser: Scalars["Boolean"];
  me: User;
  post: Post;
  proposal: Proposal;
  publicGroups: Array<Group>;
  publicGroupsFeed: Array<FeedItem>;
  serverInvite: ServerInvite;
  serverInvites: Array<ServerInvite>;
  serverRole: ServerRole;
  serverRoles: Array<ServerRole>;
  user: User;
  users: Array<User>;
  usersByIds: Array<User>;
};

export type QueryEventArgs = {
  id?: InputMaybe<Scalars["Int"]>;
};

export type QueryEventsArgs = {
  input: EventsInput;
};

export type QueryGroupArgs = {
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type QueryGroupMemberRequestArgs = {
  groupId: Scalars["Int"];
};

export type QueryGroupRoleArgs = {
  id: Scalars["Int"];
};

export type QueryPostArgs = {
  id: Scalars["Int"];
};

export type QueryProposalArgs = {
  id: Scalars["Int"];
};

export type QueryServerInviteArgs = {
  token: Scalars["String"];
};

export type QueryServerRoleArgs = {
  id: Scalars["Int"];
};

export type QueryUserArgs = {
  id?: InputMaybe<Scalars["Int"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type QueryUsersByIdsArgs = {
  ids: Array<Scalars["Int"]>;
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

export type ServerPermissions = {
  __typename?: "ServerPermissions";
  createInvites: Scalars["Boolean"];
  manageComments: Scalars["Boolean"];
  manageEvents: Scalars["Boolean"];
  manageInvites: Scalars["Boolean"];
  managePosts: Scalars["Boolean"];
  manageRoles: Scalars["Boolean"];
  removeMembers: Scalars["Boolean"];
};

export type ServerRole = {
  __typename?: "ServerRole";
  availableUsersToAdd: Array<User>;
  color: Scalars["String"];
  id: Scalars["Int"];
  memberCount: Scalars["Int"];
  members: Array<User>;
  name: Scalars["String"];
  permissions: ServerRolePermission;
};

export type ServerRolePermission = {
  __typename?: "ServerRolePermission";
  createInvites: Scalars["Boolean"];
  id: Scalars["Int"];
  manageComments: Scalars["Boolean"];
  manageEvents: Scalars["Boolean"];
  manageInvites: Scalars["Boolean"];
  managePosts: Scalars["Boolean"];
  manageRoles: Scalars["Boolean"];
  removeMembers: Scalars["Boolean"];
  serverRole: ServerRole;
};

export type ServerRolePermissionInput = {
  createInvites?: InputMaybe<Scalars["Boolean"]>;
  manageComments?: InputMaybe<Scalars["Boolean"]>;
  manageEvents?: InputMaybe<Scalars["Boolean"]>;
  manageInvites?: InputMaybe<Scalars["Boolean"]>;
  managePosts?: InputMaybe<Scalars["Boolean"]>;
  manageRoles?: InputMaybe<Scalars["Boolean"]>;
  removeMembers?: InputMaybe<Scalars["Boolean"]>;
};

export type SignUpInput = {
  confirmPassword: Scalars["String"];
  email: Scalars["String"];
  inviteToken?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  password: Scalars["String"];
  profilePicture?: InputMaybe<Scalars["Upload"]>;
};

export type SignUpPayload = {
  __typename?: "SignUpPayload";
  user: User;
};

export type UpdateEventAttendeeInput = {
  eventId: Scalars["Int"];
  status: Scalars["String"];
};

export type UpdateEventAttendeePayload = {
  __typename?: "UpdateEventAttendeePayload";
  event: Event;
};

export type UpdateEventInput = {
  coverPhoto?: InputMaybe<Scalars["Upload"]>;
  description: Scalars["String"];
  endsAt?: InputMaybe<Scalars["DateTime"]>;
  externalLink?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  location?: InputMaybe<Scalars["String"]>;
  name: Scalars["String"];
  online?: InputMaybe<Scalars["Boolean"]>;
  startsAt: Scalars["DateTime"];
};

export type UpdateEventPayload = {
  __typename?: "UpdateEventPayload";
  event: Event;
};

export type UpdateGroupConfigInput = {
  groupId: Scalars["Int"];
  privacy?: InputMaybe<Scalars["String"]>;
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

export type UpdateGroupRoleInput = {
  color?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  name?: InputMaybe<Scalars["String"]>;
  permissions?: InputMaybe<GroupRolePermissionInput>;
  selectedUserIds?: InputMaybe<Array<Scalars["Int"]>>;
};

export type UpdateGroupRolePayload = {
  __typename?: "UpdateGroupRolePayload";
  groupRole: GroupRole;
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

export type UpdateServerRoleInput = {
  color?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  name?: InputMaybe<Scalars["String"]>;
  permissions?: InputMaybe<ServerRolePermissionInput>;
  selectedUserIds?: InputMaybe<Array<Scalars["Int"]>>;
};

export type UpdateServerRolePayload = {
  __typename?: "UpdateServerRolePayload";
  me: User;
  serverRole: ServerRole;
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
  followerCount: Scalars["Int"];
  followers: Array<User>;
  following: Array<User>;
  followingCount: Scalars["Int"];
  homeFeed: Array<FeedItem>;
  id: Scalars["Int"];
  isFollowedByMe: Scalars["Boolean"];
  joinedGroups: Array<Group>;
  likes: Array<Like>;
  name: Scalars["String"];
  posts: Array<Post>;
  profileFeed: Array<FeedItem>;
  profilePicture: Image;
  proposals: Array<Proposal>;
  serverPermissions: ServerPermissions;
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
      name: string;
      serverPermissions: {
        __typename?: "ServerPermissions";
        createInvites: boolean;
        manageComments: boolean;
        manageEvents: boolean;
        manageInvites: boolean;
        managePosts: boolean;
        manageRoles: boolean;
        removeMembers: boolean;
      };
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
      name: string;
      serverPermissions: {
        __typename?: "ServerPermissions";
        createInvites: boolean;
        manageComments: boolean;
        manageEvents: boolean;
        manageInvites: boolean;
        managePosts: boolean;
        manageRoles: boolean;
        removeMembers: boolean;
      };
      joinedGroups: Array<{ __typename?: "Group"; id: number; name: string }>;
      profilePicture: { __typename?: "Image"; id: number };
    };
  };
};

export type AuthCheckQueryVariables = Exact<{ [key: string]: never }>;

export type AuthCheckQuery = { __typename?: "Query"; authCheck: boolean };

export type EventAttendeeButtonsFragment = {
  __typename?: "Event";
  id: number;
  attendingStatus?: string | null;
  group?: { __typename?: "Group"; id: number; isJoinedByMe?: boolean } | null;
};

export type EventCompactFragment = {
  __typename?: "Event";
  id: number;
  name: string;
  description: string;
  startsAt: any;
  interestedCount: number;
  goingCount: number;
  online: boolean;
  location?: string | null;
  attendingStatus?: string | null;
  coverPhoto: { __typename?: "Image"; id: number };
  group?: {
    __typename?: "Group";
    id: number;
    isJoinedByMe?: boolean;
    myPermissions?: { __typename?: "GroupPermissions"; manageEvents: boolean };
  } | null;
};

export type EventFormFragment = {
  __typename?: "Event";
  id: number;
  name: string;
  startsAt: any;
  endsAt?: any | null;
  description: string;
  location?: string | null;
  online: boolean;
  externalLink?: string | null;
};

export type EventItemAvatarFragment = {
  __typename?: "Event";
  id: number;
  name: string;
  coverPhoto: { __typename?: "Image"; id: number };
};

export type EventPageCardFragment = {
  __typename?: "Event";
  id: number;
  name: string;
  description: string;
  location?: string | null;
  startsAt: any;
  endsAt?: any | null;
  online: boolean;
  externalLink?: string | null;
  interestedCount: number;
  goingCount: number;
  attendingStatus?: string | null;
  coverPhoto: { __typename?: "Image"; id: number };
  group?: {
    __typename?: "Group";
    id: number;
    name: string;
    isJoinedByMe?: boolean;
    myPermissions?: { __typename?: "GroupPermissions"; manageEvents: boolean };
  } | null;
};

export type CreateEventMutationVariables = Exact<{
  eventData: CreateEventInput;
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
}>;

export type CreateEventMutation = {
  __typename?: "Mutation";
  createEvent: {
    __typename?: "CreateEventPayload";
    event: {
      __typename?: "Event";
      id: number;
      name: string;
      description: string;
      startsAt: any;
      interestedCount: number;
      goingCount: number;
      online: boolean;
      location?: string | null;
      attendingStatus?: string | null;
      coverPhoto: { __typename?: "Image"; id: number };
      group?: {
        __typename?: "Group";
        id: number;
        isJoinedByMe?: boolean;
        myPermissions?: {
          __typename?: "GroupPermissions";
          manageEvents: boolean;
        };
      } | null;
    };
  };
};

export type CreateEventAttendeeMutationVariables = Exact<{
  eventAttendeeData: CreateEventAttendeeInput;
}>;

export type CreateEventAttendeeMutation = {
  __typename?: "Mutation";
  createEventAttendee: {
    __typename?: "CreateEventAttendeePayload";
    event: {
      __typename?: "Event";
      id: number;
      attendingStatus?: string | null;
      goingCount: number;
      interestedCount: number;
    };
  };
};

export type DeleteEventMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteEventMutation = {
  __typename?: "Mutation";
  deleteEvent: boolean;
};

export type DeleteEventAttendeeMutationVariables = Exact<{
  eventId: Scalars["Int"];
}>;

export type DeleteEventAttendeeMutation = {
  __typename?: "Mutation";
  deleteEventAttendee: boolean;
};

export type UpdateEventMutationVariables = Exact<{
  eventData: UpdateEventInput;
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
}>;

export type UpdateEventMutation = {
  __typename?: "Mutation";
  updateEvent: {
    __typename?: "UpdateEventPayload";
    event: {
      __typename?: "Event";
      id: number;
      name: string;
      description: string;
      location?: string | null;
      startsAt: any;
      endsAt?: any | null;
      online: boolean;
      externalLink?: string | null;
      interestedCount: number;
      goingCount: number;
      attendingStatus?: string | null;
      coverPhoto: { __typename?: "Image"; id: number };
      group?: {
        __typename?: "Group";
        id: number;
        name: string;
        isJoinedByMe?: boolean;
        myPermissions?: {
          __typename?: "GroupPermissions";
          manageEvents: boolean;
        };
      } | null;
    };
  };
};

export type UpdateEventAttendeeMutationVariables = Exact<{
  eventAttendeeData: UpdateEventAttendeeInput;
}>;

export type UpdateEventAttendeeMutation = {
  __typename?: "Mutation";
  updateEventAttendee: {
    __typename?: "UpdateEventAttendeePayload";
    event: {
      __typename?: "Event";
      id: number;
      attendingStatus?: string | null;
      goingCount: number;
      interestedCount: number;
    };
  };
};

export type EditEventQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type EditEventQuery = {
  __typename?: "Query";
  event: {
    __typename?: "Event";
    id: number;
    name: string;
    startsAt: any;
    endsAt?: any | null;
    description: string;
    location?: string | null;
    online: boolean;
    externalLink?: string | null;
    group?: {
      __typename?: "Group";
      id: number;
      name: string;
      myPermissions: { __typename?: "GroupPermissions"; manageEvents: boolean };
    } | null;
  };
};

export type EventPageQueryVariables = Exact<{
  id: Scalars["Int"];
  isLoggedIn: Scalars["Boolean"];
}>;

export type EventPageQuery = {
  __typename?: "Query";
  event: {
    __typename?: "Event";
    id: number;
    name: string;
    description: string;
    location?: string | null;
    startsAt: any;
    endsAt?: any | null;
    online: boolean;
    externalLink?: string | null;
    interestedCount: number;
    goingCount: number;
    attendingStatus?: string | null;
    posts: Array<{
      __typename?: "Post";
      id: number;
      body?: string | null;
      createdAt: any;
      likesCount: number;
      isLikedByMe?: boolean;
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
        myPermissions?: {
          __typename?: "GroupPermissions";
          approveMemberRequests: boolean;
          createEvents: boolean;
          deleteGroup: boolean;
          manageComments: boolean;
          manageEvents: boolean;
          managePosts: boolean;
          manageRoles: boolean;
          manageSettings: boolean;
          removeMembers: boolean;
          updateGroup: boolean;
        };
        coverPhoto?: { __typename?: "Image"; id: number } | null;
      } | null;
      event?: {
        __typename?: "Event";
        id: number;
        name: string;
        coverPhoto: { __typename?: "Image"; id: number };
      } | null;
    }>;
    group?: {
      __typename?: "Group";
      id: number;
      name: string;
      isJoinedByMe?: boolean;
      myPermissions?: {
        __typename?: "GroupPermissions";
        manageEvents: boolean;
      };
    } | null;
    coverPhoto: { __typename?: "Image"; id: number };
  };
};

export type EventsQueryVariables = Exact<{
  input: EventsInput;
  isLoggedIn: Scalars["Boolean"];
}>;

export type EventsQuery = {
  __typename?: "Query";
  events: Array<{
    __typename?: "Event";
    id: number;
    name: string;
    description: string;
    startsAt: any;
    interestedCount: number;
    goingCount: number;
    online: boolean;
    location?: string | null;
    attendingStatus?: string | null;
    coverPhoto: { __typename?: "Image"; id: number };
    group?: {
      __typename?: "Group";
      id: number;
      isJoinedByMe?: boolean;
      myPermissions?: {
        __typename?: "GroupPermissions";
        manageEvents: boolean;
      };
    } | null;
  }>;
};

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

export type DeleteGroupRoleButtonFragment = {
  __typename?: "GroupRole";
  id: number;
  group: { __typename?: "Group"; id: number; name: string };
};

export type EditGroupRoleTabsFragment = {
  __typename?: "GroupRole";
  id: number;
  name: string;
  color: string;
  memberCount: number;
  permissions: {
    __typename?: "GroupRolePermission";
    id: number;
    approveMemberRequests: boolean;
    createEvents: boolean;
    deleteGroup: boolean;
    manageComments: boolean;
    manageEvents: boolean;
    managePosts: boolean;
    manageRoles: boolean;
    manageSettings: boolean;
    removeMembers: boolean;
    updateGroup: boolean;
  };
  availableUsersToAdd: Array<{
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  }>;
  group: { __typename?: "Group"; id: number; name: string };
  members: Array<{
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  }>;
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
  memberRequestCount?: number | null;
  id: number;
  name: string;
  members: Array<{ __typename?: "User"; id: number }>;
  myPermissions?: {
    __typename?: "GroupPermissions";
    approveMemberRequests: boolean;
    createEvents: boolean;
    deleteGroup: boolean;
    manageComments: boolean;
    manageEvents: boolean;
    managePosts: boolean;
    manageRoles: boolean;
    manageSettings: boolean;
    removeMembers: boolean;
    updateGroup: boolean;
  };
  coverPhoto?: { __typename?: "Image"; id: number } | null;
};

export type GroupFormFragment = {
  __typename?: "Group";
  id: number;
  name: string;
  description: string;
};

export type GroupMemberFragment = {
  __typename?: "User";
  id: number;
  name: string;
  isFollowedByMe: boolean;
  profilePicture: { __typename?: "Image"; id: number };
};

export type GroupPermissionsFragment = {
  __typename?: "GroupPermissions";
  approveMemberRequests: boolean;
  createEvents: boolean;
  deleteGroup: boolean;
  manageComments: boolean;
  manageEvents: boolean;
  managePosts: boolean;
  manageRoles: boolean;
  manageSettings: boolean;
  removeMembers: boolean;
  updateGroup: boolean;
};

export type GroupProfileCardFragment = {
  __typename?: "Group";
  id: number;
  name: string;
  memberRequestCount?: number | null;
  myPermissions?: {
    __typename?: "GroupPermissions";
    approveMemberRequests: boolean;
    createEvents: boolean;
    deleteGroup: boolean;
    manageComments: boolean;
    manageEvents: boolean;
    managePosts: boolean;
    manageRoles: boolean;
    manageSettings: boolean;
    removeMembers: boolean;
    updateGroup: boolean;
  };
  coverPhoto?: { __typename?: "Image"; id: number } | null;
  members: Array<{ __typename?: "User"; id: number }>;
  settings: { __typename?: "GroupConfig"; isPublic: boolean };
};

export type GroupRoleFragment = {
  __typename?: "GroupRole";
  id: number;
  name: string;
  color: string;
  memberCount: number;
  group: { __typename?: "Group"; id: number; name: string };
};

export type GroupRolePermissionsFragment = {
  __typename?: "GroupRolePermission";
  id: number;
  approveMemberRequests: boolean;
  createEvents: boolean;
  deleteGroup: boolean;
  manageComments: boolean;
  manageEvents: boolean;
  managePosts: boolean;
  manageRoles: boolean;
  manageSettings: boolean;
  removeMembers: boolean;
  updateGroup: boolean;
};

export type GroupSettingsFormFragment = {
  __typename?: "Group";
  id: number;
  settings: { __typename?: "GroupConfig"; id: number; isPublic: boolean };
};

export type MemberRequestFragment = {
  __typename?: "GroupMemberRequest";
  id: number;
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  };
  group: { __typename?: "Group"; id: number };
};

export type ApproveGroupMemberRequestMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type ApproveGroupMemberRequestMutation = {
  __typename?: "Mutation";
  approveGroupMemberRequest: {
    __typename?: "ApproveGroupMemberRequestPayload";
    groupMember: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    };
  };
};

export type CancelGroupMemberRequestMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type CancelGroupMemberRequestMutation = {
  __typename?: "Mutation";
  cancelGroupMemberRequest: boolean;
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
      myPermissions: {
        __typename?: "GroupPermissions";
        approveMemberRequests: boolean;
        createEvents: boolean;
        deleteGroup: boolean;
        manageComments: boolean;
        manageEvents: boolean;
        managePosts: boolean;
        manageRoles: boolean;
        manageSettings: boolean;
        removeMembers: boolean;
        updateGroup: boolean;
      };
      members: Array<{ __typename?: "User"; id: number }>;
      coverPhoto?: { __typename?: "Image"; id: number } | null;
    };
  };
};

export type CreateGroupMemberRequestMutationVariables = Exact<{
  groupId: Scalars["Int"];
}>;

export type CreateGroupMemberRequestMutation = {
  __typename?: "Mutation";
  createGroupMemberRequest: {
    __typename?: "CreateGroupMemberRequestPayload";
    groupMemberRequest: {
      __typename?: "GroupMemberRequest";
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

export type CreateGroupRoleMutationVariables = Exact<{
  groupRoleData: CreateGroupRoleInput;
}>;

export type CreateGroupRoleMutation = {
  __typename?: "Mutation";
  createGroupRole: {
    __typename?: "CreateGroupRolePayload";
    groupRole: {
      __typename?: "GroupRole";
      id: number;
      name: string;
      color: string;
      memberCount: number;
      group: {
        __typename?: "Group";
        id: number;
        name: string;
        roles: Array<{
          __typename?: "GroupRole";
          id: number;
          name: string;
          color: string;
          memberCount: number;
          group: { __typename?: "Group"; id: number; name: string };
        }>;
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

export type DeleteGroupRoleMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteGroupRoleMutation = {
  __typename?: "Mutation";
  deleteGroupRole: boolean;
};

export type DeleteGroupRoleMemberMutationVariables = Exact<{
  groupRoleMemberData: DeleteGroupRoleMemberInput;
}>;

export type DeleteGroupRoleMemberMutation = {
  __typename?: "Mutation";
  deleteGroupRoleMember: {
    __typename?: "DeleteGroupRoleMemberPayload";
    groupRole: {
      __typename?: "GroupRole";
      id: number;
      availableUsersToAdd: Array<{
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      }>;
      group: {
        __typename?: "Group";
        id: number;
        myPermissions: {
          __typename?: "GroupPermissions";
          approveMemberRequests: boolean;
          createEvents: boolean;
          deleteGroup: boolean;
          manageComments: boolean;
          manageEvents: boolean;
          managePosts: boolean;
          manageRoles: boolean;
          manageSettings: boolean;
          removeMembers: boolean;
          updateGroup: boolean;
        };
      };
    };
  };
};

export type DenyGroupMemberRequestMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DenyGroupMemberRequestMutation = {
  __typename?: "Mutation";
  denyGroupMemberRequest: boolean;
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

export type UpdateGroupRoleMutationVariables = Exact<{
  groupRoleData: UpdateGroupRoleInput;
}>;

export type UpdateGroupRoleMutation = {
  __typename?: "Mutation";
  updateGroupRole: {
    __typename?: "UpdateGroupRolePayload";
    groupRole: {
      __typename?: "GroupRole";
      id: number;
      name: string;
      color: string;
      memberCount: number;
      permissions: {
        __typename?: "GroupRolePermission";
        id: number;
        approveMemberRequests: boolean;
        createEvents: boolean;
        deleteGroup: boolean;
        manageComments: boolean;
        manageEvents: boolean;
        managePosts: boolean;
        manageRoles: boolean;
        manageSettings: boolean;
        removeMembers: boolean;
        updateGroup: boolean;
      };
      members: Array<{
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      }>;
      availableUsersToAdd: Array<{
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      }>;
      group: {
        __typename?: "Group";
        id: number;
        name: string;
        myPermissions: {
          __typename?: "GroupPermissions";
          approveMemberRequests: boolean;
          createEvents: boolean;
          deleteGroup: boolean;
          manageComments: boolean;
          manageEvents: boolean;
          managePosts: boolean;
          manageRoles: boolean;
          manageSettings: boolean;
          removeMembers: boolean;
          updateGroup: boolean;
        };
      };
    };
  };
};

export type UpdateGroupSettingsMutationVariables = Exact<{
  groupConfigData: UpdateGroupConfigInput;
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
}>;

export type UpdateGroupSettingsMutation = {
  __typename?: "Mutation";
  updateGroupConfig: {
    __typename?: "UpdateGroupPayload";
    group: {
      __typename?: "Group";
      id: number;
      name: string;
      memberRequestCount?: number | null;
      description: string;
      settings: { __typename?: "GroupConfig"; id: number; isPublic: boolean };
      myPermissions?: {
        __typename?: "GroupPermissions";
        approveMemberRequests: boolean;
        createEvents: boolean;
        deleteGroup: boolean;
        manageComments: boolean;
        manageEvents: boolean;
        managePosts: boolean;
        manageRoles: boolean;
        manageSettings: boolean;
        removeMembers: boolean;
        updateGroup: boolean;
      };
      coverPhoto?: { __typename?: "Image"; id: number } | null;
      members: Array<{ __typename?: "User"; id: number }>;
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
    myPermissions: {
      __typename?: "GroupPermissions";
      approveMemberRequests: boolean;
      createEvents: boolean;
      deleteGroup: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      manageSettings: boolean;
      removeMembers: boolean;
      updateGroup: boolean;
    };
  };
};

export type EditGroupRoleQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type EditGroupRoleQuery = {
  __typename?: "Query";
  groupRole: {
    __typename?: "GroupRole";
    id: number;
    name: string;
    color: string;
    memberCount: number;
    group: {
      __typename?: "Group";
      id: number;
      name: string;
      myPermissions: {
        __typename?: "GroupPermissions";
        approveMemberRequests: boolean;
        createEvents: boolean;
        deleteGroup: boolean;
        manageComments: boolean;
        manageEvents: boolean;
        managePosts: boolean;
        manageRoles: boolean;
        manageSettings: boolean;
        removeMembers: boolean;
        updateGroup: boolean;
      };
    };
    permissions: {
      __typename?: "GroupRolePermission";
      id: number;
      approveMemberRequests: boolean;
      createEvents: boolean;
      deleteGroup: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      manageSettings: boolean;
      removeMembers: boolean;
      updateGroup: boolean;
    };
    availableUsersToAdd: Array<{
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    }>;
    members: Array<{
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    }>;
  };
};

export type GroupEventsTabQueryVariables = Exact<{
  groupId: Scalars["Int"];
  isLoggedIn: Scalars["Boolean"];
}>;

export type GroupEventsTabQuery = {
  __typename?: "Query";
  group: {
    __typename?: "Group";
    name: string;
    futureEvents: Array<{
      __typename?: "Event";
      id: number;
      name: string;
      description: string;
      startsAt: any;
      interestedCount: number;
      goingCount: number;
      online: boolean;
      location?: string | null;
      attendingStatus?: string | null;
      coverPhoto: { __typename?: "Image"; id: number };
      group?: {
        __typename?: "Group";
        id: number;
        isJoinedByMe?: boolean;
        myPermissions?: {
          __typename?: "GroupPermissions";
          manageEvents: boolean;
        };
      } | null;
    }>;
    pastEvents: Array<{
      __typename?: "Event";
      id: number;
      name: string;
      description: string;
      startsAt: any;
      interestedCount: number;
      goingCount: number;
      online: boolean;
      location?: string | null;
      attendingStatus?: string | null;
      coverPhoto: { __typename?: "Image"; id: number };
      group?: {
        __typename?: "Group";
        id: number;
        isJoinedByMe?: boolean;
        myPermissions?: {
          __typename?: "GroupPermissions";
          manageEvents: boolean;
        };
      } | null;
    }>;
    myPermissions?: {
      __typename?: "GroupPermissions";
      manageEvents: boolean;
      createEvents: boolean;
    };
  };
};

export type GroupMemberRequestQueryVariables = Exact<{
  groupId: Scalars["Int"];
}>;

export type GroupMemberRequestQuery = {
  __typename?: "Query";
  groupMemberRequest?: {
    __typename?: "GroupMemberRequest";
    id: number;
    user: { __typename?: "User"; id: number };
  } | null;
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
      __typename?: "User";
      id: number;
      name: string;
      isFollowedByMe: boolean;
      profilePicture: { __typename?: "Image"; id: number };
    }>;
  };
  me: { __typename?: "User"; id: number };
};

export type GroupMembersByGroupIdQueryVariables = Exact<{
  groupId: Scalars["Int"];
}>;

export type GroupMembersByGroupIdQuery = {
  __typename?: "Query";
  group: {
    __typename?: "Group";
    id: number;
    members: Array<{
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    }>;
  };
};

export type GroupProfileQueryVariables = Exact<{
  name: Scalars["String"];
  isLoggedIn: Scalars["Boolean"];
}>;

export type GroupProfileQuery = {
  __typename?: "Query";
  group: {
    __typename?: "Group";
    description: string;
    id: number;
    name: string;
    memberRequestCount?: number | null;
    feed: Array<
      | {
          __typename?: "Post";
          id: number;
          body?: string | null;
          createdAt: any;
          likesCount: number;
          isLikedByMe?: boolean;
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
            myPermissions?: {
              __typename?: "GroupPermissions";
              approveMemberRequests: boolean;
              createEvents: boolean;
              deleteGroup: boolean;
              manageComments: boolean;
              manageEvents: boolean;
              managePosts: boolean;
              manageRoles: boolean;
              manageSettings: boolean;
              removeMembers: boolean;
              updateGroup: boolean;
            };
            coverPhoto?: { __typename?: "Image"; id: number } | null;
          } | null;
          event?: {
            __typename?: "Event";
            id: number;
            name: string;
            coverPhoto: { __typename?: "Image"; id: number };
          } | null;
        }
      | {
          __typename?: "Proposal";
          id: number;
          body?: string | null;
          stage: string;
          voteCount: number;
          createdAt: any;
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
            role?: {
              __typename?: "ProposalActionRole";
              id: number;
              name?: string | null;
              color?: string | null;
              oldName?: string | null;
              oldColor?: string | null;
              permissions: {
                __typename?: "ProposalActionPermission";
                id: number;
                approveMemberRequests?: boolean | null;
                createEvents?: boolean | null;
                deleteGroup?: boolean | null;
                manageComments?: boolean | null;
                manageEvents?: boolean | null;
                managePosts?: boolean | null;
                manageRoles?: boolean | null;
                manageSettings?: boolean | null;
                removeMembers?: boolean | null;
                updateGroup?: boolean | null;
              };
              members?: Array<{
                __typename?: "ProposalActionRoleMember";
                id: number;
                changeType: string;
                user: {
                  __typename?: "User";
                  id: number;
                  name: string;
                  profilePicture: { __typename?: "Image"; id: number };
                };
              }> | null;
              groupRole?: {
                __typename?: "GroupRole";
                id: number;
                name: string;
                color: string;
              } | null;
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
            isJoinedByMe?: boolean;
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
    myPermissions?: {
      __typename?: "GroupPermissions";
      approveMemberRequests: boolean;
      createEvents: boolean;
      deleteGroup: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      manageSettings: boolean;
      removeMembers: boolean;
      updateGroup: boolean;
    };
    coverPhoto?: { __typename?: "Image"; id: number } | null;
    members: Array<{ __typename?: "User"; id: number }>;
    settings: { __typename?: "GroupConfig"; isPublic: boolean };
  };
  me?: {
    __typename?: "User";
    id: number;
    joinedGroups: Array<{ __typename?: "Group"; id: number; name: string }>;
  };
};

export type GroupRoleByRoleIdQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type GroupRoleByRoleIdQuery = {
  __typename?: "Query";
  groupRole: {
    __typename?: "GroupRole";
    id: number;
    name: string;
    color: string;
    permissions: {
      __typename?: "GroupRolePermission";
      id: number;
      approveMemberRequests: boolean;
      createEvents: boolean;
      deleteGroup: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      manageSettings: boolean;
      removeMembers: boolean;
      updateGroup: boolean;
    };
    members: Array<{
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    }>;
    availableUsersToAdd: Array<{
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    }>;
  };
};

export type GroupRolesQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type GroupRolesQuery = {
  __typename?: "Query";
  group: {
    __typename?: "Group";
    id: number;
    myPermissions: {
      __typename?: "GroupPermissions";
      approveMemberRequests: boolean;
      createEvents: boolean;
      deleteGroup: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      manageSettings: boolean;
      removeMembers: boolean;
      updateGroup: boolean;
    };
    roles: Array<{
      __typename?: "GroupRole";
      id: number;
      name: string;
      color: string;
      memberCount: number;
      group: { __typename?: "Group"; id: number; name: string };
    }>;
  };
};

export type GroupRolesByGroupIdQueryVariables = Exact<{
  groupId: Scalars["Int"];
}>;

export type GroupRolesByGroupIdQuery = {
  __typename?: "Query";
  group: {
    __typename?: "Group";
    id: number;
    roles: Array<{ __typename?: "GroupRole"; id: number; name: string }>;
  };
};

export type GroupSettingsQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type GroupSettingsQuery = {
  __typename?: "Query";
  group: {
    __typename?: "Group";
    id: number;
    myPermissions: {
      __typename?: "GroupPermissions";
      approveMemberRequests: boolean;
      createEvents: boolean;
      deleteGroup: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      manageSettings: boolean;
      removeMembers: boolean;
      updateGroup: boolean;
    };
    settings: { __typename?: "GroupConfig"; id: number; isPublic: boolean };
  };
};

export type GroupsQueryVariables = Exact<{
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
}>;

export type GroupsQuery = {
  __typename?: "Query";
  groups: Array<{
    __typename?: "Group";
    description: string;
    memberRequestCount?: number | null;
    id: number;
    name: string;
    members: Array<{ __typename?: "User"; id: number }>;
    myPermissions?: {
      __typename?: "GroupPermissions";
      approveMemberRequests: boolean;
      createEvents: boolean;
      deleteGroup: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      manageSettings: boolean;
      removeMembers: boolean;
      updateGroup: boolean;
    };
    coverPhoto?: { __typename?: "Image"; id: number } | null;
  }>;
  me: { __typename?: "User"; id: number };
};

export type MemberRequestsQueryVariables = Exact<{
  groupName: Scalars["String"];
}>;

export type MemberRequestsQuery = {
  __typename?: "Query";
  group: {
    __typename?: "Group";
    id: number;
    memberRequests?: Array<{
      __typename?: "GroupMemberRequest";
      id: number;
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      };
      group: { __typename?: "Group"; id: number };
    }> | null;
  };
};

export type PublicGroupsQueryVariables = Exact<{
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
}>;

export type PublicGroupsQuery = {
  __typename?: "Query";
  publicGroups: Array<{
    __typename?: "Group";
    description: string;
    memberRequestCount?: number | null;
    id: number;
    name: string;
    members: Array<{ __typename?: "User"; id: number }>;
    myPermissions?: {
      __typename?: "GroupPermissions";
      approveMemberRequests: boolean;
      createEvents: boolean;
      deleteGroup: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      manageSettings: boolean;
      removeMembers: boolean;
      updateGroup: boolean;
    };
    coverPhoto?: { __typename?: "Image"; id: number } | null;
  }>;
};

export type PublicGroupsFeedQueryVariables = Exact<{
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
}>;

export type PublicGroupsFeedQuery = {
  __typename?: "Query";
  publicGroupsFeed: Array<
    | {
        __typename?: "Post";
        id: number;
        body?: string | null;
        createdAt: any;
        likesCount: number;
        isLikedByMe?: boolean;
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
          myPermissions?: {
            __typename?: "GroupPermissions";
            approveMemberRequests: boolean;
            createEvents: boolean;
            deleteGroup: boolean;
            manageComments: boolean;
            manageEvents: boolean;
            managePosts: boolean;
            manageRoles: boolean;
            manageSettings: boolean;
            removeMembers: boolean;
            updateGroup: boolean;
          };
          coverPhoto?: { __typename?: "Image"; id: number } | null;
        } | null;
        event?: {
          __typename?: "Event";
          id: number;
          name: string;
          coverPhoto: { __typename?: "Image"; id: number };
        } | null;
      }
    | {
        __typename?: "Proposal";
        id: number;
        body?: string | null;
        stage: string;
        voteCount: number;
        createdAt: any;
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
          role?: {
            __typename?: "ProposalActionRole";
            id: number;
            name?: string | null;
            color?: string | null;
            oldName?: string | null;
            oldColor?: string | null;
            permissions: {
              __typename?: "ProposalActionPermission";
              id: number;
              approveMemberRequests?: boolean | null;
              createEvents?: boolean | null;
              deleteGroup?: boolean | null;
              manageComments?: boolean | null;
              manageEvents?: boolean | null;
              managePosts?: boolean | null;
              manageRoles?: boolean | null;
              manageSettings?: boolean | null;
              removeMembers?: boolean | null;
              updateGroup?: boolean | null;
            };
            members?: Array<{
              __typename?: "ProposalActionRoleMember";
              id: number;
              changeType: string;
              user: {
                __typename?: "User";
                id: number;
                name: string;
                profilePicture: { __typename?: "Image"; id: number };
              };
            }> | null;
            groupRole?: {
              __typename?: "GroupRole";
              id: number;
              name: string;
              color: string;
            } | null;
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
          isJoinedByMe?: boolean;
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
  me: {
    __typename?: "User";
    id: number;
    serverPermissions: {
      __typename?: "ServerPermissions";
      createInvites: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      manageInvites: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      removeMembers: boolean;
    };
  };
};

export type DeleteLikeMutationVariables = Exact<{
  likeData: DeleteLikeInput;
}>;

export type DeleteLikeMutation = {
  __typename?: "Mutation";
  deleteLike: boolean;
};

type FeedItem_Post_Fragment = {
  __typename?: "Post";
  id: number;
  body?: string | null;
  createdAt: any;
  likesCount: number;
  isLikedByMe?: boolean;
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
    myPermissions?: {
      __typename?: "GroupPermissions";
      approveMemberRequests: boolean;
      createEvents: boolean;
      deleteGroup: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      manageSettings: boolean;
      removeMembers: boolean;
      updateGroup: boolean;
    };
    coverPhoto?: { __typename?: "Image"; id: number } | null;
  } | null;
  event?: {
    __typename?: "Event";
    id: number;
    name: string;
    coverPhoto: { __typename?: "Image"; id: number };
  } | null;
};

type FeedItem_Proposal_Fragment = {
  __typename?: "Proposal";
  id: number;
  body?: string | null;
  stage: string;
  voteCount: number;
  createdAt: any;
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
    role?: {
      __typename?: "ProposalActionRole";
      id: number;
      name?: string | null;
      color?: string | null;
      oldName?: string | null;
      oldColor?: string | null;
      permissions: {
        __typename?: "ProposalActionPermission";
        id: number;
        approveMemberRequests?: boolean | null;
        createEvents?: boolean | null;
        deleteGroup?: boolean | null;
        manageComments?: boolean | null;
        manageEvents?: boolean | null;
        managePosts?: boolean | null;
        manageRoles?: boolean | null;
        manageSettings?: boolean | null;
        removeMembers?: boolean | null;
        updateGroup?: boolean | null;
      };
      members?: Array<{
        __typename?: "ProposalActionRoleMember";
        id: number;
        changeType: string;
        user: {
          __typename?: "User";
          id: number;
          name: string;
          profilePicture: { __typename?: "Image"; id: number };
        };
      }> | null;
      groupRole?: {
        __typename?: "GroupRole";
        id: number;
        name: string;
        color: string;
      } | null;
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
    isJoinedByMe?: boolean;
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
  likesCount: number;
  isLikedByMe?: boolean;
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
    myPermissions?: {
      __typename?: "GroupPermissions";
      approveMemberRequests: boolean;
      createEvents: boolean;
      deleteGroup: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      manageSettings: boolean;
      removeMembers: boolean;
      updateGroup: boolean;
    };
    coverPhoto?: { __typename?: "Image"; id: number } | null;
  } | null;
  event?: {
    __typename?: "Event";
    id: number;
    name: string;
    coverPhoto: { __typename?: "Image"; id: number };
  } | null;
};

export type PostCardFooterFragment = {
  __typename?: "Post";
  id: number;
  likesCount: number;
  isLikedByMe?: boolean;
};

export type PostFormFragment = {
  __typename?: "Post";
  id: number;
  body?: string | null;
  images: Array<{ __typename?: "Image"; id: number; filename: string }>;
};

export type CreatePostMutationVariables = Exact<{
  postData: CreatePostInput;
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
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
      likesCount: number;
      isLikedByMe?: boolean;
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
        myPermissions?: {
          __typename?: "GroupPermissions";
          approveMemberRequests: boolean;
          createEvents: boolean;
          deleteGroup: boolean;
          manageComments: boolean;
          manageEvents: boolean;
          managePosts: boolean;
          manageRoles: boolean;
          manageSettings: boolean;
          removeMembers: boolean;
          updateGroup: boolean;
        };
        coverPhoto?: { __typename?: "Image"; id: number } | null;
      } | null;
      event?: {
        __typename?: "Event";
        id: number;
        name: string;
        coverPhoto: { __typename?: "Image"; id: number };
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

export type LikePostMutationVariables = Exact<{
  likeData: CreateLikeInput;
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
}>;

export type LikePostMutation = {
  __typename?: "Mutation";
  createLike: {
    __typename?: "CreateLikePayload";
    like: {
      __typename?: "Like";
      id: number;
      post: {
        __typename?: "Post";
        id: number;
        likesCount: number;
        isLikedByMe?: boolean;
      };
    };
  };
};

export type UpdatePostMutationVariables = Exact<{
  postData: UpdatePostInput;
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
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
      likesCount: number;
      isLikedByMe?: boolean;
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
        myPermissions?: {
          __typename?: "GroupPermissions";
          approveMemberRequests: boolean;
          createEvents: boolean;
          deleteGroup: boolean;
          manageComments: boolean;
          manageEvents: boolean;
          managePosts: boolean;
          manageRoles: boolean;
          manageSettings: boolean;
          removeMembers: boolean;
          updateGroup: boolean;
        };
        coverPhoto?: { __typename?: "Image"; id: number } | null;
      } | null;
      event?: {
        __typename?: "Event";
        id: number;
        name: string;
        coverPhoto: { __typename?: "Image"; id: number };
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
  isLoggedIn: Scalars["Boolean"];
}>;

export type PostQuery = {
  __typename?: "Query";
  post: {
    __typename?: "Post";
    id: number;
    body?: string | null;
    createdAt: any;
    likesCount: number;
    isLikedByMe?: boolean;
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
      myPermissions?: {
        __typename?: "GroupPermissions";
        approveMemberRequests: boolean;
        createEvents: boolean;
        deleteGroup: boolean;
        manageComments: boolean;
        manageEvents: boolean;
        managePosts: boolean;
        manageRoles: boolean;
        manageSettings: boolean;
        removeMembers: boolean;
        updateGroup: boolean;
      };
      coverPhoto?: { __typename?: "Image"; id: number } | null;
    } | null;
    event?: {
      __typename?: "Event";
      id: number;
      name: string;
      coverPhoto: { __typename?: "Image"; id: number };
    } | null;
  };
};

export type ProposalActionFragment = {
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
  role?: {
    __typename?: "ProposalActionRole";
    id: number;
    name?: string | null;
    color?: string | null;
    oldName?: string | null;
    oldColor?: string | null;
    permissions: {
      __typename?: "ProposalActionPermission";
      id: number;
      approveMemberRequests?: boolean | null;
      createEvents?: boolean | null;
      deleteGroup?: boolean | null;
      manageComments?: boolean | null;
      manageEvents?: boolean | null;
      managePosts?: boolean | null;
      manageRoles?: boolean | null;
      manageSettings?: boolean | null;
      removeMembers?: boolean | null;
      updateGroup?: boolean | null;
    };
    members?: Array<{
      __typename?: "ProposalActionRoleMember";
      id: number;
      changeType: string;
      user: {
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      };
    }> | null;
    groupRole?: {
      __typename?: "GroupRole";
      id: number;
      name: string;
      color: string;
    } | null;
  } | null;
};

export type ProposalActionPermissionFragment = {
  __typename?: "ProposalActionPermission";
  id: number;
  approveMemberRequests?: boolean | null;
  createEvents?: boolean | null;
  deleteGroup?: boolean | null;
  manageComments?: boolean | null;
  manageEvents?: boolean | null;
  managePosts?: boolean | null;
  manageRoles?: boolean | null;
  manageSettings?: boolean | null;
  removeMembers?: boolean | null;
  updateGroup?: boolean | null;
};

export type ProposalActionRoleFragment = {
  __typename?: "ProposalActionRole";
  id: number;
  name?: string | null;
  color?: string | null;
  oldName?: string | null;
  oldColor?: string | null;
  permissions: {
    __typename?: "ProposalActionPermission";
    id: number;
    approveMemberRequests?: boolean | null;
    createEvents?: boolean | null;
    deleteGroup?: boolean | null;
    manageComments?: boolean | null;
    manageEvents?: boolean | null;
    managePosts?: boolean | null;
    manageRoles?: boolean | null;
    manageSettings?: boolean | null;
    removeMembers?: boolean | null;
    updateGroup?: boolean | null;
  };
  members?: Array<{
    __typename?: "ProposalActionRoleMember";
    id: number;
    changeType: string;
    user: {
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    };
  }> | null;
  groupRole?: {
    __typename?: "GroupRole";
    id: number;
    name: string;
    color: string;
  } | null;
};

export type ProposalActionRoleMemberFragment = {
  __typename?: "ProposalActionRoleMember";
  id: number;
  changeType: string;
  user: {
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  };
};

export type ProposalCardFragment = {
  __typename?: "Proposal";
  id: number;
  body?: string | null;
  stage: string;
  voteCount: number;
  createdAt: any;
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
    role?: {
      __typename?: "ProposalActionRole";
      id: number;
      name?: string | null;
      color?: string | null;
      oldName?: string | null;
      oldColor?: string | null;
      permissions: {
        __typename?: "ProposalActionPermission";
        id: number;
        approveMemberRequests?: boolean | null;
        createEvents?: boolean | null;
        deleteGroup?: boolean | null;
        manageComments?: boolean | null;
        manageEvents?: boolean | null;
        managePosts?: boolean | null;
        manageRoles?: boolean | null;
        manageSettings?: boolean | null;
        removeMembers?: boolean | null;
        updateGroup?: boolean | null;
      };
      members?: Array<{
        __typename?: "ProposalActionRoleMember";
        id: number;
        changeType: string;
        user: {
          __typename?: "User";
          id: number;
          name: string;
          profilePicture: { __typename?: "Image"; id: number };
        };
      }> | null;
      groupRole?: {
        __typename?: "GroupRole";
        id: number;
        name: string;
        color: string;
      } | null;
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
    isJoinedByMe?: boolean;
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
  group?: { __typename?: "Group"; id: number; isJoinedByMe?: boolean } | null;
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
    role?: { __typename?: "ProposalActionRole"; id: number } | null;
  };
  images: Array<{ __typename?: "Image"; id: number; filename: string }>;
};

export type CreateProposalMutationVariables = Exact<{
  proposalData: CreateProposalInput;
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
}>;

export type CreateProposalMutation = {
  __typename?: "Mutation";
  createProposal: {
    __typename?: "CreateProposalPayload";
    proposal: {
      __typename?: "Proposal";
      id: number;
      body?: string | null;
      stage: string;
      voteCount: number;
      createdAt: any;
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
        role?: {
          __typename?: "ProposalActionRole";
          id: number;
          name?: string | null;
          color?: string | null;
          oldName?: string | null;
          oldColor?: string | null;
          permissions: {
            __typename?: "ProposalActionPermission";
            id: number;
            approveMemberRequests?: boolean | null;
            createEvents?: boolean | null;
            deleteGroup?: boolean | null;
            manageComments?: boolean | null;
            manageEvents?: boolean | null;
            managePosts?: boolean | null;
            manageRoles?: boolean | null;
            manageSettings?: boolean | null;
            removeMembers?: boolean | null;
            updateGroup?: boolean | null;
          };
          members?: Array<{
            __typename?: "ProposalActionRoleMember";
            id: number;
            changeType: string;
            user: {
              __typename?: "User";
              id: number;
              name: string;
              profilePicture: { __typename?: "Image"; id: number };
            };
          }> | null;
          groupRole?: {
            __typename?: "GroupRole";
            id: number;
            name: string;
            color: string;
          } | null;
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
        isJoinedByMe?: boolean;
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
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
}>;

export type UpdateProposalMutation = {
  __typename?: "Mutation";
  updateProposal: {
    __typename?: "UpdateProposalPayload";
    proposal: {
      __typename?: "Proposal";
      id: number;
      body?: string | null;
      stage: string;
      voteCount: number;
      createdAt: any;
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
        role?: {
          __typename?: "ProposalActionRole";
          id: number;
          name?: string | null;
          color?: string | null;
          oldName?: string | null;
          oldColor?: string | null;
          permissions: {
            __typename?: "ProposalActionPermission";
            id: number;
            approveMemberRequests?: boolean | null;
            createEvents?: boolean | null;
            deleteGroup?: boolean | null;
            manageComments?: boolean | null;
            manageEvents?: boolean | null;
            managePosts?: boolean | null;
            manageRoles?: boolean | null;
            manageSettings?: boolean | null;
            removeMembers?: boolean | null;
            updateGroup?: boolean | null;
          };
          members?: Array<{
            __typename?: "ProposalActionRoleMember";
            id: number;
            changeType: string;
            user: {
              __typename?: "User";
              id: number;
              name: string;
              profilePicture: { __typename?: "Image"; id: number };
            };
          }> | null;
          groupRole?: {
            __typename?: "GroupRole";
            id: number;
            name: string;
            color: string;
          } | null;
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
        isJoinedByMe?: boolean;
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
      role?: { __typename?: "ProposalActionRole"; id: number } | null;
    };
    images: Array<{ __typename?: "Image"; id: number; filename: string }>;
  };
};

export type ProposalQueryVariables = Exact<{
  id: Scalars["Int"];
  isLoggedIn: Scalars["Boolean"];
}>;

export type ProposalQuery = {
  __typename?: "Query";
  proposal: {
    __typename?: "Proposal";
    id: number;
    body?: string | null;
    stage: string;
    voteCount: number;
    createdAt: any;
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
      role?: {
        __typename?: "ProposalActionRole";
        id: number;
        name?: string | null;
        color?: string | null;
        oldName?: string | null;
        oldColor?: string | null;
        permissions: {
          __typename?: "ProposalActionPermission";
          id: number;
          approveMemberRequests?: boolean | null;
          createEvents?: boolean | null;
          deleteGroup?: boolean | null;
          manageComments?: boolean | null;
          manageEvents?: boolean | null;
          managePosts?: boolean | null;
          manageRoles?: boolean | null;
          manageSettings?: boolean | null;
          removeMembers?: boolean | null;
          updateGroup?: boolean | null;
        };
        members?: Array<{
          __typename?: "ProposalActionRoleMember";
          id: number;
          changeType: string;
          user: {
            __typename?: "User";
            id: number;
            name: string;
            profilePicture: { __typename?: "Image"; id: number };
          };
        }> | null;
        groupRole?: {
          __typename?: "GroupRole";
          id: number;
          name: string;
          color: string;
        } | null;
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
      isJoinedByMe?: boolean;
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

export type AddServerRoleMemberTabFragment = {
  __typename?: "ServerRole";
  id: number;
  members: Array<{
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  }>;
};

export type EditServerRoleTabsFragment = {
  __typename?: "ServerRole";
  id: number;
  name: string;
  color: string;
  memberCount: number;
  permissions: {
    __typename?: "ServerRolePermission";
    id: number;
    createInvites: boolean;
    manageComments: boolean;
    manageEvents: boolean;
    manageInvites: boolean;
    managePosts: boolean;
    manageRoles: boolean;
    removeMembers: boolean;
  };
  availableUsersToAdd: Array<{
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  }>;
  members: Array<{
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  }>;
};

export type RoleMemberFragment = {
  __typename?: "User";
  id: number;
  name: string;
  profilePicture: { __typename?: "Image"; id: number };
};

export type ServerPermissionsFragment = {
  __typename?: "ServerPermissions";
  createInvites: boolean;
  manageComments: boolean;
  manageEvents: boolean;
  manageInvites: boolean;
  managePosts: boolean;
  manageRoles: boolean;
  removeMembers: boolean;
};

export type ServerRoleFragment = {
  __typename?: "ServerRole";
  id: number;
  name: string;
  color: string;
  memberCount: number;
};

export type ServerRolePermissionsFragment = {
  __typename?: "ServerRolePermission";
  id: number;
  createInvites: boolean;
  manageComments: boolean;
  manageEvents: boolean;
  manageInvites: boolean;
  managePosts: boolean;
  manageRoles: boolean;
  removeMembers: boolean;
};

export type CreateServerRoleMutationVariables = Exact<{
  serverRoleData: CreateServerRoleInput;
}>;

export type CreateServerRoleMutation = {
  __typename?: "Mutation";
  createServerRole: {
    __typename?: "CreateServerRolePayload";
    serverRole: {
      __typename?: "ServerRole";
      id: number;
      name: string;
      color: string;
      memberCount: number;
    };
  };
};

export type DeleteServerRoleMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type DeleteServerRoleMutation = {
  __typename?: "Mutation";
  deleteServerRole: boolean;
};

export type DeleteServerRoleMemberMutationVariables = Exact<{
  serverRoleMemberData: DeleteServerRoleMemberInput;
}>;

export type DeleteServerRoleMemberMutation = {
  __typename?: "Mutation";
  deleteServerRoleMember: {
    __typename?: "DeleteServerRoleMemberPayload";
    serverRole: {
      __typename?: "ServerRole";
      id: number;
      availableUsersToAdd: Array<{
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      }>;
    };
    me: {
      __typename?: "User";
      id: number;
      serverPermissions: {
        __typename?: "ServerPermissions";
        createInvites: boolean;
        manageComments: boolean;
        manageEvents: boolean;
        manageInvites: boolean;
        managePosts: boolean;
        manageRoles: boolean;
        removeMembers: boolean;
      };
    };
  };
};

export type UpdateServerRoleMutationVariables = Exact<{
  serverRoleData: UpdateServerRoleInput;
}>;

export type UpdateServerRoleMutation = {
  __typename?: "Mutation";
  updateServerRole: {
    __typename?: "UpdateServerRolePayload";
    serverRole: {
      __typename?: "ServerRole";
      id: number;
      name: string;
      color: string;
      memberCount: number;
      permissions: {
        __typename?: "ServerRolePermission";
        id: number;
        createInvites: boolean;
        manageComments: boolean;
        manageEvents: boolean;
        manageInvites: boolean;
        managePosts: boolean;
        manageRoles: boolean;
        removeMembers: boolean;
      };
      members: Array<{
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      }>;
      availableUsersToAdd: Array<{
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      }>;
    };
    me: {
      __typename?: "User";
      id: number;
      serverPermissions: {
        __typename?: "ServerPermissions";
        createInvites: boolean;
        manageComments: boolean;
        manageEvents: boolean;
        manageInvites: boolean;
        managePosts: boolean;
        manageRoles: boolean;
        removeMembers: boolean;
      };
    };
  };
};

export type EditServerRoleQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type EditServerRoleQuery = {
  __typename?: "Query";
  serverRole: {
    __typename?: "ServerRole";
    id: number;
    name: string;
    color: string;
    memberCount: number;
    permissions: {
      __typename?: "ServerRolePermission";
      id: number;
      createInvites: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      manageInvites: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      removeMembers: boolean;
    };
    availableUsersToAdd: Array<{
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    }>;
    members: Array<{
      __typename?: "User";
      id: number;
      name: string;
      profilePicture: { __typename?: "Image"; id: number };
    }>;
  };
  me: {
    __typename?: "User";
    id: number;
    serverPermissions: {
      __typename?: "ServerPermissions";
      createInvites: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      manageInvites: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      removeMembers: boolean;
    };
  };
};

export type RolesByGroupIdQueryVariables = Exact<{
  id: Scalars["Int"];
}>;

export type RolesByGroupIdQuery = {
  __typename?: "Query";
  group: {
    __typename?: "Group";
    id: number;
    roles: Array<{
      __typename?: "GroupRole";
      id: number;
      name: string;
      color: string;
      memberCount: number;
      permissions: {
        __typename?: "GroupRolePermission";
        id: number;
        approveMemberRequests: boolean;
        createEvents: boolean;
        deleteGroup: boolean;
        manageComments: boolean;
        manageEvents: boolean;
        managePosts: boolean;
        manageRoles: boolean;
        manageSettings: boolean;
        removeMembers: boolean;
        updateGroup: boolean;
      };
      availableUsersToAdd: Array<{
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      }>;
      group: { __typename?: "Group"; id: number; name: string };
      members: Array<{
        __typename?: "User";
        id: number;
        name: string;
        profilePicture: { __typename?: "Image"; id: number };
      }>;
    }>;
  };
};

export type ServerRolesQueryVariables = Exact<{ [key: string]: never }>;

export type ServerRolesQuery = {
  __typename?: "Query";
  serverRoles: Array<{
    __typename?: "ServerRole";
    id: number;
    name: string;
    color: string;
    memberCount: number;
  }>;
  me: {
    __typename?: "User";
    id: number;
    serverPermissions: {
      __typename?: "ServerPermissions";
      manageRoles: boolean;
    };
  };
};

export type EditProfileFormFragment = {
  __typename?: "User";
  id: number;
  bio?: string | null;
  name: string;
  profilePicture: { __typename?: "Image"; id: number };
  coverPhoto?: { __typename?: "Image"; id: number } | null;
};

export type FollowFragment = {
  __typename?: "User";
  id: number;
  name: string;
  isFollowedByMe: boolean;
  profilePicture: { __typename?: "Image"; id: number };
};

export type FollowButtonFragment = {
  __typename?: "User";
  id: number;
  isFollowedByMe: boolean;
};

export type ToggleFormsFragment = {
  __typename?: "User";
  id: number;
  joinedGroups: Array<{ __typename?: "Group"; id: number; name: string }>;
};

export type TopNavDropdownFragment = {
  __typename?: "User";
  id: number;
  name: string;
  serverPermissions: { __typename?: "ServerPermissions"; manageRoles: boolean };
};

export type UserAvatarFragment = {
  __typename?: "User";
  id: number;
  name: string;
  profilePicture: { __typename?: "Image"; id: number };
};

export type UserProfileCardFragment = {
  __typename?: "User";
  id: number;
  bio?: string | null;
  createdAt: any;
  followerCount: number;
  followingCount: number;
  name: string;
  isFollowedByMe: boolean;
  coverPhoto?: { __typename?: "Image"; id: number } | null;
  profilePicture: { __typename?: "Image"; id: number };
};

export type FollowUserMutationVariables = Exact<{
  id: Scalars["Int"];
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
}>;

export type FollowUserMutation = {
  __typename?: "Mutation";
  followUser: {
    __typename?: "FollowUserPayload";
    followedUser: {
      __typename?: "User";
      id: number;
      bio?: string | null;
      createdAt: any;
      followerCount: number;
      followingCount: number;
      name: string;
      isFollowedByMe: boolean;
      followers: Array<{
        __typename?: "User";
        id: number;
        name: string;
        isFollowedByMe: boolean;
        profilePicture: { __typename?: "Image"; id: number };
      }>;
      coverPhoto?: { __typename?: "Image"; id: number } | null;
      profilePicture: { __typename?: "Image"; id: number };
    };
    follower: {
      __typename?: "User";
      id: number;
      bio?: string | null;
      createdAt: any;
      followerCount: number;
      followingCount: number;
      name: string;
      isFollowedByMe: boolean;
      homeFeed: Array<
        | {
            __typename?: "Post";
            id: number;
            body?: string | null;
            createdAt: any;
            likesCount: number;
            isLikedByMe?: boolean;
            images: Array<{
              __typename?: "Image";
              id: number;
              filename: string;
            }>;
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
              myPermissions?: {
                __typename?: "GroupPermissions";
                approveMemberRequests: boolean;
                createEvents: boolean;
                deleteGroup: boolean;
                manageComments: boolean;
                manageEvents: boolean;
                managePosts: boolean;
                manageRoles: boolean;
                manageSettings: boolean;
                removeMembers: boolean;
                updateGroup: boolean;
              };
              coverPhoto?: { __typename?: "Image"; id: number } | null;
            } | null;
            event?: {
              __typename?: "Event";
              id: number;
              name: string;
              coverPhoto: { __typename?: "Image"; id: number };
            } | null;
          }
        | {
            __typename?: "Proposal";
            id: number;
            body?: string | null;
            stage: string;
            voteCount: number;
            createdAt: any;
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
              role?: {
                __typename?: "ProposalActionRole";
                id: number;
                name?: string | null;
                color?: string | null;
                oldName?: string | null;
                oldColor?: string | null;
                permissions: {
                  __typename?: "ProposalActionPermission";
                  id: number;
                  approveMemberRequests?: boolean | null;
                  createEvents?: boolean | null;
                  deleteGroup?: boolean | null;
                  manageComments?: boolean | null;
                  manageEvents?: boolean | null;
                  managePosts?: boolean | null;
                  manageRoles?: boolean | null;
                  manageSettings?: boolean | null;
                  removeMembers?: boolean | null;
                  updateGroup?: boolean | null;
                };
                members?: Array<{
                  __typename?: "ProposalActionRoleMember";
                  id: number;
                  changeType: string;
                  user: {
                    __typename?: "User";
                    id: number;
                    name: string;
                    profilePicture: { __typename?: "Image"; id: number };
                  };
                }> | null;
                groupRole?: {
                  __typename?: "GroupRole";
                  id: number;
                  name: string;
                  color: string;
                } | null;
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
              isJoinedByMe?: boolean;
              name: string;
              coverPhoto?: { __typename?: "Image"; id: number } | null;
            } | null;
            images: Array<{
              __typename?: "Image";
              id: number;
              filename: string;
            }>;
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
      following: Array<{
        __typename?: "User";
        id: number;
        name: string;
        isFollowedByMe: boolean;
        profilePicture: { __typename?: "Image"; id: number };
      }>;
      coverPhoto?: { __typename?: "Image"; id: number } | null;
      profilePicture: { __typename?: "Image"; id: number };
    };
  };
};

export type UnfollowUserMutationVariables = Exact<{
  id: Scalars["Int"];
}>;

export type UnfollowUserMutation = {
  __typename?: "Mutation";
  unfollowUser: boolean;
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
    id: number;
    bio?: string | null;
    createdAt: any;
    followerCount: number;
    followingCount: number;
    name: string;
    isFollowedByMe: boolean;
    coverPhoto?: { __typename?: "Image"; id: number } | null;
    profilePicture: { __typename?: "Image"; id: number };
  };
};

export type FollowersQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type FollowersQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: number;
    followerCount: number;
    followers: Array<{
      __typename?: "User";
      id: number;
      name: string;
      isFollowedByMe: boolean;
      profilePicture: { __typename?: "Image"; id: number };
    }>;
  };
  me: { __typename?: "User"; id: number };
};

export type FollowingQueryVariables = Exact<{
  name: Scalars["String"];
}>;

export type FollowingQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: number;
    followingCount: number;
    following: Array<{
      __typename?: "User";
      id: number;
      name: string;
      isFollowedByMe: boolean;
      profilePicture: { __typename?: "Image"; id: number };
    }>;
  };
  me: { __typename?: "User"; id: number };
};

export type HomeFeedQueryVariables = Exact<{
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
}>;

export type HomeFeedQuery = {
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
          likesCount: number;
          isLikedByMe?: boolean;
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
            myPermissions?: {
              __typename?: "GroupPermissions";
              approveMemberRequests: boolean;
              createEvents: boolean;
              deleteGroup: boolean;
              manageComments: boolean;
              manageEvents: boolean;
              managePosts: boolean;
              manageRoles: boolean;
              manageSettings: boolean;
              removeMembers: boolean;
              updateGroup: boolean;
            };
            coverPhoto?: { __typename?: "Image"; id: number } | null;
          } | null;
          event?: {
            __typename?: "Event";
            id: number;
            name: string;
            coverPhoto: { __typename?: "Image"; id: number };
          } | null;
        }
      | {
          __typename?: "Proposal";
          id: number;
          body?: string | null;
          stage: string;
          voteCount: number;
          createdAt: any;
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
            role?: {
              __typename?: "ProposalActionRole";
              id: number;
              name?: string | null;
              color?: string | null;
              oldName?: string | null;
              oldColor?: string | null;
              permissions: {
                __typename?: "ProposalActionPermission";
                id: number;
                approveMemberRequests?: boolean | null;
                createEvents?: boolean | null;
                deleteGroup?: boolean | null;
                manageComments?: boolean | null;
                manageEvents?: boolean | null;
                managePosts?: boolean | null;
                manageRoles?: boolean | null;
                manageSettings?: boolean | null;
                removeMembers?: boolean | null;
                updateGroup?: boolean | null;
              };
              members?: Array<{
                __typename?: "ProposalActionRoleMember";
                id: number;
                changeType: string;
                user: {
                  __typename?: "User";
                  id: number;
                  name: string;
                  profilePicture: { __typename?: "Image"; id: number };
                };
              }> | null;
              groupRole?: {
                __typename?: "GroupRole";
                id: number;
                name: string;
                color: string;
              } | null;
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
            isJoinedByMe?: boolean;
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

export type IsFirstUserQueryVariables = Exact<{ [key: string]: never }>;

export type IsFirstUserQuery = { __typename?: "Query"; isFirstUser: boolean };

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me: {
    __typename?: "User";
    id: number;
    name: string;
    serverPermissions: {
      __typename?: "ServerPermissions";
      createInvites: boolean;
      manageComments: boolean;
      manageEvents: boolean;
      manageInvites: boolean;
      managePosts: boolean;
      manageRoles: boolean;
      removeMembers: boolean;
    };
    joinedGroups: Array<{ __typename?: "Group"; id: number; name: string }>;
    profilePicture: { __typename?: "Image"; id: number };
  };
};

export type UserProfileQueryVariables = Exact<{
  name?: InputMaybe<Scalars["String"]>;
  isLoggedIn?: InputMaybe<Scalars["Boolean"]>;
}>;

export type UserProfileQuery = {
  __typename?: "Query";
  user: {
    __typename?: "User";
    id: number;
    bio?: string | null;
    createdAt: any;
    followerCount: number;
    followingCount: number;
    name: string;
    isFollowedByMe: boolean;
    profileFeed: Array<
      | {
          __typename?: "Post";
          id: number;
          body?: string | null;
          createdAt: any;
          likesCount: number;
          isLikedByMe?: boolean;
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
            myPermissions?: {
              __typename?: "GroupPermissions";
              approveMemberRequests: boolean;
              createEvents: boolean;
              deleteGroup: boolean;
              manageComments: boolean;
              manageEvents: boolean;
              managePosts: boolean;
              manageRoles: boolean;
              manageSettings: boolean;
              removeMembers: boolean;
              updateGroup: boolean;
            };
            coverPhoto?: { __typename?: "Image"; id: number } | null;
          } | null;
          event?: {
            __typename?: "Event";
            id: number;
            name: string;
            coverPhoto: { __typename?: "Image"; id: number };
          } | null;
        }
      | {
          __typename?: "Proposal";
          id: number;
          body?: string | null;
          stage: string;
          voteCount: number;
          createdAt: any;
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
            role?: {
              __typename?: "ProposalActionRole";
              id: number;
              name?: string | null;
              color?: string | null;
              oldName?: string | null;
              oldColor?: string | null;
              permissions: {
                __typename?: "ProposalActionPermission";
                id: number;
                approveMemberRequests?: boolean | null;
                createEvents?: boolean | null;
                deleteGroup?: boolean | null;
                manageComments?: boolean | null;
                manageEvents?: boolean | null;
                managePosts?: boolean | null;
                manageRoles?: boolean | null;
                manageSettings?: boolean | null;
                removeMembers?: boolean | null;
                updateGroup?: boolean | null;
              };
              members?: Array<{
                __typename?: "ProposalActionRoleMember";
                id: number;
                changeType: string;
                user: {
                  __typename?: "User";
                  id: number;
                  name: string;
                  profilePicture: { __typename?: "Image"; id: number };
                };
              }> | null;
              groupRole?: {
                __typename?: "GroupRole";
                id: number;
                name: string;
                color: string;
              } | null;
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
            isJoinedByMe?: boolean;
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

export type UsersByIdsQueryVariables = Exact<{
  userIds: Array<Scalars["Int"]> | Scalars["Int"];
}>;

export type UsersByIdsQuery = {
  __typename?: "Query";
  usersByIds: Array<{
    __typename?: "User";
    id: number;
    name: string;
    profilePicture: { __typename?: "Image"; id: number };
  }>;
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

export type VoteBadgeFragment = {
  __typename?: "Vote";
  id: number;
  voteType: string;
  user: { __typename?: "User"; id: number };
};

export type VoteBadgesFragment = {
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

export const EventAttendeeButtonsFragmentDoc = gql`
  fragment EventAttendeeButtons on Event {
    id
    attendingStatus
    group {
      id
      isJoinedByMe @include(if: $isLoggedIn)
    }
  }
`;
export const EventCompactFragmentDoc = gql`
  fragment EventCompact on Event {
    id
    name
    description
    startsAt
    interestedCount
    goingCount
    online
    location
    ...EventAttendeeButtons @include(if: $isLoggedIn)
    coverPhoto {
      id
    }
    group {
      id
      myPermissions @include(if: $isLoggedIn) {
        manageEvents
      }
    }
  }
  ${EventAttendeeButtonsFragmentDoc}
`;
export const EventFormFragmentDoc = gql`
  fragment EventForm on Event {
    id
    name
    startsAt
    endsAt
    description
    location
    online
    externalLink
  }
`;
export const EventPageCardFragmentDoc = gql`
  fragment EventPageCard on Event {
    id
    name
    description
    location
    startsAt
    endsAt
    online
    externalLink
    interestedCount
    goingCount
    ...EventAttendeeButtons @include(if: $isLoggedIn)
    coverPhoto {
      id
    }
    group {
      id
      name
      myPermissions @include(if: $isLoggedIn) {
        manageEvents
      }
    }
  }
  ${EventAttendeeButtonsFragmentDoc}
`;
export const GroupRoleFragmentDoc = gql`
  fragment GroupRole on GroupRole {
    id
    name
    color
    memberCount
    group {
      id
      name
    }
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
export const RoleMemberFragmentDoc = gql`
  fragment RoleMember on User {
    id
    ...UserAvatar
  }
  ${UserAvatarFragmentDoc}
`;
export const AddGroupRoleMemberTabFragmentDoc = gql`
  fragment AddGroupRoleMemberTab on GroupRole {
    id
    members {
      ...RoleMember
    }
  }
  ${RoleMemberFragmentDoc}
`;
export const DeleteGroupRoleButtonFragmentDoc = gql`
  fragment DeleteGroupRoleButton on GroupRole {
    id
    group {
      id
      name
    }
  }
`;
export const GroupRolePermissionsFragmentDoc = gql`
  fragment GroupRolePermissions on GroupRolePermission {
    id
    approveMemberRequests
    createEvents
    deleteGroup
    manageComments
    manageEvents
    managePosts
    manageRoles
    manageSettings
    removeMembers
    updateGroup
  }
`;
export const EditGroupRoleTabsFragmentDoc = gql`
  fragment EditGroupRoleTabs on GroupRole {
    ...GroupRole
    ...AddGroupRoleMemberTab
    ...DeleteGroupRoleButton
    permissions {
      ...GroupRolePermissions
    }
    availableUsersToAdd {
      ...UserAvatar
    }
  }
  ${GroupRoleFragmentDoc}
  ${AddGroupRoleMemberTabFragmentDoc}
  ${DeleteGroupRoleButtonFragmentDoc}
  ${GroupRolePermissionsFragmentDoc}
  ${UserAvatarFragmentDoc}
`;
export const GroupAvatarFragmentDoc = gql`
  fragment GroupAvatar on Group {
    id
    name
    coverPhoto {
      id
    }
  }
`;
export const GroupPermissionsFragmentDoc = gql`
  fragment GroupPermissions on GroupPermissions {
    approveMemberRequests
    createEvents
    deleteGroup
    manageComments
    manageEvents
    managePosts
    manageRoles
    manageSettings
    removeMembers
    updateGroup
  }
`;
export const GroupCardFragmentDoc = gql`
  fragment GroupCard on Group {
    ...GroupAvatar
    description
    memberRequestCount @include(if: $isLoggedIn)
    members {
      id
    }
    myPermissions @include(if: $isLoggedIn) {
      ...GroupPermissions
    }
  }
  ${GroupAvatarFragmentDoc}
  ${GroupPermissionsFragmentDoc}
`;
export const GroupFormFragmentDoc = gql`
  fragment GroupForm on Group {
    id
    name
    description
  }
`;
export const FollowButtonFragmentDoc = gql`
  fragment FollowButton on User {
    id
    isFollowedByMe
  }
`;
export const GroupMemberFragmentDoc = gql`
  fragment GroupMember on User {
    id
    ...UserAvatar
    ...FollowButton
  }
  ${UserAvatarFragmentDoc}
  ${FollowButtonFragmentDoc}
`;
export const GroupProfileCardFragmentDoc = gql`
  fragment GroupProfileCard on Group {
    id
    name
    memberRequestCount @include(if: $isLoggedIn)
    myPermissions @include(if: $isLoggedIn) {
      ...GroupPermissions
    }
    coverPhoto {
      id
    }
    members {
      id
    }
    settings {
      isPublic
    }
  }
  ${GroupPermissionsFragmentDoc}
`;
export const GroupSettingsFormFragmentDoc = gql`
  fragment GroupSettingsForm on Group {
    id
    settings {
      id
      isPublic
    }
  }
`;
export const MemberRequestFragmentDoc = gql`
  fragment MemberRequest on GroupMemberRequest {
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
export const AttachedImageFragmentDoc = gql`
  fragment AttachedImage on Image {
    id
    filename
  }
`;
export const EventItemAvatarFragmentDoc = gql`
  fragment EventItemAvatar on Event {
    id
    name
    coverPhoto {
      id
    }
  }
`;
export const PostCardFooterFragmentDoc = gql`
  fragment PostCardFooter on Post {
    id
    likesCount
    isLikedByMe @include(if: $isLoggedIn)
  }
`;
export const PostCardFragmentDoc = gql`
  fragment PostCard on Post {
    id
    body
    createdAt
    images {
      ...AttachedImage
    }
    user {
      ...UserAvatar
    }
    group {
      ...GroupAvatar
      myPermissions @include(if: $isLoggedIn) {
        ...GroupPermissions
      }
    }
    event {
      ...EventItemAvatar
    }
    ...PostCardFooter
  }
  ${AttachedImageFragmentDoc}
  ${UserAvatarFragmentDoc}
  ${GroupAvatarFragmentDoc}
  ${GroupPermissionsFragmentDoc}
  ${EventItemAvatarFragmentDoc}
  ${PostCardFooterFragmentDoc}
`;
export const ProposalActionPermissionFragmentDoc = gql`
  fragment ProposalActionPermission on ProposalActionPermission {
    id
    approveMemberRequests
    createEvents
    deleteGroup
    manageComments
    manageEvents
    managePosts
    manageRoles
    manageSettings
    removeMembers
    updateGroup
  }
`;
export const ProposalActionRoleMemberFragmentDoc = gql`
  fragment ProposalActionRoleMember on ProposalActionRoleMember {
    id
    changeType
    user {
      ...UserAvatar
    }
  }
  ${UserAvatarFragmentDoc}
`;
export const ProposalActionRoleFragmentDoc = gql`
  fragment ProposalActionRole on ProposalActionRole {
    id
    name
    color
    oldName
    oldColor
    permissions {
      ...ProposalActionPermission
    }
    members {
      ...ProposalActionRoleMember
    }
    groupRole {
      id
      name
      color
    }
  }
  ${ProposalActionPermissionFragmentDoc}
  ${ProposalActionRoleMemberFragmentDoc}
`;
export const ProposalActionFragmentDoc = gql`
  fragment ProposalAction on ProposalAction {
    id
    actionType
    groupDescription
    groupName
    groupCoverPhoto {
      ...AttachedImage
    }
    role {
      ...ProposalActionRole
    }
  }
  ${AttachedImageFragmentDoc}
  ${ProposalActionRoleFragmentDoc}
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
export const VoteBadgeFragmentDoc = gql`
  fragment VoteBadge on Vote {
    id
    voteType
    user {
      id
    }
  }
`;
export const VoteBadgesFragmentDoc = gql`
  fragment VoteBadges on Proposal {
    id
    voteCount
    votes {
      ...Vote
      ...VoteBadge
    }
  }
  ${VoteFragmentDoc}
  ${VoteBadgeFragmentDoc}
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
    group {
      id
      isJoinedByMe @include(if: $isLoggedIn)
    }
    ...VoteMenu
    ...VoteBadges
  }
  ${VoteMenuFragmentDoc}
  ${VoteBadgesFragmentDoc}
`;
export const ProposalCardFragmentDoc = gql`
  fragment ProposalCard on Proposal {
    id
    body
    stage
    voteCount
    createdAt
    action {
      ...ProposalAction
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
  ${ProposalActionFragmentDoc}
  ${UserAvatarFragmentDoc}
  ${GroupAvatarFragmentDoc}
  ${AttachedImageFragmentDoc}
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
      role {
        id
      }
    }
    images {
      ...AttachedImage
    }
  }
  ${AttachedImageFragmentDoc}
`;
export const ServerRoleFragmentDoc = gql`
  fragment ServerRole on ServerRole {
    id
    name
    color
    memberCount
  }
`;
export const AddServerRoleMemberTabFragmentDoc = gql`
  fragment AddServerRoleMemberTab on ServerRole {
    id
    members {
      ...RoleMember
    }
  }
  ${RoleMemberFragmentDoc}
`;
export const ServerRolePermissionsFragmentDoc = gql`
  fragment ServerRolePermissions on ServerRolePermission {
    id
    createInvites
    manageComments
    manageEvents
    manageInvites
    managePosts
    manageRoles
    removeMembers
  }
`;
export const EditServerRoleTabsFragmentDoc = gql`
  fragment EditServerRoleTabs on ServerRole {
    ...ServerRole
    ...AddServerRoleMemberTab
    permissions {
      ...ServerRolePermissions
    }
    availableUsersToAdd {
      ...UserAvatar
    }
  }
  ${ServerRoleFragmentDoc}
  ${AddServerRoleMemberTabFragmentDoc}
  ${ServerRolePermissionsFragmentDoc}
  ${UserAvatarFragmentDoc}
`;
export const ServerPermissionsFragmentDoc = gql`
  fragment ServerPermissions on ServerPermissions {
    createInvites
    manageComments
    manageEvents
    manageInvites
    managePosts
    manageRoles
    removeMembers
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
export const FollowFragmentDoc = gql`
  fragment Follow on User {
    id
    ...UserAvatar
    ...FollowButton
  }
  ${UserAvatarFragmentDoc}
  ${FollowButtonFragmentDoc}
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
export const TopNavDropdownFragmentDoc = gql`
  fragment TopNavDropdown on User {
    id
    name
    serverPermissions {
      manageRoles
    }
  }
`;
export const UserProfileCardFragmentDoc = gql`
  fragment UserProfileCard on User {
    id
    bio
    createdAt
    followerCount
    followingCount
    coverPhoto {
      id
    }
    ...UserAvatar
    ...FollowButton
  }
  ${UserAvatarFragmentDoc}
  ${FollowButtonFragmentDoc}
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
        serverPermissions {
          ...ServerPermissions
        }
        joinedGroups {
          id
          name
        }
      }
    }
  }
  ${UserAvatarFragmentDoc}
  ${ServerPermissionsFragmentDoc}
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
        serverPermissions {
          ...ServerPermissions
        }
        joinedGroups {
          id
          name
        }
      }
    }
  }
  ${UserAvatarFragmentDoc}
  ${ServerPermissionsFragmentDoc}
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
export const CreateEventDocument = gql`
  mutation CreateEvent(
    $eventData: CreateEventInput!
    $isLoggedIn: Boolean = true
  ) {
    createEvent(eventData: $eventData) {
      event {
        ...EventCompact
      }
    }
  }
  ${EventCompactFragmentDoc}
`;
export type CreateEventMutationFn = Apollo.MutationFunction<
  CreateEventMutation,
  CreateEventMutationVariables
>;

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      eventData: // value for 'eventData'
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function useCreateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateEventMutation,
    CreateEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(
    CreateEventDocument,
    options
  );
}
export type CreateEventMutationHookResult = ReturnType<
  typeof useCreateEventMutation
>;
export type CreateEventMutationResult =
  Apollo.MutationResult<CreateEventMutation>;
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<
  CreateEventMutation,
  CreateEventMutationVariables
>;
export const CreateEventAttendeeDocument = gql`
  mutation CreateEventAttendee($eventAttendeeData: CreateEventAttendeeInput!) {
    createEventAttendee(eventAttendeeData: $eventAttendeeData) {
      event {
        id
        attendingStatus
        goingCount
        interestedCount
      }
    }
  }
`;
export type CreateEventAttendeeMutationFn = Apollo.MutationFunction<
  CreateEventAttendeeMutation,
  CreateEventAttendeeMutationVariables
>;

/**
 * __useCreateEventAttendeeMutation__
 *
 * To run a mutation, you first call `useCreateEventAttendeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventAttendeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventAttendeeMutation, { data, loading, error }] = useCreateEventAttendeeMutation({
 *   variables: {
 *      eventAttendeeData: // value for 'eventAttendeeData'
 *   },
 * });
 */
export function useCreateEventAttendeeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateEventAttendeeMutation,
    CreateEventAttendeeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateEventAttendeeMutation,
    CreateEventAttendeeMutationVariables
  >(CreateEventAttendeeDocument, options);
}
export type CreateEventAttendeeMutationHookResult = ReturnType<
  typeof useCreateEventAttendeeMutation
>;
export type CreateEventAttendeeMutationResult =
  Apollo.MutationResult<CreateEventAttendeeMutation>;
export type CreateEventAttendeeMutationOptions = Apollo.BaseMutationOptions<
  CreateEventAttendeeMutation,
  CreateEventAttendeeMutationVariables
>;
export const DeleteEventDocument = gql`
  mutation DeleteEvent($id: Int!) {
    deleteEvent(id: $id)
  }
`;
export type DeleteEventMutationFn = Apollo.MutationFunction<
  DeleteEventMutation,
  DeleteEventMutationVariables
>;

/**
 * __useDeleteEventMutation__
 *
 * To run a mutation, you first call `useDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventMutation, { data, loading, error }] = useDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteEventMutation,
    DeleteEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteEventMutation, DeleteEventMutationVariables>(
    DeleteEventDocument,
    options
  );
}
export type DeleteEventMutationHookResult = ReturnType<
  typeof useDeleteEventMutation
>;
export type DeleteEventMutationResult =
  Apollo.MutationResult<DeleteEventMutation>;
export type DeleteEventMutationOptions = Apollo.BaseMutationOptions<
  DeleteEventMutation,
  DeleteEventMutationVariables
>;
export const DeleteEventAttendeeDocument = gql`
  mutation DeleteEventAttendee($eventId: Int!) {
    deleteEventAttendee(eventId: $eventId)
  }
`;
export type DeleteEventAttendeeMutationFn = Apollo.MutationFunction<
  DeleteEventAttendeeMutation,
  DeleteEventAttendeeMutationVariables
>;

/**
 * __useDeleteEventAttendeeMutation__
 *
 * To run a mutation, you first call `useDeleteEventAttendeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteEventAttendeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteEventAttendeeMutation, { data, loading, error }] = useDeleteEventAttendeeMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useDeleteEventAttendeeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteEventAttendeeMutation,
    DeleteEventAttendeeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteEventAttendeeMutation,
    DeleteEventAttendeeMutationVariables
  >(DeleteEventAttendeeDocument, options);
}
export type DeleteEventAttendeeMutationHookResult = ReturnType<
  typeof useDeleteEventAttendeeMutation
>;
export type DeleteEventAttendeeMutationResult =
  Apollo.MutationResult<DeleteEventAttendeeMutation>;
export type DeleteEventAttendeeMutationOptions = Apollo.BaseMutationOptions<
  DeleteEventAttendeeMutation,
  DeleteEventAttendeeMutationVariables
>;
export const UpdateEventDocument = gql`
  mutation UpdateEvent(
    $eventData: UpdateEventInput!
    $isLoggedIn: Boolean = true
  ) {
    updateEvent(eventData: $eventData) {
      event {
        ...EventPageCard
      }
    }
  }
  ${EventPageCardFragmentDoc}
`;
export type UpdateEventMutationFn = Apollo.MutationFunction<
  UpdateEventMutation,
  UpdateEventMutationVariables
>;

/**
 * __useUpdateEventMutation__
 *
 * To run a mutation, you first call `useUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventMutation, { data, loading, error }] = useUpdateEventMutation({
 *   variables: {
 *      eventData: // value for 'eventData'
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function useUpdateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEventMutation,
    UpdateEventMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateEventMutation, UpdateEventMutationVariables>(
    UpdateEventDocument,
    options
  );
}
export type UpdateEventMutationHookResult = ReturnType<
  typeof useUpdateEventMutation
>;
export type UpdateEventMutationResult =
  Apollo.MutationResult<UpdateEventMutation>;
export type UpdateEventMutationOptions = Apollo.BaseMutationOptions<
  UpdateEventMutation,
  UpdateEventMutationVariables
>;
export const UpdateEventAttendeeDocument = gql`
  mutation UpdateEventAttendee($eventAttendeeData: UpdateEventAttendeeInput!) {
    updateEventAttendee(eventAttendeeData: $eventAttendeeData) {
      event {
        id
        attendingStatus
        goingCount
        interestedCount
      }
    }
  }
`;
export type UpdateEventAttendeeMutationFn = Apollo.MutationFunction<
  UpdateEventAttendeeMutation,
  UpdateEventAttendeeMutationVariables
>;

/**
 * __useUpdateEventAttendeeMutation__
 *
 * To run a mutation, you first call `useUpdateEventAttendeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventAttendeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventAttendeeMutation, { data, loading, error }] = useUpdateEventAttendeeMutation({
 *   variables: {
 *      eventAttendeeData: // value for 'eventAttendeeData'
 *   },
 * });
 */
export function useUpdateEventAttendeeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEventAttendeeMutation,
    UpdateEventAttendeeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateEventAttendeeMutation,
    UpdateEventAttendeeMutationVariables
  >(UpdateEventAttendeeDocument, options);
}
export type UpdateEventAttendeeMutationHookResult = ReturnType<
  typeof useUpdateEventAttendeeMutation
>;
export type UpdateEventAttendeeMutationResult =
  Apollo.MutationResult<UpdateEventAttendeeMutation>;
export type UpdateEventAttendeeMutationOptions = Apollo.BaseMutationOptions<
  UpdateEventAttendeeMutation,
  UpdateEventAttendeeMutationVariables
>;
export const EditEventDocument = gql`
  query EditEvent($id: Int!) {
    event(id: $id) {
      ...EventForm
      group {
        id
        name
        myPermissions {
          manageEvents
        }
      }
    }
  }
  ${EventFormFragmentDoc}
`;

/**
 * __useEditEventQuery__
 *
 * To run a query within a React component, call `useEditEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditEventQuery(
  baseOptions: Apollo.QueryHookOptions<EditEventQuery, EditEventQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EditEventQuery, EditEventQueryVariables>(
    EditEventDocument,
    options
  );
}
export function useEditEventLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EditEventQuery,
    EditEventQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EditEventQuery, EditEventQueryVariables>(
    EditEventDocument,
    options
  );
}
export type EditEventQueryHookResult = ReturnType<typeof useEditEventQuery>;
export type EditEventLazyQueryHookResult = ReturnType<
  typeof useEditEventLazyQuery
>;
export type EditEventQueryResult = Apollo.QueryResult<
  EditEventQuery,
  EditEventQueryVariables
>;
export const EventPageDocument = gql`
  query EventPage($id: Int!, $isLoggedIn: Boolean!) {
    event(id: $id) {
      ...EventPageCard
      posts {
        ...PostCard
      }
      group {
        id
        name
      }
    }
  }
  ${EventPageCardFragmentDoc}
  ${PostCardFragmentDoc}
`;

/**
 * __useEventPageQuery__
 *
 * To run a query within a React component, call `useEventPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function useEventPageQuery(
  baseOptions: Apollo.QueryHookOptions<EventPageQuery, EventPageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EventPageQuery, EventPageQueryVariables>(
    EventPageDocument,
    options
  );
}
export function useEventPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EventPageQuery,
    EventPageQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EventPageQuery, EventPageQueryVariables>(
    EventPageDocument,
    options
  );
}
export type EventPageQueryHookResult = ReturnType<typeof useEventPageQuery>;
export type EventPageLazyQueryHookResult = ReturnType<
  typeof useEventPageLazyQuery
>;
export type EventPageQueryResult = Apollo.QueryResult<
  EventPageQuery,
  EventPageQueryVariables
>;
export const EventsDocument = gql`
  query Events($input: EventsInput!, $isLoggedIn: Boolean!) {
    events(input: $input) {
      ...EventCompact
    }
  }
  ${EventCompactFragmentDoc}
`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function useEventsQuery(
  baseOptions: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    options
  );
}
export function useEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(
    EventsDocument,
    options
  );
}
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<
  EventsQuery,
  EventsQueryVariables
>;
export const ApproveGroupMemberRequestDocument = gql`
  mutation ApproveGroupMemberRequest($id: Int!) {
    approveGroupMemberRequest(id: $id) {
      groupMember {
        id
        ...UserAvatar
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;
export type ApproveGroupMemberRequestMutationFn = Apollo.MutationFunction<
  ApproveGroupMemberRequestMutation,
  ApproveGroupMemberRequestMutationVariables
>;

/**
 * __useApproveGroupMemberRequestMutation__
 *
 * To run a mutation, you first call `useApproveGroupMemberRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveGroupMemberRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveGroupMemberRequestMutation, { data, loading, error }] = useApproveGroupMemberRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useApproveGroupMemberRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ApproveGroupMemberRequestMutation,
    ApproveGroupMemberRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ApproveGroupMemberRequestMutation,
    ApproveGroupMemberRequestMutationVariables
  >(ApproveGroupMemberRequestDocument, options);
}
export type ApproveGroupMemberRequestMutationHookResult = ReturnType<
  typeof useApproveGroupMemberRequestMutation
>;
export type ApproveGroupMemberRequestMutationResult =
  Apollo.MutationResult<ApproveGroupMemberRequestMutation>;
export type ApproveGroupMemberRequestMutationOptions =
  Apollo.BaseMutationOptions<
    ApproveGroupMemberRequestMutation,
    ApproveGroupMemberRequestMutationVariables
  >;
export const CancelGroupMemberRequestDocument = gql`
  mutation CancelGroupMemberRequest($id: Int!) {
    cancelGroupMemberRequest(id: $id)
  }
`;
export type CancelGroupMemberRequestMutationFn = Apollo.MutationFunction<
  CancelGroupMemberRequestMutation,
  CancelGroupMemberRequestMutationVariables
>;

/**
 * __useCancelGroupMemberRequestMutation__
 *
 * To run a mutation, you first call `useCancelGroupMemberRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelGroupMemberRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelGroupMemberRequestMutation, { data, loading, error }] = useCancelGroupMemberRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCancelGroupMemberRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CancelGroupMemberRequestMutation,
    CancelGroupMemberRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CancelGroupMemberRequestMutation,
    CancelGroupMemberRequestMutationVariables
  >(CancelGroupMemberRequestDocument, options);
}
export type CancelGroupMemberRequestMutationHookResult = ReturnType<
  typeof useCancelGroupMemberRequestMutation
>;
export type CancelGroupMemberRequestMutationResult =
  Apollo.MutationResult<CancelGroupMemberRequestMutation>;
export type CancelGroupMemberRequestMutationOptions =
  Apollo.BaseMutationOptions<
    CancelGroupMemberRequestMutation,
    CancelGroupMemberRequestMutationVariables
  >;
export const CreateGroupDocument = gql`
  mutation CreateGroup($groupData: CreateGroupInput!) {
    createGroup(groupData: $groupData) {
      group {
        ...GroupAvatar
        description
        myPermissions {
          ...GroupPermissions
        }
        members {
          id
        }
      }
    }
  }
  ${GroupAvatarFragmentDoc}
  ${GroupPermissionsFragmentDoc}
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
export const CreateGroupMemberRequestDocument = gql`
  mutation CreateGroupMemberRequest($groupId: Int!) {
    createGroupMemberRequest(groupId: $groupId) {
      groupMemberRequest {
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
export type CreateGroupMemberRequestMutationFn = Apollo.MutationFunction<
  CreateGroupMemberRequestMutation,
  CreateGroupMemberRequestMutationVariables
>;

/**
 * __useCreateGroupMemberRequestMutation__
 *
 * To run a mutation, you first call `useCreateGroupMemberRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupMemberRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupMemberRequestMutation, { data, loading, error }] = useCreateGroupMemberRequestMutation({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useCreateGroupMemberRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGroupMemberRequestMutation,
    CreateGroupMemberRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateGroupMemberRequestMutation,
    CreateGroupMemberRequestMutationVariables
  >(CreateGroupMemberRequestDocument, options);
}
export type CreateGroupMemberRequestMutationHookResult = ReturnType<
  typeof useCreateGroupMemberRequestMutation
>;
export type CreateGroupMemberRequestMutationResult =
  Apollo.MutationResult<CreateGroupMemberRequestMutation>;
export type CreateGroupMemberRequestMutationOptions =
  Apollo.BaseMutationOptions<
    CreateGroupMemberRequestMutation,
    CreateGroupMemberRequestMutationVariables
  >;
export const CreateGroupRoleDocument = gql`
  mutation CreateGroupRole($groupRoleData: CreateGroupRoleInput!) {
    createGroupRole(groupRoleData: $groupRoleData) {
      groupRole {
        ...GroupRole
        group {
          id
          roles {
            ...GroupRole
          }
        }
      }
    }
  }
  ${GroupRoleFragmentDoc}
`;
export type CreateGroupRoleMutationFn = Apollo.MutationFunction<
  CreateGroupRoleMutation,
  CreateGroupRoleMutationVariables
>;

/**
 * __useCreateGroupRoleMutation__
 *
 * To run a mutation, you first call `useCreateGroupRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGroupRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGroupRoleMutation, { data, loading, error }] = useCreateGroupRoleMutation({
 *   variables: {
 *      groupRoleData: // value for 'groupRoleData'
 *   },
 * });
 */
export function useCreateGroupRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateGroupRoleMutation,
    CreateGroupRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateGroupRoleMutation,
    CreateGroupRoleMutationVariables
  >(CreateGroupRoleDocument, options);
}
export type CreateGroupRoleMutationHookResult = ReturnType<
  typeof useCreateGroupRoleMutation
>;
export type CreateGroupRoleMutationResult =
  Apollo.MutationResult<CreateGroupRoleMutation>;
export type CreateGroupRoleMutationOptions = Apollo.BaseMutationOptions<
  CreateGroupRoleMutation,
  CreateGroupRoleMutationVariables
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
export const DeleteGroupRoleDocument = gql`
  mutation DeleteGroupRole($id: Int!) {
    deleteGroupRole(id: $id)
  }
`;
export type DeleteGroupRoleMutationFn = Apollo.MutationFunction<
  DeleteGroupRoleMutation,
  DeleteGroupRoleMutationVariables
>;

/**
 * __useDeleteGroupRoleMutation__
 *
 * To run a mutation, you first call `useDeleteGroupRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupRoleMutation, { data, loading, error }] = useDeleteGroupRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGroupRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteGroupRoleMutation,
    DeleteGroupRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteGroupRoleMutation,
    DeleteGroupRoleMutationVariables
  >(DeleteGroupRoleDocument, options);
}
export type DeleteGroupRoleMutationHookResult = ReturnType<
  typeof useDeleteGroupRoleMutation
>;
export type DeleteGroupRoleMutationResult =
  Apollo.MutationResult<DeleteGroupRoleMutation>;
export type DeleteGroupRoleMutationOptions = Apollo.BaseMutationOptions<
  DeleteGroupRoleMutation,
  DeleteGroupRoleMutationVariables
>;
export const DeleteGroupRoleMemberDocument = gql`
  mutation DeleteGroupRoleMember(
    $groupRoleMemberData: DeleteGroupRoleMemberInput!
  ) {
    deleteGroupRoleMember(groupRoleMemberData: $groupRoleMemberData) {
      groupRole {
        id
        availableUsersToAdd {
          ...UserAvatar
        }
        group {
          id
          myPermissions {
            ...GroupPermissions
          }
        }
      }
    }
  }
  ${UserAvatarFragmentDoc}
  ${GroupPermissionsFragmentDoc}
`;
export type DeleteGroupRoleMemberMutationFn = Apollo.MutationFunction<
  DeleteGroupRoleMemberMutation,
  DeleteGroupRoleMemberMutationVariables
>;

/**
 * __useDeleteGroupRoleMemberMutation__
 *
 * To run a mutation, you first call `useDeleteGroupRoleMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGroupRoleMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGroupRoleMemberMutation, { data, loading, error }] = useDeleteGroupRoleMemberMutation({
 *   variables: {
 *      groupRoleMemberData: // value for 'groupRoleMemberData'
 *   },
 * });
 */
export function useDeleteGroupRoleMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteGroupRoleMemberMutation,
    DeleteGroupRoleMemberMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteGroupRoleMemberMutation,
    DeleteGroupRoleMemberMutationVariables
  >(DeleteGroupRoleMemberDocument, options);
}
export type DeleteGroupRoleMemberMutationHookResult = ReturnType<
  typeof useDeleteGroupRoleMemberMutation
>;
export type DeleteGroupRoleMemberMutationResult =
  Apollo.MutationResult<DeleteGroupRoleMemberMutation>;
export type DeleteGroupRoleMemberMutationOptions = Apollo.BaseMutationOptions<
  DeleteGroupRoleMemberMutation,
  DeleteGroupRoleMemberMutationVariables
>;
export const DenyGroupMemberRequestDocument = gql`
  mutation DenyGroupMemberRequest($id: Int!) {
    denyGroupMemberRequest(id: $id)
  }
`;
export type DenyGroupMemberRequestMutationFn = Apollo.MutationFunction<
  DenyGroupMemberRequestMutation,
  DenyGroupMemberRequestMutationVariables
>;

/**
 * __useDenyGroupMemberRequestMutation__
 *
 * To run a mutation, you first call `useDenyGroupMemberRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDenyGroupMemberRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [denyGroupMemberRequestMutation, { data, loading, error }] = useDenyGroupMemberRequestMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDenyGroupMemberRequestMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DenyGroupMemberRequestMutation,
    DenyGroupMemberRequestMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DenyGroupMemberRequestMutation,
    DenyGroupMemberRequestMutationVariables
  >(DenyGroupMemberRequestDocument, options);
}
export type DenyGroupMemberRequestMutationHookResult = ReturnType<
  typeof useDenyGroupMemberRequestMutation
>;
export type DenyGroupMemberRequestMutationResult =
  Apollo.MutationResult<DenyGroupMemberRequestMutation>;
export type DenyGroupMemberRequestMutationOptions = Apollo.BaseMutationOptions<
  DenyGroupMemberRequestMutation,
  DenyGroupMemberRequestMutationVariables
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
export const UpdateGroupRoleDocument = gql`
  mutation UpdateGroupRole($groupRoleData: UpdateGroupRoleInput!) {
    updateGroupRole(groupRoleData: $groupRoleData) {
      groupRole {
        ...GroupRole
        permissions {
          ...GroupRolePermissions
        }
        members {
          ...RoleMember
        }
        availableUsersToAdd {
          ...UserAvatar
        }
        group {
          id
          myPermissions {
            ...GroupPermissions
          }
        }
      }
    }
  }
  ${GroupRoleFragmentDoc}
  ${GroupRolePermissionsFragmentDoc}
  ${RoleMemberFragmentDoc}
  ${UserAvatarFragmentDoc}
  ${GroupPermissionsFragmentDoc}
`;
export type UpdateGroupRoleMutationFn = Apollo.MutationFunction<
  UpdateGroupRoleMutation,
  UpdateGroupRoleMutationVariables
>;

/**
 * __useUpdateGroupRoleMutation__
 *
 * To run a mutation, you first call `useUpdateGroupRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupRoleMutation, { data, loading, error }] = useUpdateGroupRoleMutation({
 *   variables: {
 *      groupRoleData: // value for 'groupRoleData'
 *   },
 * });
 */
export function useUpdateGroupRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateGroupRoleMutation,
    UpdateGroupRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateGroupRoleMutation,
    UpdateGroupRoleMutationVariables
  >(UpdateGroupRoleDocument, options);
}
export type UpdateGroupRoleMutationHookResult = ReturnType<
  typeof useUpdateGroupRoleMutation
>;
export type UpdateGroupRoleMutationResult =
  Apollo.MutationResult<UpdateGroupRoleMutation>;
export type UpdateGroupRoleMutationOptions = Apollo.BaseMutationOptions<
  UpdateGroupRoleMutation,
  UpdateGroupRoleMutationVariables
>;
export const UpdateGroupSettingsDocument = gql`
  mutation UpdateGroupSettings(
    $groupConfigData: UpdateGroupConfigInput!
    $isLoggedIn: Boolean = true
  ) {
    updateGroupConfig(groupConfigData: $groupConfigData) {
      group {
        id
        ...GroupSettingsForm
        ...GroupProfileCard
        ...GroupCard
      }
    }
  }
  ${GroupSettingsFormFragmentDoc}
  ${GroupProfileCardFragmentDoc}
  ${GroupCardFragmentDoc}
`;
export type UpdateGroupSettingsMutationFn = Apollo.MutationFunction<
  UpdateGroupSettingsMutation,
  UpdateGroupSettingsMutationVariables
>;

/**
 * __useUpdateGroupSettingsMutation__
 *
 * To run a mutation, you first call `useUpdateGroupSettingsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGroupSettingsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGroupSettingsMutation, { data, loading, error }] = useUpdateGroupSettingsMutation({
 *   variables: {
 *      groupConfigData: // value for 'groupConfigData'
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function useUpdateGroupSettingsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateGroupSettingsMutation,
    UpdateGroupSettingsMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateGroupSettingsMutation,
    UpdateGroupSettingsMutationVariables
  >(UpdateGroupSettingsDocument, options);
}
export type UpdateGroupSettingsMutationHookResult = ReturnType<
  typeof useUpdateGroupSettingsMutation
>;
export type UpdateGroupSettingsMutationResult =
  Apollo.MutationResult<UpdateGroupSettingsMutation>;
export type UpdateGroupSettingsMutationOptions = Apollo.BaseMutationOptions<
  UpdateGroupSettingsMutation,
  UpdateGroupSettingsMutationVariables
>;
export const EditGroupDocument = gql`
  query EditGroup($name: String!) {
    group(name: $name) {
      ...GroupForm
      myPermissions {
        ...GroupPermissions
      }
    }
  }
  ${GroupFormFragmentDoc}
  ${GroupPermissionsFragmentDoc}
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
export const EditGroupRoleDocument = gql`
  query EditGroupRole($id: Int!) {
    groupRole(id: $id) {
      ...EditGroupRoleTabs
      group {
        id
        myPermissions {
          ...GroupPermissions
        }
      }
    }
  }
  ${EditGroupRoleTabsFragmentDoc}
  ${GroupPermissionsFragmentDoc}
`;

/**
 * __useEditGroupRoleQuery__
 *
 * To run a query within a React component, call `useEditGroupRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useEditGroupRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEditGroupRoleQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEditGroupRoleQuery(
  baseOptions: Apollo.QueryHookOptions<
    EditGroupRoleQuery,
    EditGroupRoleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<EditGroupRoleQuery, EditGroupRoleQueryVariables>(
    EditGroupRoleDocument,
    options
  );
}
export function useEditGroupRoleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    EditGroupRoleQuery,
    EditGroupRoleQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<EditGroupRoleQuery, EditGroupRoleQueryVariables>(
    EditGroupRoleDocument,
    options
  );
}
export type EditGroupRoleQueryHookResult = ReturnType<
  typeof useEditGroupRoleQuery
>;
export type EditGroupRoleLazyQueryHookResult = ReturnType<
  typeof useEditGroupRoleLazyQuery
>;
export type EditGroupRoleQueryResult = Apollo.QueryResult<
  EditGroupRoleQuery,
  EditGroupRoleQueryVariables
>;
export const GroupEventsTabDocument = gql`
  query GroupEventsTab($groupId: Int!, $isLoggedIn: Boolean!) {
    group(id: $groupId) {
      name
      futureEvents {
        ...EventCompact
      }
      pastEvents {
        ...EventCompact
      }
      myPermissions @include(if: $isLoggedIn) {
        manageEvents
        createEvents
      }
    }
  }
  ${EventCompactFragmentDoc}
`;

/**
 * __useGroupEventsTabQuery__
 *
 * To run a query within a React component, call `useGroupEventsTabQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupEventsTabQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupEventsTabQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function useGroupEventsTabQuery(
  baseOptions: Apollo.QueryHookOptions<
    GroupEventsTabQuery,
    GroupEventsTabQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GroupEventsTabQuery, GroupEventsTabQueryVariables>(
    GroupEventsTabDocument,
    options
  );
}
export function useGroupEventsTabLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupEventsTabQuery,
    GroupEventsTabQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GroupEventsTabQuery, GroupEventsTabQueryVariables>(
    GroupEventsTabDocument,
    options
  );
}
export type GroupEventsTabQueryHookResult = ReturnType<
  typeof useGroupEventsTabQuery
>;
export type GroupEventsTabLazyQueryHookResult = ReturnType<
  typeof useGroupEventsTabLazyQuery
>;
export type GroupEventsTabQueryResult = Apollo.QueryResult<
  GroupEventsTabQuery,
  GroupEventsTabQueryVariables
>;
export const GroupMemberRequestDocument = gql`
  query GroupMemberRequest($groupId: Int!) {
    groupMemberRequest(groupId: $groupId) {
      id
      user {
        id
      }
    }
  }
`;

/**
 * __useGroupMemberRequestQuery__
 *
 * To run a query within a React component, call `useGroupMemberRequestQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupMemberRequestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupMemberRequestQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupMemberRequestQuery(
  baseOptions: Apollo.QueryHookOptions<
    GroupMemberRequestQuery,
    GroupMemberRequestQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GroupMemberRequestQuery,
    GroupMemberRequestQueryVariables
  >(GroupMemberRequestDocument, options);
}
export function useGroupMemberRequestLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupMemberRequestQuery,
    GroupMemberRequestQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GroupMemberRequestQuery,
    GroupMemberRequestQueryVariables
  >(GroupMemberRequestDocument, options);
}
export type GroupMemberRequestQueryHookResult = ReturnType<
  typeof useGroupMemberRequestQuery
>;
export type GroupMemberRequestLazyQueryHookResult = ReturnType<
  typeof useGroupMemberRequestLazyQuery
>;
export type GroupMemberRequestQueryResult = Apollo.QueryResult<
  GroupMemberRequestQuery,
  GroupMemberRequestQueryVariables
>;
export const GroupMembersDocument = gql`
  query GroupMembers($name: String!) {
    group(name: $name) {
      id
      members {
        ...GroupMember
      }
    }
    me {
      id
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
export const GroupMembersByGroupIdDocument = gql`
  query GroupMembersByGroupId($groupId: Int!) {
    group(id: $groupId) {
      id
      members {
        id
        ...UserAvatar
      }
    }
  }
  ${UserAvatarFragmentDoc}
`;

/**
 * __useGroupMembersByGroupIdQuery__
 *
 * To run a query within a React component, call `useGroupMembersByGroupIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupMembersByGroupIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupMembersByGroupIdQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupMembersByGroupIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GroupMembersByGroupIdQuery,
    GroupMembersByGroupIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GroupMembersByGroupIdQuery,
    GroupMembersByGroupIdQueryVariables
  >(GroupMembersByGroupIdDocument, options);
}
export function useGroupMembersByGroupIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupMembersByGroupIdQuery,
    GroupMembersByGroupIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GroupMembersByGroupIdQuery,
    GroupMembersByGroupIdQueryVariables
  >(GroupMembersByGroupIdDocument, options);
}
export type GroupMembersByGroupIdQueryHookResult = ReturnType<
  typeof useGroupMembersByGroupIdQuery
>;
export type GroupMembersByGroupIdLazyQueryHookResult = ReturnType<
  typeof useGroupMembersByGroupIdLazyQuery
>;
export type GroupMembersByGroupIdQueryResult = Apollo.QueryResult<
  GroupMembersByGroupIdQuery,
  GroupMembersByGroupIdQueryVariables
>;
export const GroupProfileDocument = gql`
  query GroupProfile($name: String!, $isLoggedIn: Boolean!) {
    group(name: $name) {
      ...GroupProfileCard
      description
      feed {
        ...FeedItem
      }
    }
    me @include(if: $isLoggedIn) {
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
 *      isLoggedIn: // value for 'isLoggedIn'
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
export const GroupRoleByRoleIdDocument = gql`
  query GroupRoleByRoleId($id: Int!) {
    groupRole(id: $id) {
      id
      name
      color
      permissions {
        ...GroupRolePermissions
      }
      members {
        ...UserAvatar
      }
      availableUsersToAdd {
        ...UserAvatar
      }
    }
  }
  ${GroupRolePermissionsFragmentDoc}
  ${UserAvatarFragmentDoc}
`;

/**
 * __useGroupRoleByRoleIdQuery__
 *
 * To run a query within a React component, call `useGroupRoleByRoleIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupRoleByRoleIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupRoleByRoleIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGroupRoleByRoleIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GroupRoleByRoleIdQuery,
    GroupRoleByRoleIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GroupRoleByRoleIdQuery,
    GroupRoleByRoleIdQueryVariables
  >(GroupRoleByRoleIdDocument, options);
}
export function useGroupRoleByRoleIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupRoleByRoleIdQuery,
    GroupRoleByRoleIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GroupRoleByRoleIdQuery,
    GroupRoleByRoleIdQueryVariables
  >(GroupRoleByRoleIdDocument, options);
}
export type GroupRoleByRoleIdQueryHookResult = ReturnType<
  typeof useGroupRoleByRoleIdQuery
>;
export type GroupRoleByRoleIdLazyQueryHookResult = ReturnType<
  typeof useGroupRoleByRoleIdLazyQuery
>;
export type GroupRoleByRoleIdQueryResult = Apollo.QueryResult<
  GroupRoleByRoleIdQuery,
  GroupRoleByRoleIdQueryVariables
>;
export const GroupRolesDocument = gql`
  query GroupRoles($name: String!) {
    group(name: $name) {
      id
      myPermissions {
        ...GroupPermissions
      }
      roles {
        ...GroupRole
      }
    }
  }
  ${GroupPermissionsFragmentDoc}
  ${GroupRoleFragmentDoc}
`;

/**
 * __useGroupRolesQuery__
 *
 * To run a query within a React component, call `useGroupRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupRolesQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGroupRolesQuery(
  baseOptions: Apollo.QueryHookOptions<
    GroupRolesQuery,
    GroupRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GroupRolesQuery, GroupRolesQueryVariables>(
    GroupRolesDocument,
    options
  );
}
export function useGroupRolesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupRolesQuery,
    GroupRolesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GroupRolesQuery, GroupRolesQueryVariables>(
    GroupRolesDocument,
    options
  );
}
export type GroupRolesQueryHookResult = ReturnType<typeof useGroupRolesQuery>;
export type GroupRolesLazyQueryHookResult = ReturnType<
  typeof useGroupRolesLazyQuery
>;
export type GroupRolesQueryResult = Apollo.QueryResult<
  GroupRolesQuery,
  GroupRolesQueryVariables
>;
export const GroupRolesByGroupIdDocument = gql`
  query GroupRolesByGroupId($groupId: Int!) {
    group(id: $groupId) {
      id
      roles {
        id
        name
      }
    }
  }
`;

/**
 * __useGroupRolesByGroupIdQuery__
 *
 * To run a query within a React component, call `useGroupRolesByGroupIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupRolesByGroupIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupRolesByGroupIdQuery({
 *   variables: {
 *      groupId: // value for 'groupId'
 *   },
 * });
 */
export function useGroupRolesByGroupIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GroupRolesByGroupIdQuery,
    GroupRolesByGroupIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GroupRolesByGroupIdQuery,
    GroupRolesByGroupIdQueryVariables
  >(GroupRolesByGroupIdDocument, options);
}
export function useGroupRolesByGroupIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupRolesByGroupIdQuery,
    GroupRolesByGroupIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GroupRolesByGroupIdQuery,
    GroupRolesByGroupIdQueryVariables
  >(GroupRolesByGroupIdDocument, options);
}
export type GroupRolesByGroupIdQueryHookResult = ReturnType<
  typeof useGroupRolesByGroupIdQuery
>;
export type GroupRolesByGroupIdLazyQueryHookResult = ReturnType<
  typeof useGroupRolesByGroupIdLazyQuery
>;
export type GroupRolesByGroupIdQueryResult = Apollo.QueryResult<
  GroupRolesByGroupIdQuery,
  GroupRolesByGroupIdQueryVariables
>;
export const GroupSettingsDocument = gql`
  query GroupSettings($name: String!) {
    group(name: $name) {
      id
      ...GroupSettingsForm
      myPermissions {
        ...GroupPermissions
      }
    }
  }
  ${GroupSettingsFormFragmentDoc}
  ${GroupPermissionsFragmentDoc}
`;

/**
 * __useGroupSettingsQuery__
 *
 * To run a query within a React component, call `useGroupSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGroupSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGroupSettingsQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useGroupSettingsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GroupSettingsQuery,
    GroupSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GroupSettingsQuery, GroupSettingsQueryVariables>(
    GroupSettingsDocument,
    options
  );
}
export function useGroupSettingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GroupSettingsQuery,
    GroupSettingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GroupSettingsQuery, GroupSettingsQueryVariables>(
    GroupSettingsDocument,
    options
  );
}
export type GroupSettingsQueryHookResult = ReturnType<
  typeof useGroupSettingsQuery
>;
export type GroupSettingsLazyQueryHookResult = ReturnType<
  typeof useGroupSettingsLazyQuery
>;
export type GroupSettingsQueryResult = Apollo.QueryResult<
  GroupSettingsQuery,
  GroupSettingsQueryVariables
>;
export const GroupsDocument = gql`
  query Groups($isLoggedIn: Boolean = true) {
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
 *      isLoggedIn: // value for 'isLoggedIn'
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
export const MemberRequestsDocument = gql`
  query MemberRequests($groupName: String!) {
    group(name: $groupName) {
      id
      memberRequests {
        ...MemberRequest
      }
    }
  }
  ${MemberRequestFragmentDoc}
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
export const PublicGroupsDocument = gql`
  query PublicGroups($isLoggedIn: Boolean = false) {
    publicGroups {
      ...GroupCard
    }
  }
  ${GroupCardFragmentDoc}
`;

/**
 * __usePublicGroupsQuery__
 *
 * To run a query within a React component, call `usePublicGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicGroupsQuery({
 *   variables: {
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function usePublicGroupsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PublicGroupsQuery,
    PublicGroupsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PublicGroupsQuery, PublicGroupsQueryVariables>(
    PublicGroupsDocument,
    options
  );
}
export function usePublicGroupsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PublicGroupsQuery,
    PublicGroupsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PublicGroupsQuery, PublicGroupsQueryVariables>(
    PublicGroupsDocument,
    options
  );
}
export type PublicGroupsQueryHookResult = ReturnType<
  typeof usePublicGroupsQuery
>;
export type PublicGroupsLazyQueryHookResult = ReturnType<
  typeof usePublicGroupsLazyQuery
>;
export type PublicGroupsQueryResult = Apollo.QueryResult<
  PublicGroupsQuery,
  PublicGroupsQueryVariables
>;
export const PublicGroupsFeedDocument = gql`
  query PublicGroupsFeed($isLoggedIn: Boolean = false) {
    publicGroupsFeed {
      ...FeedItem
    }
  }
  ${FeedItemFragmentDoc}
`;

/**
 * __usePublicGroupsFeedQuery__
 *
 * To run a query within a React component, call `usePublicGroupsFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicGroupsFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicGroupsFeedQuery({
 *   variables: {
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function usePublicGroupsFeedQuery(
  baseOptions?: Apollo.QueryHookOptions<
    PublicGroupsFeedQuery,
    PublicGroupsFeedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PublicGroupsFeedQuery, PublicGroupsFeedQueryVariables>(
    PublicGroupsFeedDocument,
    options
  );
}
export function usePublicGroupsFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PublicGroupsFeedQuery,
    PublicGroupsFeedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    PublicGroupsFeedQuery,
    PublicGroupsFeedQueryVariables
  >(PublicGroupsFeedDocument, options);
}
export type PublicGroupsFeedQueryHookResult = ReturnType<
  typeof usePublicGroupsFeedQuery
>;
export type PublicGroupsFeedLazyQueryHookResult = ReturnType<
  typeof usePublicGroupsFeedLazyQuery
>;
export type PublicGroupsFeedQueryResult = Apollo.QueryResult<
  PublicGroupsFeedQuery,
  PublicGroupsFeedQueryVariables
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
        ...ServerInviteCard
      }
    }
  }
  ${ServerInviteCardFragmentDoc}
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
      ...ServerInviteCard
    }
    me {
      id
      serverPermissions {
        ...ServerPermissions
      }
    }
  }
  ${ServerInviteCardFragmentDoc}
  ${ServerPermissionsFragmentDoc}
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
export const DeleteLikeDocument = gql`
  mutation DeleteLike($likeData: DeleteLikeInput!) {
    deleteLike(likeData: $likeData)
  }
`;
export type DeleteLikeMutationFn = Apollo.MutationFunction<
  DeleteLikeMutation,
  DeleteLikeMutationVariables
>;

/**
 * __useDeleteLikeMutation__
 *
 * To run a mutation, you first call `useDeleteLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLikeMutation, { data, loading, error }] = useDeleteLikeMutation({
 *   variables: {
 *      likeData: // value for 'likeData'
 *   },
 * });
 */
export function useDeleteLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteLikeMutation,
    DeleteLikeMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteLikeMutation, DeleteLikeMutationVariables>(
    DeleteLikeDocument,
    options
  );
}
export type DeleteLikeMutationHookResult = ReturnType<
  typeof useDeleteLikeMutation
>;
export type DeleteLikeMutationResult =
  Apollo.MutationResult<DeleteLikeMutation>;
export type DeleteLikeMutationOptions = Apollo.BaseMutationOptions<
  DeleteLikeMutation,
  DeleteLikeMutationVariables
>;
export const CreatePostDocument = gql`
  mutation CreatePost(
    $postData: CreatePostInput!
    $isLoggedIn: Boolean = true
  ) {
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
 *      isLoggedIn: // value for 'isLoggedIn'
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
export const LikePostDocument = gql`
  mutation LikePost($likeData: CreateLikeInput!, $isLoggedIn: Boolean = true) {
    createLike(likeData: $likeData) {
      like {
        id
        post {
          ...PostCardFooter
        }
      }
    }
  }
  ${PostCardFooterFragmentDoc}
`;
export type LikePostMutationFn = Apollo.MutationFunction<
  LikePostMutation,
  LikePostMutationVariables
>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      likeData: // value for 'likeData'
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function useLikePostMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LikePostMutation,
    LikePostMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(
    LikePostDocument,
    options
  );
}
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<
  LikePostMutation,
  LikePostMutationVariables
>;
export const UpdatePostDocument = gql`
  mutation UpdatePost(
    $postData: UpdatePostInput!
    $isLoggedIn: Boolean = true
  ) {
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
 *      isLoggedIn: // value for 'isLoggedIn'
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
  query Post($id: Int!, $isLoggedIn: Boolean!) {
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
 *      isLoggedIn: // value for 'isLoggedIn'
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
  mutation CreateProposal(
    $proposalData: CreateProposalInput!
    $isLoggedIn: Boolean = true
  ) {
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
 *      isLoggedIn: // value for 'isLoggedIn'
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
  mutation UpdateProposal(
    $proposalData: UpdateProposalInput!
    $isLoggedIn: Boolean = true
  ) {
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
 *      isLoggedIn: // value for 'isLoggedIn'
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
  query Proposal($id: Int!, $isLoggedIn: Boolean!) {
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
 *      isLoggedIn: // value for 'isLoggedIn'
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
export const CreateServerRoleDocument = gql`
  mutation CreateServerRole($serverRoleData: CreateServerRoleInput!) {
    createServerRole(serverRoleData: $serverRoleData) {
      serverRole {
        ...ServerRole
      }
    }
  }
  ${ServerRoleFragmentDoc}
`;
export type CreateServerRoleMutationFn = Apollo.MutationFunction<
  CreateServerRoleMutation,
  CreateServerRoleMutationVariables
>;

/**
 * __useCreateServerRoleMutation__
 *
 * To run a mutation, you first call `useCreateServerRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServerRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServerRoleMutation, { data, loading, error }] = useCreateServerRoleMutation({
 *   variables: {
 *      serverRoleData: // value for 'serverRoleData'
 *   },
 * });
 */
export function useCreateServerRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateServerRoleMutation,
    CreateServerRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateServerRoleMutation,
    CreateServerRoleMutationVariables
  >(CreateServerRoleDocument, options);
}
export type CreateServerRoleMutationHookResult = ReturnType<
  typeof useCreateServerRoleMutation
>;
export type CreateServerRoleMutationResult =
  Apollo.MutationResult<CreateServerRoleMutation>;
export type CreateServerRoleMutationOptions = Apollo.BaseMutationOptions<
  CreateServerRoleMutation,
  CreateServerRoleMutationVariables
>;
export const DeleteServerRoleDocument = gql`
  mutation DeleteServerRole($id: Int!) {
    deleteServerRole(id: $id)
  }
`;
export type DeleteServerRoleMutationFn = Apollo.MutationFunction<
  DeleteServerRoleMutation,
  DeleteServerRoleMutationVariables
>;

/**
 * __useDeleteServerRoleMutation__
 *
 * To run a mutation, you first call `useDeleteServerRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServerRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServerRoleMutation, { data, loading, error }] = useDeleteServerRoleMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteServerRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteServerRoleMutation,
    DeleteServerRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteServerRoleMutation,
    DeleteServerRoleMutationVariables
  >(DeleteServerRoleDocument, options);
}
export type DeleteServerRoleMutationHookResult = ReturnType<
  typeof useDeleteServerRoleMutation
>;
export type DeleteServerRoleMutationResult =
  Apollo.MutationResult<DeleteServerRoleMutation>;
export type DeleteServerRoleMutationOptions = Apollo.BaseMutationOptions<
  DeleteServerRoleMutation,
  DeleteServerRoleMutationVariables
>;
export const DeleteServerRoleMemberDocument = gql`
  mutation DeleteServerRoleMember(
    $serverRoleMemberData: DeleteServerRoleMemberInput!
  ) {
    deleteServerRoleMember(serverRoleMemberData: $serverRoleMemberData) {
      serverRole {
        id
        availableUsersToAdd {
          ...UserAvatar
        }
      }
      me {
        id
        serverPermissions {
          ...ServerPermissions
        }
      }
    }
  }
  ${UserAvatarFragmentDoc}
  ${ServerPermissionsFragmentDoc}
`;
export type DeleteServerRoleMemberMutationFn = Apollo.MutationFunction<
  DeleteServerRoleMemberMutation,
  DeleteServerRoleMemberMutationVariables
>;

/**
 * __useDeleteServerRoleMemberMutation__
 *
 * To run a mutation, you first call `useDeleteServerRoleMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServerRoleMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServerRoleMemberMutation, { data, loading, error }] = useDeleteServerRoleMemberMutation({
 *   variables: {
 *      serverRoleMemberData: // value for 'serverRoleMemberData'
 *   },
 * });
 */
export function useDeleteServerRoleMemberMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteServerRoleMemberMutation,
    DeleteServerRoleMemberMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteServerRoleMemberMutation,
    DeleteServerRoleMemberMutationVariables
  >(DeleteServerRoleMemberDocument, options);
}
export type DeleteServerRoleMemberMutationHookResult = ReturnType<
  typeof useDeleteServerRoleMemberMutation
>;
export type DeleteServerRoleMemberMutationResult =
  Apollo.MutationResult<DeleteServerRoleMemberMutation>;
export type DeleteServerRoleMemberMutationOptions = Apollo.BaseMutationOptions<
  DeleteServerRoleMemberMutation,
  DeleteServerRoleMemberMutationVariables
>;
export const UpdateServerRoleDocument = gql`
  mutation UpdateServerRole($serverRoleData: UpdateServerRoleInput!) {
    updateServerRole(serverRoleData: $serverRoleData) {
      serverRole {
        ...ServerRole
        permissions {
          ...ServerRolePermissions
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
        serverPermissions {
          ...ServerPermissions
        }
      }
    }
  }
  ${ServerRoleFragmentDoc}
  ${ServerRolePermissionsFragmentDoc}
  ${RoleMemberFragmentDoc}
  ${UserAvatarFragmentDoc}
  ${ServerPermissionsFragmentDoc}
`;
export type UpdateServerRoleMutationFn = Apollo.MutationFunction<
  UpdateServerRoleMutation,
  UpdateServerRoleMutationVariables
>;

/**
 * __useUpdateServerRoleMutation__
 *
 * To run a mutation, you first call `useUpdateServerRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServerRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServerRoleMutation, { data, loading, error }] = useUpdateServerRoleMutation({
 *   variables: {
 *      serverRoleData: // value for 'serverRoleData'
 *   },
 * });
 */
export function useUpdateServerRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateServerRoleMutation,
    UpdateServerRoleMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateServerRoleMutation,
    UpdateServerRoleMutationVariables
  >(UpdateServerRoleDocument, options);
}
export type UpdateServerRoleMutationHookResult = ReturnType<
  typeof useUpdateServerRoleMutation
>;
export type UpdateServerRoleMutationResult =
  Apollo.MutationResult<UpdateServerRoleMutation>;
export type UpdateServerRoleMutationOptions = Apollo.BaseMutationOptions<
  UpdateServerRoleMutation,
  UpdateServerRoleMutationVariables
>;
export const EditServerRoleDocument = gql`
  query EditServerRole($id: Int!) {
    serverRole(id: $id) {
      ...EditServerRoleTabs
    }
    me {
      id
      serverPermissions {
        ...ServerPermissions
      }
    }
  }
  ${EditServerRoleTabsFragmentDoc}
  ${ServerPermissionsFragmentDoc}
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
export const RolesByGroupIdDocument = gql`
  query RolesByGroupId($id: Int!) {
    group(id: $id) {
      id
      roles {
        ...EditGroupRoleTabs
      }
    }
  }
  ${EditGroupRoleTabsFragmentDoc}
`;

/**
 * __useRolesByGroupIdQuery__
 *
 * To run a query within a React component, call `useRolesByGroupIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRolesByGroupIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRolesByGroupIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRolesByGroupIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    RolesByGroupIdQuery,
    RolesByGroupIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<RolesByGroupIdQuery, RolesByGroupIdQueryVariables>(
    RolesByGroupIdDocument,
    options
  );
}
export function useRolesByGroupIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    RolesByGroupIdQuery,
    RolesByGroupIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<RolesByGroupIdQuery, RolesByGroupIdQueryVariables>(
    RolesByGroupIdDocument,
    options
  );
}
export type RolesByGroupIdQueryHookResult = ReturnType<
  typeof useRolesByGroupIdQuery
>;
export type RolesByGroupIdLazyQueryHookResult = ReturnType<
  typeof useRolesByGroupIdLazyQuery
>;
export type RolesByGroupIdQueryResult = Apollo.QueryResult<
  RolesByGroupIdQuery,
  RolesByGroupIdQueryVariables
>;
export const ServerRolesDocument = gql`
  query ServerRoles {
    serverRoles {
      ...ServerRole
    }
    me {
      id
      serverPermissions {
        manageRoles
      }
    }
  }
  ${ServerRoleFragmentDoc}
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
export const FollowUserDocument = gql`
  mutation FollowUser($id: Int!, $isLoggedIn: Boolean = true) {
    followUser(id: $id) {
      followedUser {
        id
        followers {
          ...Follow
        }
        ...UserProfileCard
      }
      follower {
        id
        homeFeed {
          ...FeedItem
        }
        following {
          ...Follow
        }
        ...UserProfileCard
      }
    }
  }
  ${FollowFragmentDoc}
  ${UserProfileCardFragmentDoc}
  ${FeedItemFragmentDoc}
`;
export type FollowUserMutationFn = Apollo.MutationFunction<
  FollowUserMutation,
  FollowUserMutationVariables
>;

/**
 * __useFollowUserMutation__
 *
 * To run a mutation, you first call `useFollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followUserMutation, { data, loading, error }] = useFollowUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function useFollowUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    FollowUserMutation,
    FollowUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<FollowUserMutation, FollowUserMutationVariables>(
    FollowUserDocument,
    options
  );
}
export type FollowUserMutationHookResult = ReturnType<
  typeof useFollowUserMutation
>;
export type FollowUserMutationResult =
  Apollo.MutationResult<FollowUserMutation>;
export type FollowUserMutationOptions = Apollo.BaseMutationOptions<
  FollowUserMutation,
  FollowUserMutationVariables
>;
export const UnfollowUserDocument = gql`
  mutation UnfollowUser($id: Int!) {
    unfollowUser(id: $id)
  }
`;
export type UnfollowUserMutationFn = Apollo.MutationFunction<
  UnfollowUserMutation,
  UnfollowUserMutationVariables
>;

/**
 * __useUnfollowUserMutation__
 *
 * To run a mutation, you first call `useUnfollowUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowUserMutation, { data, loading, error }] = useUnfollowUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUnfollowUserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UnfollowUserMutation,
    UnfollowUserMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UnfollowUserMutation,
    UnfollowUserMutationVariables
  >(UnfollowUserDocument, options);
}
export type UnfollowUserMutationHookResult = ReturnType<
  typeof useUnfollowUserMutation
>;
export type UnfollowUserMutationResult =
  Apollo.MutationResult<UnfollowUserMutation>;
export type UnfollowUserMutationOptions = Apollo.BaseMutationOptions<
  UnfollowUserMutation,
  UnfollowUserMutationVariables
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
    }
  }
  ${UserProfileCardFragmentDoc}
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
export const FollowersDocument = gql`
  query Followers($name: String!) {
    user(name: $name) {
      id
      followerCount
      followers {
        ...Follow
      }
    }
    me {
      id
    }
  }
  ${FollowFragmentDoc}
`;

/**
 * __useFollowersQuery__
 *
 * To run a query within a React component, call `useFollowersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowersQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useFollowersQuery(
  baseOptions: Apollo.QueryHookOptions<FollowersQuery, FollowersQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FollowersQuery, FollowersQueryVariables>(
    FollowersDocument,
    options
  );
}
export function useFollowersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FollowersQuery,
    FollowersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FollowersQuery, FollowersQueryVariables>(
    FollowersDocument,
    options
  );
}
export type FollowersQueryHookResult = ReturnType<typeof useFollowersQuery>;
export type FollowersLazyQueryHookResult = ReturnType<
  typeof useFollowersLazyQuery
>;
export type FollowersQueryResult = Apollo.QueryResult<
  FollowersQuery,
  FollowersQueryVariables
>;
export const FollowingDocument = gql`
  query Following($name: String!) {
    user(name: $name) {
      id
      followingCount
      following {
        ...Follow
      }
    }
    me {
      id
    }
  }
  ${FollowFragmentDoc}
`;

/**
 * __useFollowingQuery__
 *
 * To run a query within a React component, call `useFollowingQuery` and pass it any options that fit your needs.
 * When your component renders, `useFollowingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFollowingQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useFollowingQuery(
  baseOptions: Apollo.QueryHookOptions<FollowingQuery, FollowingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FollowingQuery, FollowingQueryVariables>(
    FollowingDocument,
    options
  );
}
export function useFollowingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    FollowingQuery,
    FollowingQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FollowingQuery, FollowingQueryVariables>(
    FollowingDocument,
    options
  );
}
export type FollowingQueryHookResult = ReturnType<typeof useFollowingQuery>;
export type FollowingLazyQueryHookResult = ReturnType<
  typeof useFollowingLazyQuery
>;
export type FollowingQueryResult = Apollo.QueryResult<
  FollowingQuery,
  FollowingQueryVariables
>;
export const HomeFeedDocument = gql`
  query HomeFeed($isLoggedIn: Boolean = true) {
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
 * __useHomeFeedQuery__
 *
 * To run a query within a React component, call `useHomeFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeFeedQuery({
 *   variables: {
 *      isLoggedIn: // value for 'isLoggedIn'
 *   },
 * });
 */
export function useHomeFeedQuery(
  baseOptions?: Apollo.QueryHookOptions<HomeFeedQuery, HomeFeedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HomeFeedQuery, HomeFeedQueryVariables>(
    HomeFeedDocument,
    options
  );
}
export function useHomeFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    HomeFeedQuery,
    HomeFeedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HomeFeedQuery, HomeFeedQueryVariables>(
    HomeFeedDocument,
    options
  );
}
export type HomeFeedQueryHookResult = ReturnType<typeof useHomeFeedQuery>;
export type HomeFeedLazyQueryHookResult = ReturnType<
  typeof useHomeFeedLazyQuery
>;
export type HomeFeedQueryResult = Apollo.QueryResult<
  HomeFeedQuery,
  HomeFeedQueryVariables
>;
export const IsFirstUserDocument = gql`
  query IsFirstUser {
    isFirstUser
  }
`;

/**
 * __useIsFirstUserQuery__
 *
 * To run a query within a React component, call `useIsFirstUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsFirstUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsFirstUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsFirstUserQuery(
  baseOptions?: Apollo.QueryHookOptions<
    IsFirstUserQuery,
    IsFirstUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IsFirstUserQuery, IsFirstUserQueryVariables>(
    IsFirstUserDocument,
    options
  );
}
export function useIsFirstUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    IsFirstUserQuery,
    IsFirstUserQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IsFirstUserQuery, IsFirstUserQueryVariables>(
    IsFirstUserDocument,
    options
  );
}
export type IsFirstUserQueryHookResult = ReturnType<typeof useIsFirstUserQuery>;
export type IsFirstUserLazyQueryHookResult = ReturnType<
  typeof useIsFirstUserLazyQuery
>;
export type IsFirstUserQueryResult = Apollo.QueryResult<
  IsFirstUserQuery,
  IsFirstUserQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      ...UserAvatar
      serverPermissions {
        ...ServerPermissions
      }
      joinedGroups {
        id
        name
      }
    }
  }
  ${UserAvatarFragmentDoc}
  ${ServerPermissionsFragmentDoc}
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
  query UserProfile($name: String, $isLoggedIn: Boolean = true) {
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
 *      isLoggedIn: // value for 'isLoggedIn'
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
export const UsersByIdsDocument = gql`
  query UsersByIds($userIds: [Int!]!) {
    usersByIds(ids: $userIds) {
      id
      ...UserAvatar
    }
  }
  ${UserAvatarFragmentDoc}
`;

/**
 * __useUsersByIdsQuery__
 *
 * To run a query within a React component, call `useUsersByIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersByIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersByIdsQuery({
 *   variables: {
 *      userIds: // value for 'userIds'
 *   },
 * });
 */
export function useUsersByIdsQuery(
  baseOptions: Apollo.QueryHookOptions<
    UsersByIdsQuery,
    UsersByIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersByIdsQuery, UsersByIdsQueryVariables>(
    UsersByIdsDocument,
    options
  );
}
export function useUsersByIdsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UsersByIdsQuery,
    UsersByIdsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersByIdsQuery, UsersByIdsQueryVariables>(
    UsersByIdsDocument,
    options
  );
}
export type UsersByIdsQueryHookResult = ReturnType<typeof useUsersByIdsQuery>;
export type UsersByIdsLazyQueryHookResult = ReturnType<
  typeof useUsersByIdsLazyQuery
>;
export type UsersByIdsQueryResult = Apollo.QueryResult<
  UsersByIdsQuery,
  UsersByIdsQueryVariables
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
