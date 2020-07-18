let now = new Date();
let date = document.querySelector("#date");
let exactDate = now.getDate();

let weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let weekDay = weekDays[now.getDay()];

let firstDay = weekDays[now.getDay() + 1];
let futureDayOne = document.querySelector("#dayOne");
futureDayOne.innerHTML = `${firstDay}`;

let secondDay = weekDays[now.getDay() + 2];
let futureDayTwo = document.querySelector("#dayTwo");
futureDayTwo.innerHTML = `${secondDay}`;

let thirdDay = weekDays[now.getDay() + 3];
let futureDayThree = document.querySelector("#dayThree");
futureDayThree.innerHTML = `${thirdDay}`;

let fourthDay = weekDays[now.getDay() + 4];
let futureDayFour = document.querySelector("#dayFour");
futureDayFour.innerHTML = `${fourthDay}`;

let fifthDay = weekDays[now.getDay() + 5];
let futureDayFive = document.querySelector("#dayFive");
futureDayFive.innerHTML = `${fifthDay}`;

let months = [
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
];

let month = months[now.getMonth()];

let year = now.getFullYear();

date.innerHTML = `${weekDay} ${exactDate}. ${month}. ${year}`;

let time = document.querySelector("#time");
let hours = now.getHours();
let minutes = now.getMinutes();

time.innerHTML = `${hours}:${minutes} (CEST)`;

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
}

function showWeather(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  let apiKey = "76a7e745e91f7cd565ea8e50df623f83";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);

  let actualIcon = document.querySelector("#icon");
  let newIcon = response.data.weather[0].icon;
  actualIcon.src = `http://openweathermap.org/img/wn/${newIcon}@2x.png`;
}

function searchEngine(city) {
  let apiKey = "76a7e745e91f7cd565ea8e50df623f83";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchEngine(city);
}

document.querySelector("#search-form").addEventListener("submit", handleSubmit);

searchEngine();

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getPosition);

function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "76a7e745e91f7cd565ea8e50df623f83";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
