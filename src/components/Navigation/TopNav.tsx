import { Search as SearchIcon } from "@mui/icons-material";
import {
  AppBar,
  AppBarProps,
  IconButton,
  SxProps,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { NavigationPaths } from "../../constants/common.constants";
import { useIsDesktop } from "../../hooks/common.hooks";
import { inDevToast } from "../../utils/common.utils";
import LevelOneHeading from "../Shared/LevelOneHeading";
import Link from "../Shared/Link";
import TopNavDesktop from "./TopNavDesktop";

interface Props {
  appBarProps?: AppBarProps;
}

const TopNav = ({ appBarProps }: Props) => {
  const { asPath, reload } = useRouter();
  const { t } = useTranslation();
  const isDesktop = useIsDesktop();
  const theme = useTheme();

  const appBarStyles: SxProps = {
    background: theme.palette.background.navigation,
    boxShadow: "none",
    transition: "none",
  };

  const brandStyles: CSSProperties = {
    color: theme.palette.common.white,
    cursor: "pointer",
    fontFamily: "Inter Extra Bold",
    fontSize: isDesktop ? 24 : 18,
    letterSpacing: 0.25,
    textTransform: "none",
  };

  const desktopToolbarStyles: SxProps = {
    alignSelf: "center",
    width: "calc(100% - 200px)",
    [theme.breakpoints.up("sm")]: {
      minHeight: 60,
    },
  };

  const toolbarStyles: SxProps = {
    display: "flex",
    justifyContent: "space-between",
    ...(isDesktop ? desktopToolbarStyles : {}),
  };

  const renderBrand = () => {
    if (asPath === NavigationPaths.Home) {
      return (
        <LevelOneHeading onClick={() => reload()} sx={brandStyles}>
          {t("brand")}
        </LevelOneHeading>
      );
    }
    return (
      <Link href={NavigationPaths.Home}>
        <LevelOneHeading sx={brandStyles}>{t("brand")}</LevelOneHeading>
      </Link>
    );
  };

  return (
    <AppBar role="banner" position="fixed" sx={appBarStyles} {...appBarProps}>
      <Toolbar sx={toolbarStyles}>
        {renderBrand()}

        {isDesktop ? (
          <TopNavDesktop />
        ) : (
          <IconButton
            aria-label={t("labels.menu")}
            edge="end"
            onClick={inDevToast}
            size="large"
          >
            <SearchIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
