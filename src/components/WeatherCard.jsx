import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const WeatherCard = ({ city, mini = false }) => {
  const {
    currentWeather,
    fetchWeatherByCity,
    addToFavorites,
    removeFromFavorites,
    favorites,
  } = useContext(WeatherContext);

  if (mini) {
    const handleClick = () => {
      fetchWeatherByCity(city);
    };

    return (
      <div className="weather-card mini" onClick={handleClick}>
        <h3>{city}</h3>
        <button
          className="remove-favorite"
          onClick={(e) => {
            e.stopPropagation();
            removeFromFavorites(city);
          }}
        >
          ✖
        </button>
      </div>
    );
  }

  // For the main current weather display
  if (!currentWeather) return null;

  const isFavorite = favorites.includes(currentWeather.name);

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFromFavorites(currentWeather.name);
    } else {
      addToFavorites(currentWeather.name);
    }
  };

  return (
    <div className="weather-card main">
      <div className="weather-header">
        <h2>
          {currentWeather.name}, {currentWeather.sys.country}
        </h2>
        <button
          className={`favorite-button ${isFavorite ? "active" : ""}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? "★" : "☆"}
        </button>
      </div>

      <div className="weather-info">
        <div className="weather-main">
          <img
            src={getWeatherIcon(currentWeather.weather[0].icon)}
            alt={currentWeather.weather[0].description}
            className="weather-icon"
          />
          <div className="temperature">
            {Math.round(currentWeather.main.temp)}°C
          </div>
        </div>

        <div className="weather-description">
          {currentWeather.weather[0].description}
        </div>

        <div className="weather-details">
          <div className="detail">
            <span className="label">Feels like:</span>
            <span className="value">
              {Math.round(currentWeather.main.feels_like)}°C
            </span>
          </div>
          <div className="detail">
            <span className="label">Humidity:</span>
            <span className="value">{currentWeather.main.humidity}%</span>
          </div>
          <div className="detail">
            <span className="label">Wind:</span>
            <span className="value">
              {Math.round(currentWeather.wind.speed * 3.6)} km/h
            </span>
          </div>
          <div className="detail">
            <span className="label">Pressure:</span>
            <span className="value">{currentWeather.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
