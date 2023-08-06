//SHOW CURRENT LOCATION TEMP/WEATHER CONDITIONS ON PAGE LOAD
let body = document.querySelector("body");

function showCurrentCity() {
  function showCityTemp(response) {
    console.log(response.data.main.temp);
    let currentCityTemp = Math.round(response.data.main.temp);

    FahrenheitTemp = Math.round(response.data.main.temp);

    let currentCityName = response.data.name.toUpperCase();

    let currentCityConditions =
      response.data.weather[0].description.toUpperCase();

    let displayTemp = document.querySelector("#display-current-temp");
    displayTemp.innerHTML = `${currentCityTemp}`;

    let displayCityName = document.querySelector("#city-name");
    displayCityName.innerHTML = `${currentCityName}`;

    let displayCityConditions = document.querySelector("#weather-description");
    displayCityConditions.innerHTML = `${currentCityConditions}`;

    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function showCurrentPostion(position) {
    let lat = position.coords.latitude;
    console.log(lat);
    let lon = position.coords.longitude;
    console.log(lon);

    let apiKey = "4f97a6af475a359f35870845c4249adb";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

    axios.get(apiUrl).then(showCityTemp);
  }

  navigator.geolocation.getCurrentPosition(showCurrentPostion);
}

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

//Forecast display
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col">
          <div class="card">
            <img
              src="images/cloudSun.jpg"
              class="card-img-top"
              alt="cloudSun" />
            <div class="card-body">
              <h5 class="card-title text-center">${day}</h5>
              <p class="card-text text-center">
                <span class="max-temp">98°</span
                ><span class="min-temp"> 77° </span>
              </p>
            </div>
          </div>
       </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//Feature 2 Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

function showCity(event) {
  event.preventDefault();
  let showCityInput = document.querySelector("#city-input");
  let currentCity = document.querySelector("#city-name");
  currentCity.innerHTML = showCityInput.value.toUpperCase();
  console.log(showCityInput.value);

  let iconElement = document.querySelector("#icon");

  let city = showCityInput.value;
  let apiKey = "ec23e2ff6f0483966bf50ed682b76bdd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  function showCityTemp(response) {
    let searchCityTemp = Math.round(response.data.main.temp);
    let cityTemp = document.querySelector("#display-current-temp");
    cityTemp.innerHTML = `${searchCityTemp}`;

    FahrenheitTemp = Math.round(response.data.main.temp);

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
  }

  axios.get(apiUrl).then(showCityTemp);
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
displayForecast();

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
body.onload = showCurrentCity;

//Forecast
//function getForecast(coordiates) {
//console.log(coordiates);

//let apiKey = "c86a96e0f8cecbd4218d761223d4a849";
//let apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordiates.lat}&lon=${coordiates.lon}&appid=${apiKey}&units=imperial`;}
