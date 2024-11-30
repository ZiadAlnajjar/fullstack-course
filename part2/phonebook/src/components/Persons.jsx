import Button from './Button';

const Persons = ({ list, deletePerson }) => (
  <div>
    {list.map(({ id, name, number }) => (
      <div key={id}>
        {name} {number} {' '}
        <Button onClick={deletePerson(id, name)} text='delete' />
      </div>
    ))}
  </div>
);

export default Persons;
