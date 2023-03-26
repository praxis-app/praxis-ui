export const API_ROOT = "/api";

export const FORBIDDEN = "Forbidden";
export const UNAUTHORIZED = "Unauthorized";

export const MIDDOT_WITH_SPACES = " · ";
export const SCROLL_DURATION = 250;

export enum NavigationPaths {
  About = "/about",
  Edit = "/edit",
  Events = "/events",
  Groups = "/groups",
  Home = "/",
  Invites = "/invites",
  LogIn = "/auth/login",
  Posts = "/posts",
  Proposals = "/proposals",
  Following = "/following",
  Followers = "/followers",
  Roles = "/roles",
  SignUp = "/auth/signup",
  Users = "/users",
}

export enum TypeNames {
  Group = "Group",
  GroupMember = "GroupMember",
  Image = "Image",
  Like = "Like",
  MemberRequest = "MemberRequest",
  Post = "Post",
  Proposal = "Proposal",
  Role = "Role",
  ServerInvite = "ServerInvite",
  User = "User",
}

export enum MutationNames {
  RefreshToken = "RefreshToken",
}

export enum FieldNames {
  Body = "body",
  Description = "description",
  Email = "email",
  Images = "images",
  Name = "name",
  Password = "password",
  Query = "query",
}

export enum Environments {
  Development = "development",
  Production = "production",
}

export enum BrowserEvents {
  Keydown = "keydown",
  Resize = "resize",
  Scroll = "scroll",
}

export enum KeyCodes {
  Enter = "Enter",
  Escape = "Escape",
}

export enum Time {
  Minute = 60,
  Hour = 3600,
  Day = 86400,
  Week = 604800,
  Month = 2628000,
}

export enum TruncationSizes {
  ExtraSmall = 25,
  Small = 40,
  Medium = 65,
  Large = 175,
}
