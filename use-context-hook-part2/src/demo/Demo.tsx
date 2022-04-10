import { useCallback, useEffect, useMemo, useState } from "react";
import { PinkAwareButton } from "../atoms/PinkAwareButton";
import { AppLanguages, getIntlResolver } from "../services/badProgrammedI18n";
import "./demo.css";
import { DemoContext, CowCategory } from "./DemoContext";
import { ToggleLanguage } from "./ToggleLanguage";
import { TogglePinkishness } from "./TogglePinkishness";

import { getTodos } from "./FakeCowServer";

export const Demo = () => {
  console.log("Demo rerenders");

  const [lang, setLang] = useState<AppLanguages>("de");
  const [isPink, setIsPink] = useState(false);
  const [todos, setTodos] = useState<CowCategory[]>([]);

  const [manualRerenderCount, setManualRerenderCount] = useState<number>(0);
  const triggerManualRerender = useCallback(
    () => setManualRerenderCount((p) => p + 1),
    []
  );
  const getMessage = useMemo(() => getIntlResolver(lang), [lang]);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="demo">
      <h2>Demonstration inside 😎</h2>
      <section>
        <DemoContext.Provider
          value={{ lang, setLang, isPink, setIsPink, cows: todos, setCows: setTodos }}
        >
          <div
            className={
              "demoContentContainer flexContainer" + (isPink ? " pink" : "")
            }
          >
            <TogglePinkishness />
            <div style={{ width: "30%" }} />
            <ToggleLanguage />
          </div>
        </DemoContext.Provider>
      </section>
      <section>
        <div className="flexContainer">
          <PinkAwareButton onClick={triggerManualRerender}>
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
