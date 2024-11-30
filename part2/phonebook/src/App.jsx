import { useEffect, useState } from 'react';
import AddPersonForm from './components/AddPersonForm';
import Filter from './components/Filter';
import Heading from './components/Heading';
import Persons from './components/Persons';
import Alert from './components/Alert';
import personsService from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [alert, setAlert] = useState({ message: '', severity: '' });
  
  useEffect(() => {
    personsService.getAll('http://localhost:3001/persons')
                  .then(initPersons => {
                    setPersons(initPersons);
                    setFilteredPersons(initPersons);
                  });
  }, []);
  
  const addPerson = (e) => {
    e.preventDefault();
    
    if (!newName || !newNumber) {
      window.alert(`name and number fields can't be empty`);
      return;
    }
    
    const personObj = { name: newName, number: newNumber };
    const foundPerson = persons.find(({ name }) => name === newName);
    
    if (foundPerson) {
      if (foundPerson.number === newNumber) {
        window.alert(`${newName} is already added to phonebook`);
        return;
      }
      
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService.update(foundPerson.id, personObj)
                      .then(updatedPerson => {
                        const updatedPersons = persons.map((person) => (
                          person.id === updatedPerson.id ? updatedPerson : person
                        ));
                        refreshPersonsList(updatedPersons);
                        displaySuccess(`Updated ${updatedPersons.name}`);
                        setNewName('');
                        setNewNumber('');
                      })
                      .catch(() => {
                        displayError(`Information of ${newName} has already been removed from server`);
                        removePersonById(foundPerson.id);
                      });
        return;
      }
    }
    
    personsService.create(personObj)
                  .then(fetchedPerson => {
                    refreshPersonsList([...persons, fetchedPerson]);
                    displaySuccess(`Added ${fetchedPerson.name}`);
                    setNewName('');
                    setNewNumber('');
                  })
  };
  
  const deletePerson = (id, name) => () => {
    const confirmDelete = window.confirm(`Delete ${name} ?`);
    
    if (!confirmDelete) {
      return;
    }
    
    personsService.remove(id)
                  .then((deletedPerson) => {
                    removePersonById(deletedPerson.id);
                    displaySuccess(`Deleted ${deletedPerson.name}`);
                  })
                  .catch(() => {
                    removePersonById(id);
                    displaySuccess(`Deleted ${name}`);
                  });
  };
  
  const removePersonById = (id) => {
    const updatedPersons = persons.filter((person) => person.id !== id);
    refreshPersonsList(updatedPersons);
  };
  
  const handleFilterByName = (e) => {
    handleChange(setFilter)(e);
    
    filterByName({ updatedFilter: e.target.value });
  };
  
  const filterByName = ({ updatedFilter = filter, updatedPersons = persons }) => {
    const updatedFilteredPersons = updatedPersons.filter(({ name }) =>
      name.toLowerCase().includes(updatedFilter.toLowerCase()),
    );
    
    setFilteredPersons(updatedFilteredPersons);
  };
  
  const displaySuccess = (message) => (displayAlert({ message, severity: 'success' }));
  
  const displayError = (message) => (displayAlert({ message, severity: 'error' }));
  
  const displayAlert = ({ message, severity = '' }, duration = 2) => {
    setAlert({ message, severity });
    setTimeout(() => {
      setAlert({ message: '', severity: '' });
    }, duration * 1000);
  };
  
  const refreshPersonsList = (updatedList) => {
    setPersons(updatedList);
    filterByName({ updatedPersons: updatedList });
  };
  
  const handleChange = (setValue) => (e) => setValue(e.target.value);
  
  return (
    <div>
      <Heading lvl={2} text="Phonebook" />
      <Alert message={alert.message} severity={alert.severity} />
      <Filter
        filter={filter}
        handleFilterByName={handleFilterByName}
      />
      <Heading lvl={3} text='Add a new' />
      <AddPersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
        handleChange={handleChange}
      />
      <Heading lvl={3} text="Numbers" />
      <Persons list={filteredPersons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
