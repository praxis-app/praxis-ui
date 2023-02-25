import client from "../apollo/client";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../apollo/cache";
import { LogOutDocument } from "../apollo/gen";

/**
 * Alternative function for signing out user outside of component logic.
 */
export const logOutUser = async () => {
  await client.mutate({ mutation: LogOutDocument });
  isLoggedInVar(false);
  isAuthLoadingVar(false);
  isRefreshingTokenVar(false);
};
