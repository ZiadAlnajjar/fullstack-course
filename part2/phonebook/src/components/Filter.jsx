import Input from './Input';

const Filter = ({ filter, handleFilterByName}) => (
  <Input name="filter" label="filter shown with" value={filter} onChange={handleFilterByName} />
);

export default Filter;
