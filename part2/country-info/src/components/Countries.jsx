import Button from './Button';

const Countries = ({ countries, showCountry }) => {
  if (countries.length === 1) {
    return null;
  }
  
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }
  
  return (
    <ul>
      {countries.map(({ cca2, name: { common: name } }) => (
        <li key={cca2}>
          {name} {' '}
          <Button text='show' onClick={showCountry(name)} />
        </li>
      ))}
    </ul>
  )
};

export default Countries;
