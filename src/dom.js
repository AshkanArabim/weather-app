// DOM
// job: renders the data provided by data.js by writing to the dom

// main
// gets: nothing
// returns: nothing
// job: calls all the other funcs
function render() {
  data().then((resp) => console.log(resp));

  async function data() {
    const key = "d4c3301e7c7b03c479ca4c063371796e";
    return await getData("current", "el paso", key);
  }

  async function getData(type, city, key) {
    // TODO: later, support countly code and state code
    let url;
    switch (type) {
      case "current":
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
        break;
      case "pollution":
        const coords = await getCoords(city, key);
        url = `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coords[0]}&lon=${coords[1]}&appid=${key}`;
        break;
      case "3hourly":
        url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;
        break;
      default:
        url = "lol";
    }

    return await fetch(url).then((response) => response.json());
  }

  // convert city name to latitude and longitude --> sometimes useful
  async function getCoords(cityName, key) {
    return await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`)
      .then((response) => response.json())
      .then((response) => {
        return [response[0].lat, response[0].lon];
      });
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
}

export default render;
