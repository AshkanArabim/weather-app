// DOM
// job: renders the data provided by data.js by writing to the dom

import getData from "./data";
import getBG from "./background";

export default function dom(city, isMetric) {
  const body = qs("body");
  const unit = isMetric ? "°C" : "°F";
  const speedUnit = isMetric ? "m/s" : "mph";
  body.textContent = ""; // clears the body
  getData(city, isMetric).then((data) => render(data));

  // generates the dom tree and fills in the information
  function render(data) {
    console.log(data);
    getBG(data.weather[0].main).then((imgdata) => {
      console.log(imgdata);
    });
    header();
    dashboard(data);
    appChilds(body, etc("footer", "©AshkanArabim, 2022")); //footer
  }

  // make header
  function header() {
    const header = cr("header");
    const searchform = etc("form", "", "searchform");
    const searchbar = etc("input", "", "search");
    const unitbtn = etc("button", "C/F", "chunit");
    const searchbtn = etc("button", "Search", "searchbtn");

    searchform.addEventListener("submit", (event) => {
      event.preventDefault();
      dom(searchbar.value, isMetric);
    });
    unitbtn.addEventListener("click", () => {
      dom(city, !isMetric);
    });

    sa(searchbar, "placeholder", "search city");
    sa(searchbar, "type", "text");
    appChilds(body, header);
    appChilds(header, searchform, unitbtn);
    appChilds(searchform, searchbar, searchbtn);
  }

  function dashboard(data) {
    const dashboard = etc("div", "", "dashboard");
    const countryCode = data.sys.country;

    //create summary section
    const brief = etc("div", "", "brief");
    const city = etc("h2", `${data.name}, ${getFlagEmoji(countryCode)}`, "city");
    const temp = etc("h1", Math.floor(data.main.temp) + unit, "temp");
    const sky = etc("h3", data.weather[0].main, "sky");

    //create details section
    const details = etc("div", "", "details");
    const min = etc("p", "", "min");
    const max = etc("p", "", "max");
    const feel = etc("p", "", "feel");
    const wind = etc("p", "", "wind");
    const visibility = etc("p", "", "visibility");
    const bar = etc("p", "", "bar");
    const humid = etc("p", "", "humic");
    const dew = etc("p", "", "dew");

    appChilds(min, etc("span", "Min:"), etc("span", Math.floor(data.main.temp_min) + unit, "data"));
    appChilds(max, etc("span", "Max:"), etc("span", Math.floor(data.main.temp_max) + unit, "data"));
    appChilds(feel, etc("span", "Feels like:"), etc("span", Math.floor(data.main.feels_like) + unit, "data"));
    appChilds(wind, etc("span", "Max Wind:"), etc("span", `${data.wind.speed + speedUnit}, ${data.wind.deg}°`, "data"));
    appChilds(visibility, etc("span", "Visibility:"), etc("span", data.visibility + "m", "data"));
    appChilds(bar, etc("span", "Air Pressure:"), etc("span", data.main.pressure + "hPa", "data"));
    appChilds(humid, etc("span", "Humidity:"), etc("span", data.main.humidity + "%", "data"));

    // create the hierarchy
    appChilds(body, dashboard);
    appChilds(dashboard, brief, details);
    appChilds(brief, city, temp, sky);
    appChilds(details, min, max, feel, wind, visibility, bar, humid, dew);
  }

  // utilities for dom manipulation

  function cr(element) {
    return document.createElement(element);
  }

  function qs(query) {
    return document.querySelector(query);
  }

  function appChilds(parent) {
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

  function sa(element, attr, val) {
    element.setAttribute(attr, val);
  }

  // credits to: https://dev.to/jorik/country-code-to-flag-emoji-a21
  function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  }
}
