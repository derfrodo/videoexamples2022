import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { PinkAwareButton } from "../atoms/PinkAwareButton";
import { PinkAwareCheckbox } from "../atoms/PinkAwareCheckbox";
import "./demo.css";
import { AppLanguages, getIntlResolver } from "../services/badProgrammedI18n";

type DemoContextType = {
  isPink: boolean;
  setIsPink: React.Dispatch<React.SetStateAction<boolean>>;
  lang: AppLanguages;
  setLang: React.Dispatch<React.SetStateAction<AppLanguages>>;
};

const DemoContext = createContext<DemoContextType>({
  isPink: false,
  setIsPink: () => {},
  lang: "en",
  setLang: () => {},
});

export const Demo = () => {
  console.log("Demo rerenders");
  const [manualRerenderCount, setManualRerenderCount] = useState<number>(0);

  const triggerManualRerender = useCallback(
    () => setManualRerenderCount((p) => p + 1),
    []
  );

  const [lang, setLang] = useState<AppLanguages>("de");
  const [isPink, setIsPink] = useState(false);

  const context = useMemo(
    () => ({
      isPink,
      setIsPink,
      lang,
      setLang,
    }),
    [isPink, lang]
  );
  const getMessage = useMemo(() => getIntlResolver(lang), [lang]);

  return (
    <div className="demo">
      <h2>Demonstration inside 😎</h2>
      <section>
        <DemoContext.Provider value={context}>
          <div className="demoContentContainer flexContainer">
            <TogglePinkishness />
            <div style={{ width: "30%" }} />
            <ToggleLanguage />
          </div>
        </DemoContext.Provider>
      </section>
      <section>
        <div className="flexContainer">
          <PinkAwareButton isPink={isPink} onClick={triggerManualRerender}>
            {getMessage("Rerender Now!")}
          </PinkAwareButton>
          <div style={{ width: 8 }} />
          <span>
            {getMessage("Manually rerendered count: ")}
            {manualRerenderCount}
          </span>
        </div>
      </section>
    </div>
  );
};

const ToggleLanguage = memo(() => {
  console.log("ToggleLanguage rerenders");
  const { isPink, lang, setLang } = useContext(DemoContext);
  const getMessage = useMemo(() => getIntlResolver(lang), [lang]);
  return (
    <PinkAwareButton
      isPink={isPink}
      onClick={() => setLang((p) => (p === "en" ? "de" : "en"))}
    >
      {getMessage("lang")}
    </PinkAwareButton>
  );
});

const TogglePinkishness = memo(() => {
  console.log("TogglePinkishness rerenders");
  const { isPink, setIsPink } = useContext(DemoContext);
  return (
    <PinkAwareCheckbox
      isPink={isPink}
      id="TogglePink"
      checked={isPink}
      onChange={() => setIsPink((p) => !p)}
    >
      🎨
    </PinkAwareCheckbox>
  );
});
