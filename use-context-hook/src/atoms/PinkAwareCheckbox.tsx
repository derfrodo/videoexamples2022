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
