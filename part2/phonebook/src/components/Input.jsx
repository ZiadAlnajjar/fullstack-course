const Input = ({ type = 'text', id, name, label, value, onChange }) => (
  <div>
    {label} {' '}
    <input type={type} id={id} name={name} onChange={onChange} value={value} />
  </div>
);

export default Input;
