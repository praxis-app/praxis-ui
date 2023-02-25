import { ApolloClient, from } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { API_ROOT, Environments } from "../constants/common.constants";
import refreshTokenLink from "./auth/links/refresh-token.link";
import cache from "./cache";

const terminatingLink = createUploadLink({
  uri: `${API_ROOT}/graphql`,
  headers: {
    "Apollo-Require-Preflight": true,
  },
});

const client = new ApolloClient({
  link: from([refreshTokenLink, terminatingLink]),
  connectToDevTools: process.env.NODE_ENV !== Environments.Production,
  cache,
});

export default client;
