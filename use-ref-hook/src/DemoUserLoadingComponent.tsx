import React, { useCallback, useEffect, useState } from "react";
import { useMemo } from "react";
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
  const [reloadUsers, setReloadUsers] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [rerenderCount, setRerender] = useState(0);
  const [appUsers, setAppUsers] = useState<AppUser[]>([]);

  const loadUsers = useCallback(async () => {
    try {
      setAppUsers([]);
      console.log("Start requesting users");
      const users = await getUserFromApi();
      setAppUsers(users);
      console.log("Set users");
    } finally {
      setLoadingUsers(false);
    }
  }, []);

  const reloadUsersIfActivated = useCallback(() => {
    if (reloadUsers) {
      setLoadingUsers((p) => {
        if (!p) {
          loadUsers();
        }
        return true;
      });
    } else {
      console.log("Could have reloaded users, but flag is set to false");
    }
  }, [loadUsers, reloadUsers]);

  useEffect(() => {
    if (rerenderCount % reloadAtRerenders === 0) {
      reloadUsersIfActivated();
    } else {
      console.log(
        "No matching rerender count. Users will not be reloaded due to rerenders."
      );
    }
  }, [reloadUsersIfActivated, rerenderCount]);

  const calcPadding = useCallback(
    () => 8 + rerenderCount,
    [rerenderCount]
  );


  return (
    <>
      <button onClick={() => setRerender((p) => p + 1)}>Rerender</button>
      <div>
        <input
          type="checkbox"
          id="togglereload"
          checked={reloadUsers}
          onChange={() => setReloadUsers((p) => !p)}
        />
        <label htmlFor="togglereload">Lade Benutzer neu</label>
      </div>
      {reloadUsers ? (
        <CoolButtonFromExternalLib
          onClick={() => loadUsers()}
          calculatePadding={calcPadding}
        >
          Reload Users
        </CoolButtonFromExternalLib>
      ) : (
        ""
      )}
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

const CoolButtonFromExternalLib: React.FC<{
  onClick: () => any;
  calculatePadding?: () => number;
}> = ({ children, calculatePadding, onClick }) => {
  const padding = useMemo(() => {
    console.error("Calculate padding");
    return calculatePadding ? calculatePadding() : 8;
  }, [calculatePadding]);

  return (
    <button
      style={{ backgroundColor: "white", color: "pink", padding: padding }}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};
