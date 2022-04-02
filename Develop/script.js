var requestWeatherTemplate = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=52a460edbf4d8975eb6d58e67256d948'
var getLatLongTemplate = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid=52a460edbf4d8975eb6d58e67256d948'
var currentDate = moment().format('l')

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

function getFahrenheit (kelvin) {
    return((kelvin - 273.15) * 9/5 + 32).toFixed(2) + '°F'
}

function getForecast (latitude, longitude) {
    var getFiveDayWeather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' +latitude + '&lon=' + longitude + '&appid=52a460edbf4d8975eb6d58e67256d948';
    fetch(getFiveDayWeather).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log (data);
                //(0K − 273.15) × 9/5 + 32 = -459.7°F
                document.querySelector('#weather-today-temp').innerText = getFahrenheit(data.current.temp)
                document.querySelector('#weather-today-wind').innerText = (data.current.wind_speed) + ' MPH'
                document.querySelector('#weather-today-humidity').innerText = (data.current.humidity) + ' %'
                document.querySelector('#weather-today-uvi').innerText = (data.current.uvi);
                for (let i = 0; i < 5; i ++) {
                    document.querySelector('.day-' + i + ' h4').innerText=moment().add(i+1, 'd').format('l');
                    document.querySelector('.day-' + i + ' .five-day-temp').innerText= getFahrenheit(data.daily[i].temp.day);
                    document.querySelector('.day-' + i + ' .five-day-wind').innerText = (data.daily[i].wind_speed) + ' MPH';
                    document.querySelector('.day-' + i + ' .five-day-humidity').innerText = (data.daily[i].humidity)  + ' %';
                } 
                document.querySelector('.side-weather').style.visibility = 'visible'
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
              //searchLatLong (data[0].lat, data[0].lon)
              document.querySelector('#weather-today-city').innerText = city;
              getForecast (data[0].lat, data[0].lon);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      });
}

// var uviEl = data1.current.uvi;

// UVindexEl.textContent = uviEl + " uvi";

// if (uviEl >= 0 && uviEl < 3) {
//         UVindexEl.style.backgroundColor = "#3EA72D";
//     } else if (uviEl >= 3 && uviEl < 6) {
//         UVindexEl.style.backgroundColor = "#FFF300";
//     } else if (uviEl >= 6 && uviEl < 8) {
//         UVindexEl.style.backgroundColor = "#F18B00";
//     } else if (uviEl >= 8 && uviEl < 10.01) {
//         UVindexEl.style.backgroundColor = "#E53210";
//     } else {
//         UVindexEl.style.backgroundColor = "#B567A4";
//     };

// var uviBackground = data.current.uvi;
// document.querySelector('.uvi-color').value = uviBackground
// if(uviBackground >= 0 && uviBackground < 3) {
//     uviBackgroun.sytle.backgroundColor = "#3EA72D"
// }

function appendCityToSearch(city) {
    document.querySelector('#side-search').innerHTML += `
        <button class="btn btn-secondary previous-location" onclick="onPrevSearch(event)">
            ${city}
        </button>
    `
}

const previousLocations = JSON.parse(localStorage.getItem('previous-locations')) || []
previousLocations.forEach(city => appendCityToSearch(city))

function onSearch() {
    const city = document.querySelector('#city').value;
    getLatLong(city);
    previousLocations.push(city);
    localStorage.setItem('previous-locations', JSON.stringify(previousLocations))
    appendCityToSearch(city)
}

function onPrevSearch(event) {
    const city = event.target.innerText
    getLatLong(city)
}


document.querySelector('#weather-today-date').innerText= currentDate;
