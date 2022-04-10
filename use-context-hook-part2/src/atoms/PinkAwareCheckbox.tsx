import { useContext } from "react";
import { DemoContext } from "../demo/DemoContext";
import "./PinkAwareCheckbox.css";

export const PinkAwareCheckbox = (props: {
  id?: string;
  children: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const { isPink } = useContext(DemoContext);
  const { checked, onChange, children, id } = props;
  return (
    <span>
      <input
        className="PinkAwareCheckboxInput"
        style={{
          borderColor: isPink ? "pink" : "black",
        }}
        checked={checked}
        type={"checkbox"}
        onChange={onChange}
        {...(id ? { id } : {})}
      />
      <label
        className="PinkAwareCheckboxLabel"
        {...(id ? { htmlFor: id } : {})}
      >
        {children}
      </label>
    </span>
  );
};
