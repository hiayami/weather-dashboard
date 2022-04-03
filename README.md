# weather-dashboard
About this Project:
Main take-away of this project is to make use of third-party APIs in order to tailor an application with desirable functionality.

User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

Acceptance Criteria
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

Reference APIs Used for weather forecast and time:
https://momentjs.com/
https://openweathermap.org/api/one-call-api
https://getbootstrap.com/

Potential issues:
search criteria parameters currently only include one result for city entered. This can bring up results the user may not want (i.e. there can be multiple cities with the same name and only one result/city will show).![Weather-Dashboard-ScreenShot](https://user-images.githubusercontent.com/98536530/161405632-8ace21e4-d2bf-475b-a275-e8c2963d5bfc.png)
