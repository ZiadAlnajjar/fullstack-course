const Total = ({ parts }) => {
  const sum = parts.reduce((total, { exercises }) => total + exercises, 0);
  
  return (
    <b>total of {sum} exercises</b>
  );
};

export default Total;
