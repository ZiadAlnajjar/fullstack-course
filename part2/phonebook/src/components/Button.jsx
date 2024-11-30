const Button = ({ type = 'button', onClick, text }) => (
  <button type={type} onClick={onClick}>
    {text}
  </button>
);

export default Button;
