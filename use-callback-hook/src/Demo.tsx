import { useMemo } from "react";
import type { AppUser } from "./types/AppUser";
import { ColumDefinition } from "./types/ColumDefinition";
import { UserTable } from "./UserTable";

export const Demo = ({ appUsers }: { appUsers: AppUser[] }) => {
  console.log("Rerender Demo");

  const columns: ColumDefinition<AppUser, keyof AppUser>[] = useMemo(
    () => [
      {
        header: "Name",
        alignCenter: true,
        property: "name",
      },
      {
        header: "Hairy Feet?",
        property: "hasHairyFeet",
        alignCenter: false,
      },
    ],
    []
  );
  
  return <UserTable appUsers={appUsers} columDefinitions={columns} />;
};
