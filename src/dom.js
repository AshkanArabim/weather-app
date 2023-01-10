// DOM
// job: renders the data provided by data.js by writing to the dom

import getData from "./data";

export default function render() {
  getData("el paso").then((data) => dom(data));
  const body = qs("body");

  // generates the dom tree and fills in the information
  function dom(data) {
    console.log(data);
    header(); // generate header
    dashboard(); // generate dashboard
    // generate hourly (every 3 hours, just next 24hrs)
    // generate daily (5 days)

    // generate footer
    appChilds(body, etc("footer", "©AshkanArabim, 2022"));
  }

  // make header
  function header() {
    const header = cr("header");
    const searchform = etc("form", "", "searchform");
    const searchbar = etc("input", "", "search");
    const unitbtn = etc("button", "C/F", "chunit");
    const searchbtn = etc("button", "Search", "searchbtn");

    sa(searchbar, "placeholder", "search city");
    sa(searchbar, "type", "text");
    appChilds(body, header);
    appChilds(header, searchform, unitbtn);
    appChilds(searchform, searchbar, searchbtn);
  }

  function dashboard() {
    const dashboard = etc('div','','dashboard');

    //create summary section
    const brief = etc('div','','brief');
    const city = etc('h2','--','city');
    const temp = etc('h1','--','temp');
    const sky = etc('h3','--','sky');
    
    //create details section
    const details = etc('div','','details');
    const feel  = etc('p','','feel');
    const wind = etc('p','','wind');
    const visibility = etc('p','','visibility');
    const bar = etc('p','','bar');
    const humid = etc('p','','humic');
    const dew = etc('p','','dew');

    appChilds(
      feel,
      etc('span','Real Feeling:'),
      etc('span','--','data')
    )
    appChilds(
      wind,
      etc('span','Max Wind:'),
      etc('span','--','data')
    )
    appChilds(
      visibility,
      etc('span','Visibility:'),
      etc('span','--','data')
    )
    appChilds(
      bar,
      etc('span','Air Pressure:'),
      etc('span','--','data')
    )
    appChilds(
      humid,
      etc('span','Humidity:'),
      etc('span','--','data')
    )
    appChilds(
      dew,
      etc('span','Dew Point:'),
      etc('span','--','data')
    )

    // create the hierarchy
    appChilds(body, dashboard);
    appChilds(dashboard, brief, details);
    appChilds(brief, city, temp, sky);
    appChilds(details, feel, wind, visibility, bar, humid, dew)
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
}
