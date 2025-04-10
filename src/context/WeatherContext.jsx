import { createContext, useState, useEffect } from "react";

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [lastSearched, setLastSearched] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // API key would typically be stored in environment variables
  const API_KEY = "54a44e36c9d90b6c0f1c524fe33f716c"; // Replace with your actual API key

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Auto-detect user's location on initial load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (err) => {
          console.error("Geolocation error:", err);
          // Default to a known city if geolocation fails
          fetchWeatherByCity("New York");
        }
      );
    } else {
      fetchWeatherByCity("New York");
    }
  }, []);

  const fetchWeatherByCity = async (city) => {
    if (!city) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? `City "${city}" not found`
            : "Failed to fetch weather data"
        );
      }

      const data = await response.json();
      setCurrentWeather(data);
      setLastSearched(city);

      // Add to search history if not already there
      if (!searchHistory.includes(city)) {
        setSearchHistory((prev) => [city, ...prev].slice(0, 5));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();
      setCurrentWeather(data);
      setLastSearched(data.name);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = (city) => {
    if (!city || favorites.includes(city)) return;
    setFavorites((prev) => [...prev, city]);
  };

  const removeFromFavorites = (city) => {
    setFavorites((prev) => prev.filter((fav) => fav !== city));
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        isLoading,
        error,
        favorites,
        searchHistory,
        lastSearched,
        darkMode,
        fetchWeatherByCity,
        addToFavorites,
        removeFromFavorites,
        toggleDarkMode,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
