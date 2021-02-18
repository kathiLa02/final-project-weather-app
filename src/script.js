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
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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

let formattedDate = `${day}, ${month} ${date}, ${year}, ${hours}:${minutes}`;

h4.innerHTML = formattedDate;

// display city + temperature after searching

function feelsLike(response) {
  let feel = Math.round(response.data.main.feels_like);
  let feeling = document.querySelector("#feeling");
  feeling.innerHTML = `Feels like ${feel}°C`;
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
  let temperature = Math.round(response.data.main.temp);
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${temperature}°C`;
  showClouds(response);
}

function displayCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input").value;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentCity}`;
  let apiKey = "d2d29820d9662bdf3cbb458212a4c7a8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
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
  let temp = document.querySelector("#temperature");
  temp.innerHTML = "13°C";
}

let changeToCelsius = document.querySelector("#celsius-link");
changeToCelsius.addEventListener("click", convertCelsius);

function convertFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  temp.innerHTML = "66°F";
}

let changeToFahrenheit = document.querySelector("#fahrenheit-link");
changeToFahrenheit.addEventListener("click", convertFahrenheit);
