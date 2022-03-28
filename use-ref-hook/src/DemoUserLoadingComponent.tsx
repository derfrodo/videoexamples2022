import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Demo } from "./Demo";
import { getUserFromApi } from "./services/fakeApi";
import type { AppUser } from "./types/AppUser";

const reloadAtRerenders = 4;

export const DemoUserLoadingComponent: React.FC = () => {
  console.log("Rerender UserLoadingComponent");
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
    setLoadingUsers((p) => {
      if (!p) {
        loadUsers();
      }
      return true;
    });
  }, [loadUsers]);

  const rerendersRemainUntilReloadUsers = useMemo(
    () => rerenderCount % reloadAtRerenders,
    [rerenderCount]
  );

  useEffect(() => {
    if (rerendersRemainUntilReloadUsers === 0) {
      reloadUsersIfActivated();
    } else {
      console.log(
        "No matching rerender count. Users will not be reloaded due to rerenders."
      );
    }
  }, [reloadUsersIfActivated, rerendersRemainUntilReloadUsers]);

  return (
    <>
      <CoolButtonFromExternalLib onClick={() => setRerender((p) => p + 1)}>
        Rerender
      </CoolButtonFromExternalLib>
      <div style={{ padding: "8px 0" }}>
        <Demo appUsers={appUsers} />
      </div>
      <div>{rerenderCount} rerenders requested</div>
      <div>
        {loadingUsers
          ? "Loading users, please be patient!"
          : `Users loaded. Will refetch users for after ${
              reloadAtRerenders - rerendersRemainUntilReloadUsers
            } more rerenders (load users every ${reloadAtRerenders} times)!`}
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
