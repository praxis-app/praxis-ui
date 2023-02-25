import "react-i18next";
import en from "./locales/en.json";

export type EnJson = typeof en;

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: {
      ns1: EnJson;
    };
  }
}
