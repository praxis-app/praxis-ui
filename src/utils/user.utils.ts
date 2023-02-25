import { NavigationPaths } from "../constants/common.constants";

export const getUserProfilePath = (userName?: string) =>
  userName ? `${NavigationPaths.Users}/${userName}` : "/";
