import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { PinkAwareButton } from "../atoms/PinkAwareButton";
import "./demo.css";
import { AppLanguages, getIntlResolver } from "../services/badProgrammedI18n";
import { ToggleLanguage } from "./ToggleLanguage";
import { TogglePinkishness } from "./TogglePinkishness";
import { DemoContext, TodoCategory } from "./DemoContext";

export const Demo = () => {
  console.log("Demo rerenders");

  const [lang, setLang] = useState<AppLanguages>("de");
  const [isPink, setIsPink] = useState(false);
  const [todos, setTodos] = useState<TodoCategory[]>([]);

  const [manualRerenderCount, setManualRerenderCount] = useState<number>(0);
  const triggerManualRerender = useCallback(
    () => setManualRerenderCount((p) => p + 1),
    []
  );
  const getMessage = useMemo(() => getIntlResolver(lang), [lang]);

  return (
    <div className="demo">
      <h2>Demonstration inside 😎</h2>
      <section>
        <DemoContext.Provider
          value={{ lang, setLang, isPink, setIsPink, todos, setTodos }}
        >
          <div className="demoContentContainer flexContainer">
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
