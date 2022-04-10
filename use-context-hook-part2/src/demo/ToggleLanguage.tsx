import { useContext, useMemo } from "react";
import { PinkAwareButton } from "../atoms/PinkAwareButton";
import { AppLanguages, getIntlResolver } from "../services/badProgrammedI18n";
import { DemoContext } from "./DemoContext";

export type LanguageState = {
  lang: AppLanguages;
  setLang: React.Dispatch<React.SetStateAction<AppLanguages>>;
};

export const ToggleLanguage = () => {
  console.log("ToggleLanguage rerenders");
  const { lang, setLang } = useContext(DemoContext);
  const getMessage = useMemo(() => getIntlResolver(lang), [lang]);
  return (
    <PinkAwareButton onClick={() => setLang((p) => (p === "en" ? "de" : "en"))}>
      {getMessage("lang")}
    </PinkAwareButton>
  );
};
