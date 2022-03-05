import { useEffect } from "react";

export function Demo({ count }: { count: number; connected: boolean }) {
  useEffect(() => {
    document.title = `Frodo shows boring stuff ${count} times`;
  }, [count]);

  return (
    <>
      <div>It is about processing stuff!</div>
    </>
  );
}
