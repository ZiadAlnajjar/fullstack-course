const Alert = ({ message, severity = 'success' }) => {
  const className = `alert alert-${severity}`;

  if (!message) {
    return null;
  }

  return (
    <div className={className}>
      {message}
    </div>
  );
};

export default Alert;
