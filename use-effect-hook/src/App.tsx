import React, { useState } from "react";
import "./App.css";
import { Demo } from "./Demo";
import { Demo2 } from "./Demo2";

function App() {
  // console.log("Rerendering App");
  const [, setUpdate] = useState(0);
  const [count, setCount] = useState(0);
  const [connected] = useState(true);

  // useEffect(() => {
  //   // console.log("Use Effect for connected App");
  //   setConneted(count % 2 !== 0);
  // }, [count]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Use Effect Hook Demo</h1>
      </header>
      <main className="AppMain">
        <button onClick={() => setCount((p) => p + 1)}>Click</button>
        <button onClick={() => setUpdate((p) => p + 1)}>Just Rerender</button>
        <Demo count={count} connected={connected} />
        <Demo2 count={count} connected={connected} />
      </main>
    </div>
  );
}

export default App;
