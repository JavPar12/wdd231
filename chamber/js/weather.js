/*
  weather.js
  Fetches current conditions and a 3-day forecast for the chamber's
  location (Mexico City) from the OpenWeatherMap API.

  SETUP REQUIRED: replace API_KEY below with your own free key from
  https://home.openweathermap.org/api_keys
  Author: Luis Pardo — WDD 231
*/

const API_KEY = "23f196be4838893b02e6294ba05c0dab";
const LAT = 19.4326;
const LON = -99.1332;
const UNITS = "metric"; // metric = Celsius

const currentTempEl = document.querySelector("#current-temp");
const currentDescEl = document.querySelector("#current-desc");
const forecastEl = document.querySelector("#forecast-cards");

// Loads current conditions, then the 5-day/3-hour forecast, and renders both.
async function loadWeather() {
  try {
    await loadCurrentConditions();
    await loadForecast();
  } catch (error) {
    currentDescEl.textContent = "Weather data is unavailable right now.";
    console.error("Weather fetch failed:", error);
  }
}

// Fetches and displays the current temperature and description.
async function loadCurrentConditions() {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Current weather request failed (status ${response.status})`);
  }

  const data = await response.json();
  const temp = Math.round(data.main.temp);
  const description = data.weather[0].description;

  currentTempEl.textContent = `${temp}\u00B0C`;
  currentDescEl.textContent = description;
}

// Fetches the 5-day/3-hour forecast and picks one entry per day (around
// midday) for the next 3 days to build a simple 3-day forecast.
async function loadForecast() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&appid=${API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Forecast request failed (status ${response.status})`);
  }

  const data = await response.json();
  const middayEntries = data.list.filter((entry) => entry.dt_txt.includes("12:00:00"));
  const nextThreeDays = middayEntries.slice(0, 3);

  forecastEl.innerHTML = "";

  nextThreeDays.forEach((entry) => {
    const dayLabel = new Date(entry.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
    const temp = Math.round(entry.main.temp);

    const card = document.createElement("div");
    card.className = "forecast-day";
    card.innerHTML = `
      <p class="forecast-day__label">${dayLabel}</p>
      <p class="forecast-day__temp">${temp}\u00B0C</p>
    `;
    forecastEl.appendChild(card);
  });
}

loadWeather();
