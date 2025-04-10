import { useContext } from "react";
import { WeatherProvider, WeatherContext } from "./context/WeatherContext";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import FavoriteCities from "./components/FavoriteCities";
import "./App.css";

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useContext(WeatherContext);

  return (
    <button className="dark-mode-toggle" onClick={toggleDarkMode}>
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
};

const AppContent = () => {
  const { darkMode, currentWeather } = useContext(WeatherContext);

  const getWeatherBackgroundClass = () => {
    if (!currentWeather) return "";

    const weatherId = currentWeather.weather[0].id;
    const iconCode = currentWeather.weather[0].icon;
    const isNight = iconCode.includes("n");

    if (weatherId >= 200 && weatherId < 300) {
      return "weather-thunderstorm";
    } else if (weatherId >= 300 && weatherId < 600) {
      return "weather-rain";
    } else if (weatherId >= 600 && weatherId < 700) {
      return "weather-snow";
    } else if (weatherId >= 700 && weatherId < 800) {
      return "weather-mist";
    } else if (weatherId === 800) {
      return isNight ? "weather-clear-night" : "weather-clear-day";
    } else if (weatherId > 800) {
      return "weather-clouds";
    }

    return "";
  };

  return (
    <div
      className={`app ${
        darkMode ? "dark-mode" : "light-mode"
      } ${getWeatherBackgroundClass()}`}
    >
      <header>
        <h1>Weather Dashboard</h1>
        <DarkModeToggle />
      </header>

      <main>
        <div className="search-section">
          <SearchBar />
        </div>

        <div className="dashboard-content">
          <div className="main-content">
            <CurrentWeather />
          </div>

          <aside className="sidebar">
            <FavoriteCities />
          </aside>
        </div>
      </main>

      <footer>
        <p style={{ textAlign: "center", color: "white", fontSize: "20px" }}>
          Weather Dashboard &copy; 2025 | Created by Samyak Jhanjhari
        </p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <WeatherProvider>
      <AppContent />
    </WeatherProvider>
  );
}

export default App;
