// show current date and time when reloadig

let now = new Date();

let h4 = document.querySelector("h4");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let day = days[now.getDay()];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let formattedDate = `${day}, ${month} ${date} ${year}, ${hours}:${minutes}`;

h4.innerHTML = formattedDate;

// display city + temperature after searching

function feelsLike(response) {
  let feel = Math.round(response.data.main.feels_like);
  let feeling = document.querySelector("#feeling");
  feeling.innerHTML = `Feels like ${feel}°C`;
  weatherIcon(response);
}

function showHumidity(response) {
  let humid = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity ${humid}%`;
  feelsLike(response);
}

function showClouds(response) {
  let skyCondition = response.data.weather[0].description;
  skyCondition = skyCondition[0].toUpperCase() + skyCondition.substring(1);
  let clouds = document.querySelector("#clouds");
  clouds.innerHTML = `${skyCondition}`;
  showHumidity(response);
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("h2");
  celsiusTemperature = response.data.main.temp;
  temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  showClouds(response);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML;
  console.log(response.data.list[0]);
}

function displayCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input").value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;
  let apiKey = "7a4c012d25c9211da55cf57afddab488";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let searchCity = document.querySelector("#city-form");
searchCity.addEventListener("submit", displayCity);

// current location

function getCurrentTemperature(response) {
  let currentCity = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}°C`;
}

function showPosition(position) {
  let apiKey = "d2d29820d9662bdf3cbb458212a4c7a8";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(getCurrentTemperature);
}

function displayLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#my-location");
currentLocation.addEventListener("click", displayLocation);

// change between °C and °F

function convertCelsius(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = `${Math.round(celsiusTemperature)}°C`;
}

function convertFahrenheit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

let celsiusTemperature = null;

let changeToCelsius = document.querySelector("#celsius-button");
changeToCelsius.addEventListener("click", convertCelsius);

let changeToFahrenheit = document.querySelector("#fahrenheit-button");
changeToFahrenheit.addEventListener("click", convertFahrenheit);
