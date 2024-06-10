const weatherPopup = document.getElementById('weatherPopup');
const openWeatherPopupButton = document.querySelector('.header__list-text');
const closeBtn = document.querySelector('.popup__close-button');

const popupForm = document.querySelector('.popup__form');
const cityInput = document.querySelector('.popup__form-input');
const card = document.querySelector('.popup__card');
const apiKey = '07774abb60043d3b1f6758ae81ce5434';

popupForm.addEventListener("submit", async event => {
  event.preventDefault();
  const city = cityInput.value;
  if(city) {
    try{
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    }
    catch(error) {
      console.error(error);
      displayError(error);
    }
  }
  else {
    displayError("Пожалуйста введите название города")
  }
})

async function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const response = await fetch(apiUrl);
    if(!response.ok) {
      throw new Error("Не удалось получить данные о погоде");
    }
    return await response.json();
};

function displayWeatherInfo(data) {

  const {name: city, 
        main: {temp, humidity},
        weather: [{description, id}]} = data;

  card.textContent = "";
  card.style.display = "flex";
  
  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humidityDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const weatherEmoji = document.createElement("p")

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
  humidityDisplay.textContent = `влажность: ${humidity}%`;
  descDisplay.textContent = description;
  weatherEmoji.textContent = getWeatherEmoji(id);

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humidityDisplay.classList.add("humidityDisplay");
  descDisplay.classList.add("descDisplay");
  weatherEmoji.classList.add("weatherEmoji");


  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humidityDisplay);
  card.appendChild(descDisplay);
  card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {

  switch(true) {
    case (weatherId >= 200 && weatherId < 300):
      return `⛈️`;
    case (weatherId >= 300 && weatherId < 400):
      return `🌧️`;
    case (weatherId >= 500 && weatherId < 600):
      return `🌧️`;
    case (weatherId >= 600 && weatherId < 700):
    return `❄️`;
    case (weatherId >= 700 && weatherId < 800):
      return `🌫️`;
    case (weatherId === 800 ):
      return `☀️`;
    case (weatherId >= 801 && weatherId < 810):
      return `☁️`;
      default:
        return "❓";
  }
}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;
  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}


openWeatherPopupButton.addEventListener('click', () => {
  weatherPopup.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  weatherPopup.style.display = 'none';
});

window.addEventListener('click', event => {
  if (event.target == weatherPopup) {
    weatherPopup.style.display = 'none';
  }
})

const progressBarEl = document.getElementById("progress-bar");

window.addEventListener("scroll", () => {
  let height = document.body.scrollHeight - window.innerHeight;
  let scrollPosition = document.documentElement.scrollTop;
  let width = (scrollPosition / height) * 100;
  progressBarEl.style.width = `${width}%`;
});
