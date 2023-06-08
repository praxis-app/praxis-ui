import client from "../apollo/client";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../apollo/cache";
import { LogOutDocument } from "../apollo/gen";
import { NavigationPaths } from "../constants/common.constants";
import { redirectTo } from "./common.utils";

/**
 * Alternative function for signing out user outside of component logic.
 */
export const logOutUser = async () => {
  await client.mutate({ mutation: LogOutDocument });
  isLoggedInVar(false);
  isAuthLoadingVar(false);
  isRefreshingTokenVar(false);
  redirectTo(NavigationPaths.LogIn);
};
