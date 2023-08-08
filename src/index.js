function showCurrentPostion(position) {
  let lat = position.coords.latitude;
  console.log(lat);
  let lon = position.coords.longitude;
  console.log(lon);

  let apiKey = "866a208a73eeff02182218e9441647a1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCityTemp);
}

navigator.geolocation.getCurrentPosition(showCurrentPostion);

//SEARCH CITY WEATHER

let presentDate = new Date();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[presentDate.getMonth()];

let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

let day = days[presentDate.getDay()];
let date = presentDate.getDate();
let year = presentDate.getFullYear();
let hours = presentDate.getHours();

let minutes = presentDate.toTimeString().slice(3, 5);
console.log(presentDate.getMinutes());

let presentDateTime = document.querySelector("#today-date");
presentDateTime.innerHTML = `${day}, ${month} ${date} ${year}, ${hours}:${minutes}`;

//Format timestamp
function formatDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Forecast display
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
          <div class="card">
            <img
              src="https://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="forecastIcons" width="50" class="card-img-top"/>
            <div class="card-body">
              <h5 class="card-title text-center">${formatDay(
                forecastDay.dt
              )}</h5>
              <p class="card-text text-center">
                <span class="max-temp">${Math.round(
                  forecastDay.temp.max
                )}°</span
                ><span class="min-temp"> ${Math.round(
                  forecastDay.temp.min
                )}° </span>
              </p>
            </div>
          </div>
       </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Feature 2 Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function showCity(event) {
  event.preventDefault();
  let showCityInput = document.querySelector("#city-input");
  let city = showCityInput.value;
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showCityTemp);
}

function showCityTemp(response) {
  let currentCity = document.querySelector("#city-name");
  currentCity.innerHTML = response.data.name;

  let searchCityTemp = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#display-current-temp");
  cityTemp.innerHTML = `${searchCityTemp}`;

  FahrenheitTemp = Math.round(response.data.main.temp);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description.toUpperCase();

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;

  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  getForecast(response.data.coord);
}

let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", showCity);

// Celcius Display

function displayCelsius(event) {
  event.preventDefault();

  let showCelsiusConvert = ((FahrenheitTemp - 32) * 5) / 9;
  let showCityTempCelsius = document.querySelector("#display-current-temp");
  showCityTempCelsius.innerHTML = Math.round(showCelsiusConvert);
}

let FahrenheitTemp = null;

let tempCelsius = document.querySelector("#temp-celsius");
tempCelsius.addEventListener("click", displayCelsius);

//Fahrenheit Display

function displayFahrenheit(event) {
  event.preventDefault();

  let showCityTempFahrenheit = document.querySelector("#display-current-temp");
  showCityTempFahrenheit.innerHTML = FahrenheitTemp;
}

let tempFahrenheit = document.querySelector("#temp-fahrenheit");
tempFahrenheit.addEventListener("click", displayFahrenheit);

//let currentLocation = document.querySelector("#current-city-button");
//currentLocation.addEventListener("click", showCurrentCity);
//displayForecast();

//Forecast
function getForecast(coordinates) {
  console.log(coordinates);

  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}
