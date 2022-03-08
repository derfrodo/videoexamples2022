import { useEffect } from "react";

export function Demo2({
  count,
  connected,
}: {
  count: number;
  connected: boolean;
}) {
  console.log("Rerendering Demo 2");

  useEffect(() => {
    console.log(`Set Demo2-Userdata (count: ${count})!`);
    if (connected) {
      sessionStorage.setItem(
        `useEffectDemo: UserData ${count}`,
        JSON.stringify({ reconnectAttempts: count, name: "Frodo" })
      );
      return () => {
        console.log(`Destroy Demo2 (count: ${count})!`);
        sessionStorage.removeItem(`useEffectDemo: UserData ${count}`);
      };
    }
  }, [ count]);

  return (
    <>
      <div>Demo 2{!connected && " not connected"}!</div>
    </>
  );
}
