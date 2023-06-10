import theme from "../../styles/theme";

const HeadContent = () => (
  <>
    <meta charSet="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="theme-color" content={theme.palette.primary.main} />

    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width"
    />
  </>
);

export default HeadContent;
