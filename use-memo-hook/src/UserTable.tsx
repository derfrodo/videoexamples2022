import { useEffect, useMemo, useState } from "react";
import type { AppUser } from "./types/AppUser";
import type { ColumDefinition } from "./types/ColumDefinition";

type ExtendedColumnDefinitionArray = (ColumDefinition<AppUser> & {
  align: "center" | "left";
})[];

export function UserTable({
  appUsers,
  columDefinitions,
}: {
  appUsers: AppUser[];
  columDefinitions: ColumDefinition<AppUser>[];
}) {
  console.log("Rerender UserTable");

  const definitionsWithAlign = useMemo<ExtendedColumnDefinitionArray>(() => {
    console.log("Recalc alignments");
    return columDefinitions.map((c) => ({
      ...c,
      align: c.alignCenter ? "center" : "left",
    }));
  }, [columDefinitions]);

  const [defwa, setDefwa] = useState<ExtendedColumnDefinitionArray>([]);
  useEffect(() => {
    console.log("Recalc alignments with Effect");
    setDefwa(
      columDefinitions.map((c) => ({
        ...c,
        align: c.alignCenter ? "center" : "left",
      }))
    );
  }, [columDefinitions]);

  const userValues: { value: string; align: "center" | "left" }[][] =
    useMemo(() => {
      console.log("Recalc user values");
      return appUsers.map((user) => {
        return defwa.map((c, columnIndex) => {
          var value = user[c.property];
          return {
            value: typeof value === "boolean" ? (value ? "yes" : "no") : value,
            align: c.align,
          };
        });
      });
    }, [appUsers, defwa]);

  return (
    <table>
      <thead>
        <tr>
          {definitionsWithAlign.map((c, index) => {
            return (
              <th key={index} align={c.align}>
                {c.header}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {userValues.map((values, index) => (
          <tr key={index}>
            {values.map((value, columnIndex) => {
              return (
                <td
                  key={`${value.value}_${index}_${columnIndex}`}
                  align={value.align}
                >
                  {value.value}
                </td>
              );
            })}
          </tr>
        ))}
        {/* {appUsers.map((user, index) => (
          <tr key={index}>
            {definitionsWithAlign.map((c, columnIndex) => {
              var value = user[c.property];
              return (
                <td
                  key={`${c.property}_${index}_${columnIndex}`}
                  align={c.align}
                >
                  {typeof value === "boolean" ? (value ? "yes" : "no") : value}
                </td>
              );
            })}
          </tr>
        ))} */}
      </tbody>
    </table>
  );
}
