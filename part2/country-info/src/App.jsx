import { useEffect, useRef, useState } from 'react';
import Filter from './components/Filter';
import Country from './components/Country';
import Countries from './components/Countries';
import countryService from './services/countries';
import axios from 'axios';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [filter, setFilter] = useState('');
  const prevFilterRef = useRef('');
  
  useEffect(() => {
    countryService.getAll()
                  .then(initCountries => {
                    setCountries(initCountries);
                    setFilteredCountries(initCountries);
                  })
                  .catch(err => console.log(err));
  }, []);
  
  useEffect(() => {
    const filteredLen = filteredCountries.length;
    
    if (filteredLen === 1) {
      if (filter === prevFilterRef.current) {
        return;
      }
      prevFilterRef.current = filter;
      
      const weatherApiKey = import.meta.env.VITE_OPENWEATHER_KEY;
      const selectedCountry = filteredCountries[0];
      const [lat, lon] = selectedCountry.capitalInfo.latlng;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`
        )
        .then(({ data: capitalWeather }) => setCountry({ ...selectedCountry, capitalWeather }))
        .catch(err => {
          setCountry({ ...selectedCountry, capitalWeather: null });
          console.log(err);
        });
    }
    
    if (country && filteredLen > 1) {
      setCountry(null);
    }
  }, [country, filter, filteredCountries]);
  
  const filterByName = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    
    handleFilter(newFilter)
  };
  
  const showCountry = (countryToShow) => () => {
    setFilter(countryToShow);
    handleFilter(countryToShow);
  };
  
  const handleFilter = (newFilter) => {
    const updatedFilteredCountries = countries.filter(({ name: { common: name } }) =>
      name.toLowerCase()
          .includes(newFilter.toLowerCase()),
    );
    
    setFilteredCountries(updatedFilteredCountries);
  };
  
  return (
    <>
      <Filter label='find countries' filter={filter} handleFilter={filterByName} />
      <Countries countries={filteredCountries} showCountry={showCountry} />
      <Country country={country} />
    </>
  )
};

export default App;
