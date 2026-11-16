const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const WEATHER_URL = "https://api.open-meteo.com/v1/forecast";

export async function getWeatherForecast(locationName) {
  const searchUrl = new URL(GEOCODING_URL);

  searchUrl.search = new URLSearchParams({
    name: locationName,
    count: "10",
    language: "en",
    format: "json",
    countryCode: "LS"
  });

  const searchResponse = await fetch(searchUrl);

  if (!searchResponse.ok) {
    throw new Error("Could not find the selected location.");
  }

  const searchData = await searchResponse.json();

  const place = searchData.results?.find(
    (item) => item.country_code === "LS"
  );

  if (!place) {
    throw new Error("Location not found in Lesotho.");
  }

  const forecastUrl = new URL(WEATHER_URL);

  forecastUrl.search = new URLSearchParams({
    latitude: place.latitude,
    longitude: place.longitude,
    current: [
      "temperature_2m",
      "relative_humidity_2m",
      "apparent_temperature",
      "precipitation",
      "weather_code",
      "wind_speed_10m"
    ].join(","),
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max"
    ].join(","),
    timezone: "Africa/Maseru",
    forecast_days: "7"
  });

  const response = await fetch(forecastUrl);

  if (!response.ok) {
    throw new Error("Unable to retrieve weather forecast.");
  }

  return response.json();
}