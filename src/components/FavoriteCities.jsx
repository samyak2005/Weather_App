import { useContext } from "react";
import { WeatherContext } from "../context/WeatherContext";
import WeatherCard from "./WeatherCard";

const FavoriteCities = () => {
  const { favorites } = useContext(WeatherContext);

  if (favorites.length === 0) {
    return (
      <div className="favorites-container empty">
        <h2>Favorite Cities</h2>
        <p>
          No favorite cities yet. Search for a city and click the star to add it
          to your favorites.
        </p>
      </div>
    );
  }
  return (
    <div className="favorites-container">
      <h2>Favorite Cities</h2>
      <div className="favorites-list">
        {favorites.map((city, index) => (
          <WeatherCard key={index} city={city} mini={true} />
        ))}
      </div>
    </div>
  );
};
export default FavoriteCities;
