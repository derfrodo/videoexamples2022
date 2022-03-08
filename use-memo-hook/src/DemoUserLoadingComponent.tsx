import { useEffect, useState } from "react";
import { Demo } from "./Demo";
import type { AppUser } from "./types/AppUser";

const wait = async (delayInMs: number) => {
  return new Promise((r) => setTimeout(r, delayInMs));
};

const getUserFromApi = async (): Promise<AppUser[]> => {
  await wait(2000);

  return [
    { name: "DerFrodo", hasHairyFeet: true },
    { name: "DerFuchs", hasHairyFeet: false },
  ];
};

const reloadAtRerenders = 4;

export const DemoUserLoadingComponent: React.FC = () => {
  console.log("Rerender UserLoadingComponent");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [rerenderCount, setRerender] = useState(0);
  const [appUsers, setAppUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    if (rerenderCount % reloadAtRerenders === 0) {
      setLoadingUsers((p) => {
        if (!p) {
          (async () => {
            try {
              setAppUsers([]);
              console.log("Start requesting users");
              const users = await getUserFromApi();
              setAppUsers(users);
              console.log("Set users");
            } finally {
              setLoadingUsers(false);
            }
          })();
        }
        return true;
      });
    }
  }, [rerenderCount]);

  return (
    <>
      <button onClick={() => setRerender((p) => p + 1)}>Rerender</button>
      <div style={{ padding: "8px 0" }}>
        <Demo appUsers={appUsers} />
      </div>
      <div>{rerenderCount} rerenders requested</div>
      <div>
        {loadingUsers
          ? "Loading users, please be patient!"
          : `Users loaded. Will refetch users for after clicking rerender ${reloadAtRerenders} times!`}
      </div>
    </>
  );
};
