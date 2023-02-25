import { Container } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useAboveBreakpoint, useIsDesktop } from "../../hooks/common.hooks";
import BottomNav from "../Navigation/BottomNav";
import LeftNav from "../Navigation/LeftNav";
import NavDrawer from "../Navigation/NavDrawer";
import ScrollToTop from "../Navigation/ScrollToTop";
import TopNav from "../Navigation/TopNav";
import Breadcrumbs from "../Shared/Breadcrumbs";
import Toast from "../Shared/Toast";
import HeadContent from "./HeadContent";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();
  const isLarge = useAboveBreakpoint("lg");

  return (
    <>
      <Head>
        <HeadContent />
        <title>{t("brand")}</title>
      </Head>

      <TopNav />
      <NavDrawer />
      {!isLarge && <BottomNav />}
      {isLarge && <LeftNav />}

      <Container maxWidth="sm">
        <main role="main">
          <Breadcrumbs />

          {children}

          <Toast />
          {isDesktop && <ScrollToTop />}
        </main>
      </Container>
    </>
  );
};

export default Layout;
