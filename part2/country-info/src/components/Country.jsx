import Heading from './Heading';
import CapitalWeatherReport from './CapitalWeatherReport';

const Country = ({ country }) => {
  if (!country) {
    return null;
  }
  
  const {
    name: { common: name },
    capital,
    area,
    languages,
    flags: { png: flag, alt },
    capitalWeather,
  } = country;
  
  return (
    <div>
      <Heading lvl={1} text={name} />
      <p>capital {capital}</p>
      <p>area {area}</p>
      <b>languages:</b>
      <ul>
        {Object.entries(languages).map(([key, language]) => (
          <li key={key}>{language}</li>
        ))}
      </ul>
      <img src={flag} alt={alt} />
      <CapitalWeatherReport capital={capital} weather={capitalWeather} />
    </div>
  );
};

export default Country;
