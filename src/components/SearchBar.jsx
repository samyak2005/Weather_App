import { useState, useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";

const SearchBar = () => {
  const [city, setCity] = useState("");
  const { fetchWeatherByCity, isLoading, searchHistory } =
    useContext(WeatherContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherByCity(city.trim());
      setCity("");
    }
  };
  const handleHistoryClick = (historyCity) => {
    fetchWeatherByCity(historyCity);
  };
  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
          className="search-input"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="search-button"
          disabled={isLoading || !city.trim()}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {searchHistory.length > 0 && (
        <div className="search-history">
          <p className="history-title">Recent searches:</p>
          <div className="history-items">
            {searchHistory.map((historyCity, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(historyCity)}
                className="history-item"
              >
                {historyCity}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default SearchBar;
