'use strict';

class Weather {
  constructor(
    temp,
    humidity,
    preasure,
    tempMax,
    tempMin,
    seaLevel,
    wind,
    sky,
    feelsLike,
    weather
  ) {
    this.temp = temp;
    this.humidity = humidity;
    this.preasure = preasure;
    this.tempMax = tempMax;
    this.tempMin = tempMin;
    this.seaLevel = seaLevel;
    this.wind = wind;
    this.sky = sky;
    this.feelsLike = feelsLike;
    this.weather = weather;
  }
  set temp(temp) {
    return (this._temp = Math.round(temp - 273.15));
  }
  set tempMin(tempMin) {
    return (this._tempMin = Math.round(tempMin - 273.15));
  }
  set tempMax(tempMax) {
    return (this._tempMax = Math.round(tempMax - 273.15));
  }
  set feelsLike(feelsLike) {
    return (this._feelsLike = Math.round(feelsLike - 273.15));
  }
}

const inputCity = document.querySelector('.input-city');
const btnCity = document.querySelector('.btn-city');
const displayTemp = document.querySelector('.display-temperature');
const icon = document.querySelector('.icon');
const currentCity = document.querySelector('.current-city');
const sky = document.querySelector('.atmosphere-type');

const maxTemp = document.querySelector('.max-temp');
const minTemp = document.querySelector('.min-temp');
const feelsLike = document.querySelector('.feels-like');

const date = document.querySelector('.date');

const humidity = document.querySelector('.humidity-level');
const wind = document.querySelector('.wind-speed');
const preasure = document.querySelector('.preasure-level');
const typeSky = document.querySelector('.type-sky');

const convertor = function (tempK) {
  return +Math.round(tempK - 273.15);
};

const formatCityName = function (city) {
  const cityName = city.split(' ');

  const cityUpperCase = cityName.map((elem) => {
    return elem.slice(0, 1).toUpperCase() + elem.slice(1).toLowerCase();
  });
  return cityUpperCase.join(' ');
};

btnCity.addEventListener('click', (e) => {
  getWeather(inputCity.value);
});

inputCity.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    getWeather(inputCity.value);
  }
});

const displayStuff = function (location) {
  displayTemp.textContent = `${location._temp}℃`;
  sky.textContent = formatCityName(location.sky);

  maxTemp.textContent = `${location._tempMax}° /`;
  minTemp.textContent = `${location._tempMin}° Feels like`;
  feelsLike.textContent = `${location._feelsLike}°`;

  humidity.textContent = `${location.humidity}%`;
  wind.textContent = `↓ ${location.wind} km/h`;
  preasure.textContent = `${location.preasure} mb`;
  typeSky.textContent = `${location.weather}`;
};

const getWeather = async function (city) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6d8a538c0c143e8d939e9e738eeaa5c1`
    );
    const data = await res.json();

    if (data.message === 'city not found') throw new Error('City not found');

    const location = new Weather(
      data.main.temp,
      data.main.humidity,
      data.main.pressure,
      data.main.temp_max,
      data.main.temp_min,
      data.main.sea_level,
      data.wind.speed,
      data.weather[0].description,
      data.main.feels_like,
      data.weather[0].main
    );
    currentCity.innerHTML = formatCityName(data.name);
    displayStuff(location);
  } catch (err) {
    console.error(err);
  }

  const currentDate = new Date();
  date.innerHTML = `${currentDate.getHours()}:${currentDate.getMinutes()}`;
};

getWeather('arad');

// x celsius =  (273.15 +  x celsius) kelvin

let isToggled = false;

const nightDay = document.querySelector('.night-day-mode');

nightDay.addEventListener('click', () => {
  let root = document.documentElement;
  if (!isToggled) {
    root.style.setProperty('--color-white', 'black');
    root.style.setProperty('--background-color', 'rgb(188,217,255)');
    root.style.setProperty('--body-back', 'lightcyan');
    isToggled = true;
    nightDay.innerHTML = '🌙';
  } else {
    root.style.setProperty('--color-white', 'rgb(232, 232, 232)');
    root.style.setProperty('--background-color', 'rgb(42, 46, 152)');
    root.style.setProperty('--body-back', 'rgb(50, 50, 50)');
    isToggled = false;
    nightDay.innerHTML = '🌞';
  }
});
