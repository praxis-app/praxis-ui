// TODO: Add more comments below to explain how refreshTokenLink works

import { Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  MutationNames,
  UNAUTHORIZED,
} from "../../../constants/common.constants";
import { logOutUser } from "../../../utils/auth.utils";
import { formatGQLError } from "../../../utils/error.utils";
import { isRefreshingTokenVar } from "../../cache";
import client from "../../client";
import { RefreshTokenDocument } from "../../gen";

type Callback = (arg: unknown) => void;

let tokenSubscribers: Callback[] = [];

const subscribeTokenRefresh = (cb: Callback) => {
  tokenSubscribers.push(cb);
};
const onTokenRefreshed = (err: unknown) => {
  tokenSubscribers.map((cb: Callback) => cb(err));
};
const prepareExit = () => {
  onTokenRefreshed(null);
  tokenSubscribers = [];
};

export const refreshToken = async () => {
  try {
    isRefreshingTokenVar(true);
    await client.mutate({ mutation: RefreshTokenDocument });
  } catch (err) {
    await logOutUser();
    throw err;
  } finally {
    isRefreshingTokenVar(false);
  }
};

const refreshTokenLink = onError(
  ({ graphQLErrors, networkError, operation, response, forward }) =>
    new Observable((observer) => {
      if (graphQLErrors) {
        graphQLErrors.map(async ({ message, locations, path }, index) => {
          console.error(formatGQLError(message, path, locations));

          if (!response) {
            return observer.error(graphQLErrors[index]);
          }

          if (message === UNAUTHORIZED) {
            // Ignore unauthroized errors for refreshToken mutations
            if (operation.operationName === MutationNames.RefreshToken) {
              return observer.error(graphQLErrors[index]);
            }

            const retryRequest = () => {
              const subscriber = {
                complete: observer.complete.bind(observer),
                error: observer.error.bind(observer),
                next: observer.next.bind(observer),
              };
              return forward(operation).subscribe(subscriber);
            };

            if (!isRefreshingTokenVar()) {
              try {
                await refreshToken();
                prepareExit();
                return retryRequest();
              } catch {
                prepareExit();
                return observer.error(graphQLErrors[index]);
              }
            }

            const tokenSubscriber = new Promise((resolve) => {
              subscribeTokenRefresh((errRefreshing: unknown) => {
                if (!errRefreshing) {
                  return resolve(retryRequest());
                }
              });
            });
            return tokenSubscriber;
          }
          return observer.next(response);
        });
      }

      if (networkError) {
        console.error(`[Network error]: ${networkError}`);
        return observer.error(networkError);
      }
    })
);

export default refreshTokenLink;
