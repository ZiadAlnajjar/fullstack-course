import Heading from "./Heading";

const CapitalWeatherReport = ({ capital, weather }) => {
  if (!weather) {
    return null;
  }
  
  const { main: { temp }, weather: [{ icon }], wind: { speed: windSpeed } } = weather;
  
  return (
    <div>
      <Heading lvl={2} text={`Weather in ${capital}`} />
      <p>temperature {temp} Celsius</p>
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="weather icon"
      />
      <p>wind {windSpeed} m/s</p>
    </div>
  );
};

export default CapitalWeatherReport;
