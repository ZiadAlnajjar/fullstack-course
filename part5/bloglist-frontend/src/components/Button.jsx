const Button = ({ type = 'button', onClick, text, ...props }) => (
  <button type={type} onClick={onClick} {...props}>
    {text}
  </button>
);

export default Button;
