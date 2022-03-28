import { PinkAwareButton } from "./atoms/PinkAwareButton";
import { PinkAwareCheckbox } from "./atoms/PinkAwareCheckbox";
import "./demo.css";

export const Demo = () => {
  return (
    <div className="demoContainer">
      <h2>Demonstration inside 😎</h2>
      <></>
      <PinkAwareButton isPink={true} onClick={() => {}}>
        Deutsch
      </PinkAwareButton>
      <PinkAwareCheckbox
        isPink={true}
        id="TogglePink"
        checked={true}
        onChange={() => {}}
      >
        🎨
      </PinkAwareCheckbox>
    </div>
  );
};
