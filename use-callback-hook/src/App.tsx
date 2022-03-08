import React from "react";
import "./App.css";
import { Demo } from "./Demo";

function App() {
  console.log("Rerender App");
  return (
    <div className="App">
      <header className="App-header">
        <h1>Use Memo Hook Demo</h1>
      </header>
      <main className="AppMain">
        <Demo />
      </main>
    </div>
  );
}

export default App;
