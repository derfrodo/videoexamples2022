import { useEffect, useState } from "react";
import { AppUser } from "./types/AppUser";
import { ColumDefinition } from "./types/ColumDefinition";

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

export const Demo = () => {
  console.log("Rerender Demo");
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [rerenderCount, setRerender] = useState(0);
  const [appUsers, setAppUsers] = useState<AppUser[]>([]);

  useEffect(() => {
    if (rerenderCount % 2 === 0 && loadingUsers) {
      setLoadingUsers(true);
      (async () => {
        try {
          console.log("Start requesting users");
          const users = await getUserFromApi();
          setAppUsers(users);
        } finally {
          setLoadingUsers(false);
        }
      })();
    }
  }, [loadingUsers, rerenderCount]);

  return (
    <>
      <div>It is about remembering stuff!</div>
      <button onClick={() => setRerender((p) => p + 1)}>
        Rerender {rerenderCount} {rerenderCount % 2 === 0 ? "RELOADING" : ""}
      </button>
      <UserTable
        appUsers={appUsers}
        columDefinitions={[
          {
            header: "Name",
            alignCenter: false,
          },
          {
            header: "Hairy Feet?",
            alignCenter: false,
          },
        ]}
      />
    </>
  );
};

const UserTable = ({
  appUsers,
}: {
  appUsers: AppUser[];
  columDefinitions: ColumDefinition[];
}) => {
  return (
    <table>
      {appUsers.map((user, index) => (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.hasHairyFeet ? "yes" : "no"}</td>
        </tr>
      ))}
    </table>
  );
};
