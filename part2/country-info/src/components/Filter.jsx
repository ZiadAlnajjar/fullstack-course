import Input from './Input';

const Filter = ({ name, label, filter, handleFilter }) => (
  <Input name={name} label={label} value={filter} onChange={handleFilter} />
);

export default Filter;
