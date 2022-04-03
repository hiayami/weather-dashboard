//API variables
var requestWeatherTemplate = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=52a460edbf4d8975eb6d58e67256d948'
var getLatLongTemplate = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=52a460edbf4d8975eb6d58e67256d948'
var currentDate = moment().format('l')

//will display current date 
document.querySelector('#weather-today-date').innerText= currentDate;

//gets coordinates from city that is entered from the user. City is used as parameter for API to get latitude and longitude
function getLatLong (city) {
    var getCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=52a460edbf4d8975eb6d58e67256d948'
    fetch(getCoordinates).then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
              console.log (data);
              console.log (data[0].lat, data[0].lon);
              document.querySelector('#weather-today-city').innerText = city;
              //calls getForecast function to get the weather
              getForecast (data[0].lat, data[0].lon);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      });
}

//API needs latitude and longitude for weather conditions
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

//this will convert kelvin (from weather API) to fahrenheit
function getFahrenheit (kelvin) {
    return((kelvin - 273.15) * 9/5 + 32).toFixed(2) + '°F'
}

//function to get the weather forecast with latitude and longitude
function getForecast (latitude, longitude) {
    var getFiveDayWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +latitude + '&lon=' + longitude + '&appid=52a460edbf4d8975eb6d58e67256d948';
    fetch(getFiveDayWeather).then(function (response) {
        //this will show the current weather information such as temp, icon, wind, humidity and uvi
        if (response.ok) {
            response.json().then(function (data) {
                console.log (data)
                let weatherPic = data.current.weather[0].icon
                document.querySelector('#weather-today-icon').setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                document.querySelector('#weather-today-temp').innerText = getFahrenheit(data.current.temp)
                document.querySelector('#weather-today-wind').innerText = (data.current.wind_speed) + ' MPH'
                document.querySelector('#weather-today-humidity').innerText = (data.current.humidity) + ' %'
                document.querySelector('#weather-today-uvi').innerText = (data.current.uvi);
                //this will change the color of uvi background according to the uvi value (safe, dangerous, etc.)
                let uviColor = '#B567A4'
                let uvi = data.current.uvi
                if (uvi <= 2) {
                    uviColor = '#3EA72D'
                } else if (uvi <= 4) {
                    uviColor = "#FFF300"
                } else if (uvi <= 6) {
                    uviColor = "#F18B00"
                } else if (uvi <= 9) {
                    uviColor = "#E53210"
                }
                document.querySelector('#weather-today-uvi').style.backgroundColor = uviColor
                //for-loop used to gather weather forecast from API for the following 5 days after current weather
                for (let i = 0; i < 5; i ++) {
                    document.querySelector('.day-' + i + ' h4').innerText=moment().add(i+1, 'd').format('l');
                    var dailyWeatherIcon = data.daily[i].weather[0].icon
                    document.querySelector('.day-' + i + ' img').setAttribute("src","https://openweathermap.org/img/wn/" + dailyWeatherIcon + "@2x.png");
                    document.querySelector('.day-' + i + ' .five-day-temp').innerText= getFahrenheit(data.daily[i].temp.day);
                    document.querySelector('.day-' + i + ' .five-day-wind').innerText = (data.daily[i].wind_speed) + ' MPH';
                    document.querySelector('.day-' + i + ' .five-day-humidity').innerText = (data.daily[i].humidity)  + ' %';
                } 
                //weather information/results are visible once user enters city
                document.querySelector('.side-weather').style.visibility = 'visible'
            })
        }
    })
}

//adds the search history buttons
function appendCityToSearch(city) {
    document.querySelector('#side-search').innerHTML += `
        <button class="btn btn-secondary previous-location" onclick="onPrevSearch(event)">
            ${city}
        </button>
    `
}

//locations user enters are stored in local storage
const previousLocations = JSON.parse(localStorage.getItem('previous-locations')) || []
previousLocations.forEach(city => appendCityToSearch(city))

function onSearch() {
    const city = document.querySelector('#city').value;
    getLatLong(city);
    previousLocations.push(city);
    localStorage.setItem('previous-locations', JSON.stringify(previousLocations))
    appendCityToSearch(city)
}

//user can click on previous locations to bring up weather results from search history cities
function onPrevSearch(event) {
    const city = event.target.innerText
    getLatLong(city)
}


// document.querySelector('#weather-today-date').innerText= currentDate;
