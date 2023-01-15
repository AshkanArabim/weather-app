// DATA
// contains all functions that deal with handline data form OpenWeatherMap

export default async function data(city, isMetric) {
  const key = "d4c3301e7c7b03c479ca4c063371796e";
  const unit = isMetric ? 'metric' : 'imperial';

  // return the
  return await getCurrent(city);

  async function getCurrent(city) {
    // TODO: (later) add support for state and country names
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=${unit}`).then((response) => response.json());
  }

  // convert city name to latitude and longitude --> sometimes useful
  async function getCoords(cityName) {
    return await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${key}`)
      .then((response) => response.json())
      .then((response) => {
        return [response[0].lat, response[0].lon];
      });
  }
}
