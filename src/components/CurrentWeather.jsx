import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import WeatherCard from "./WeatherCard";
const CurrentWeather = () => {
  const { currentWeather, isLoading, error } = useContext(WeatherContext);
  if (isLoading) {
    return <div className="loading">Loading weather data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }
  if (!currentWeather) {
    return (
      <div className="no-data">
        No weather data available. Try searching for a city.
      </div>
    );
  }
  return (
    <div className="current-weather">
      <WeatherCard />
    </div>
  );
};
export default CurrentWeather;
