import { createContext } from "react";
import type { LanguageState } from "./ToggleLanguage";
import type { PinkishState } from "./TogglePinkishness";

export type DemoContextType = PinkishState & LanguageState;

export const DemoContext = createContext<DemoContextType>({
  isPink: false,
  setIsPink: () => {},
  lang: "en",
  setLang: () => {},
});