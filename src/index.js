//Feature 1
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

//Feature 2 Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.

let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", showCity);

//BONUS

function showCurrentCity() {
  function showCityTemp(response) {
    console.log(response.data.main.temp);
    let currentCityTemp = Math.round(response.data.main.temp);
    let currentCityName = response.data.name.toUpperCase();
    let currentCityConditions =
      response.data.weather[0].description.toUpperCase();
    let displayTemp = document.querySelector("#display-current-temp");
    displayTemp.innerHTML = `${currentCityTemp}`;

    let displayCityName = document.querySelector("#city-name");
    displayCityName.innerHTML = `${currentCityName}`;

    let displayCityConditions = document.querySelector("#weather-description");
    displayCityConditions.innerHTML = `${currentCityConditions}`;
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

let currentLocation = document.querySelector("#current-city-button");
currentLocation.addEventListener("click", showCurrentCity);

//Fahrenheit Display

//function displayFahrenheit(event) {event.preventDefault();

//let showCityTempFahrenheit = document.querySelector("#display-current-temp");
//showCityTempFahrenheit.innerHTML = "0";}

//let tempFahrenheit = document.querySelector("#temp-fahrenheit");
//tempFahrenheit.addEventListener("click", displayFahrenheit);

// Celcius Display

//function displayCelsius(event) {
//event.preventDefault();

//let showCityTempCelsius = document.querySelector("#display-current-temp");
//showCityTempCelsius.innerHTML = "1";}

//let tempCelsius = document.querySelector("#temp-celsius");
//tempCelsius.addEventListener("click", displayCelsius);
