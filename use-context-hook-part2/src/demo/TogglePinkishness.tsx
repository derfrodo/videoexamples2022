import { useContext } from "react";
import { PinkAwareCheckbox } from "../atoms/PinkAwareCheckbox";
import { DemoContext } from "./DemoContext";

export type PinkishState = {
  isPink: boolean;
  setIsPink: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TogglePinkishness = () => {
  console.log("TogglePinkishness rerenders");
  const { isPink, setIsPink } = useContext(DemoContext);
  return (
    <PinkAwareCheckbox
      id="TogglePink"
      checked={isPink}
      onChange={() => setIsPink((p) => !p)}
    >
      🎨
    </PinkAwareCheckbox>
  );
};
