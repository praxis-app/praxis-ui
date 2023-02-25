import { InMemoryCache, makeVar } from "@apollo/client";
import { Breadcrumb, ToastNotification } from "../types/common.types";

// App state
export const breadcrumbsVar = makeVar<{
  path: string | null;
  breadcrumbs: Breadcrumb[];
}>({ path: null, breadcrumbs: [] });
export const toastVar = makeVar<ToastNotification | null>(null);
export const isNavDrawerOpenVar = makeVar(false);

// Authentication state
export const isLoggedInVar = makeVar(false);
export const isAuthLoadingVar = makeVar(false);
export const isRefreshingTokenVar = makeVar(false);
export const inviteTokenVar = makeVar("");

/**
 * TODO: Determine whether defining custom merge functions as done below is
 * the correct way to silence warnings seen when deleting items from cache
 */
const cache = new InMemoryCache({
  possibleTypes: {
    FeedItem: ["Post", "Proposal"],
  },
  typePolicies: {
    Query: {
      fields: {
        posts: {
          merge(_, incoming) {
            return incoming;
          },
        },
        groups: {
          merge(_, incoming) {
            return incoming;
          },
        },
        memberRequests: {
          merge(_, incoming) {
            return incoming;
          },
        },
        serverRoles: {
          merge(_, incoming) {
            return incoming;
          },
        },
        serverInvites: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    User: {
      fields: {
        homeFeed: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Post: {
      fields: {
        images: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Proposal: {
      fields: {
        images: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Group: {
      fields: {
        posts: {
          merge(_, incoming) {
            return incoming;
          },
        },
        members: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
    Role: {
      fields: {
        availableUsersToAdd: {
          merge(_, incoming) {
            return incoming;
          },
        },
        members: {
          merge(_, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

export default cache;
