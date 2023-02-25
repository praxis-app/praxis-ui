import { ApolloProvider } from "@apollo/client";
import createCache from "@emotion/cache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import type { AppProps } from "next/app";
import client from "../apollo/client";
import AuthWrapper from "../components/Auth/AuthWrapper";
import Layout from "../components/_App/Layout";
import "../i18n/i18n.config";
import theme from "../theme";
import "../theme/styles.css";
import { initAxe } from "../utils/common.utils";

const clientSideEmotionCache = createCache({ key: "css" });

initAxe();

interface Props extends AppProps {
  emotionCache?: EmotionCache;
}

const App = ({
  emotionCache = clientSideEmotionCache,
  pageProps,
  Component,
}: Props) => (
  <ApolloProvider client={client}>
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthWrapper>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </AuthWrapper>
      </ThemeProvider>
    </CacheProvider>
  </ApolloProvider>
);

export default App;
