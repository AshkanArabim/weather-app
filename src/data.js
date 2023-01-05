// DATA
// USELESS FOR NOW, MAY CHANGE LATER

export default async function data() {
  const key = "d4c3301e7c7b03c479ca4c063371796e";
  return await get3Hourly("el paso", key);

  async function getCurrent(city) {
    // TODO: (later) add support for state and country names
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`).then((response) => response.json());
  }

  // convert city name to latitude and longitude --> sometimes useful
  async function getCoords(cityName) {
    return await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`)
      .then((response) => response.json())
      .then((response) => {
        return [response[0].lat, response[0].lon];
      });
  }

  async function getPollution(city) {
    // TODO: (later) add support for state and country names
    return await getCoords(city, key)
      .then((coords) => fetch(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${coords[0]}&lon=${coords[1]}&appid=${key}`))
      .then((response) => response.json())
      .then((response) => response.list); // returns the actual data instead of the useless stuff
  }

  async function get3Hourly(city) {
    // TODO: (later) add support for state and country names
    return await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`)
      .then((response) => response.json())
      .then((response) => response.list); // returns data instead of other stuff
  }
}
