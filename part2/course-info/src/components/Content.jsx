import Part from './Part';

const Content = ({ parts }) =>
  <>
    {parts.map(({ id, name, exercises }) => (
      <Part name={name} exercises={exercises} key={id} />
    ))}
  </>;

export default Content;
