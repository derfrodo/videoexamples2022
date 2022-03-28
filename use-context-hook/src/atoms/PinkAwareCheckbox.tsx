import "./PinkAwareCheckbox.css";

export const PinkAwareCheckbox = (props: {
  id?: string;
  children: string;
  isPink?: boolean;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const { isPink, checked, onChange, children, id } = props;
  return (
    <>
      <input
        className="PinkAwareCheckboxInput"
        style={{
          backgroundColor: "white",
          // color: isPink ? "pink" : "black",
          borderColor: isPink ? "pink" : "black",
          padding: 4,
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
    </>
  );
};
