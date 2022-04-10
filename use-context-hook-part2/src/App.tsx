import React, { useMemo } from "react";
import "./App.css";
import { Demo } from "./demo/Demo";
import { getIntlResolver } from "./services/badProgrammedI18n";

function App() {
  const appName = useMemo(() => getIntlResolver()("AppName"), []);
  return (
    <div className="App">
      <header className="App-header">
        <h1>{appName}</h1>
      </header>
      <main className="AppMain">
        <Demo />
      </main>
    </div>
  );
}

export default App;
