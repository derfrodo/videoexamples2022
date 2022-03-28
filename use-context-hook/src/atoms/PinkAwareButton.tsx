import "./PinkAwareButton.css";

export const PinkAwareButton = (props: {
  children: React.ReactNode;
  isPink?: boolean;
  onClick?: () => any;
}) => {
  const { isPink, onClick, children } = props;
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
