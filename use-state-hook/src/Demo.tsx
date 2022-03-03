import { useEffect, useState } from "react";

export const Demo = () => {
  const [rerenders2, setRerender2] = useState(0);
  const [rerenders, setRerender] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count > 0 && rerenders2 > 1) {
      setRerender(rerenders + 1);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  return (
    <>
      <div>Counter: {count}</div>
      <div>Redenders: {rerenders}</div>
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      >
        Increment
      </button>
    </>
  );
};
