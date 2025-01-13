const Input = ({ type = 'text', id, name, label, value, onChange, ...props }) => (
  <div>
    {label} {' '}
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      aria-label={props.ariaLabel ?? name}
      {...props}
    />
  </div>
);

export default Input;
