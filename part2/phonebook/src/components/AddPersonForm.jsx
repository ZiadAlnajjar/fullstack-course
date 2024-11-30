import Button from './Button';
import Input from './Input';

const AddPersonForm = ({ addPerson, newName, newNumber, setNewName, setNewNumber, handleChange }) => (
  <form onSubmit={addPerson}>
    <Input name="name" label="name:" value={newName} onChange={handleChange(setNewName)} />
    <Input name="number" label="number:" value={newNumber} onChange={handleChange(setNewNumber)} />
    <div>
      <Button type="submit" text="add" />
    </div>
  </form>
);

export default AddPersonForm;