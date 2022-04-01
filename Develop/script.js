var requestWeatherTemplate = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=52a460edbf4d8975eb6d58e67256d948'
var getLatLongTemplate = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=52a460edbf4d8975eb6d58e67256d948'
var requestForecastTemplate = 'https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid=52a460edbf4d8975eb6d58e67256d948'

function searchLatLong (latitude, longitude) {
    var requestWeather = 'https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&appid=52a460edbf4d8975eb6d58e67256d948';
    fetch(requestWeather).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            console.log (data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      });
}

function getForecast (latitude, longitude) {
    var getFiveDayWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +latitude + '&lon=' + longitude + '&appid=52a460edbf4d8975eb6d58e67256d948';
    fetch(getFiveDayWeather).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log (data);
            })
        }
    })
}

function getLatLong (city) {
    var getCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=52a460edbf4d8975eb6d58e67256d948'
    fetch(getCoordinates).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
              console.log (data);
              console.log (data[0].lat, data[0].lon);
              searchLatLong (data[0].lat, data[0].lon)
              getForecast (data[0].lat, data[0].lon);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      });
}
// getLatLong('London') //will need to get text area/string user types in to call function

document.querySelector("#city-search-form").onsubmit = (event) => {
    event.preventDefault();
    const city = document.querySelector('#city').value;
    getLatLong(city)
}

//data[0].lat


//function with lat/long with input inserts into this url
//split into mult strings