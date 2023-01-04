// DOM
// job: renders the data provided by data.js by writing to the dom

// main
// gets: nothing
// returns: nothing
// job: calls all the other funcs
function render() {
  data().then(resp => console.log(resp));
}

async function data() {
  const key = "d4c3301e7c7b03c479ca4c063371796e";
  return await getPollution("el paso", key);
}

async function getCurrent(city, key) {
  // TODO: (later) add support for state and country names
  return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((response) => response.json())
}

// convert city name to latitude and longitude --> sometimes useful
async function getCoords(cityName, key) {
  return await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`)
    .then((response) => response.json())
    .then(response => {
      return [response[0].lat, response[0].lon];
    })
}

async function getPollution(city, key) {
  // TODO: (later) add support for state and country names
  return await getCoords(city, key)
  .then(coords => fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coords[0]}&lon=${coords[1]}&appid=${key}`))
}

async function getHourly(city, key) {
  // TODO: (later) add support for state and country names
  return await fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&appid=${key}`)
    .then((response) => response.json())
}

async function getWeekly(city, key) {
  // TODO: (later) add support for state and country names
  return await fetch(`api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&appid=${key}`)
    .then((response) => response.json())
}

// utilities for dom manipulation
function cr(element) {
  return document.createElement(element);
}

function qs(query) {
  return document.querySelector(query);
}

function appChildren(parent) {
  for (let i = 1; i <= arguments.length - 1; i++) {
    parent.appendChild(arguments[i]);
  }
}

function etc(element, text) {
  const product = cr(element);
  product.textContent = text;
  if (arguments[2]) {
    for (let i = 2; i < arguments.length; i++) {
      product.classList.add(arguments[i]);
    }
  }
  return product;
}

export default render;
