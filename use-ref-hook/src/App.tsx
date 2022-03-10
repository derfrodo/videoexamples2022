import React from "react";
import "./App.css";
import { DemoUserLoadingComponent } from "./DemoUserLoadingComponent";

function App() {
  console.log("Rerender App");
  return (
    <div className="App">
      <header className="App-header">
        <h1>Use Ref Hook Demo</h1>
      </header>
      <main className="AppMain">
        <DemoUserLoadingComponent />
      </main>
    </div>
  );
}

export default App;
