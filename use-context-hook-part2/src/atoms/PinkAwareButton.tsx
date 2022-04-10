import { useContext } from "react";
import { DemoContext } from "../demo/DemoContext";
import "./PinkAwareButton.css";

export const PinkAwareButton = (props: {
  children: React.ReactNode;
  onClick?: () => any;
}) => {
  const { isPink } = useContext(DemoContext);
  const { onClick, children } = props;
  return (
    <button
      className="PinkAwareButton"
      style={{
        borderColor: isPink ? "pink" : "black",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
