$( document ).ready(getWeatherInfo);



/* concord between .icon response of dark sky
and the class of the icon from api
 */
var iconValue ={
  "clear-day":"wi-day-sunny",
   "clear-night":"wi-night-clear",
    "rain":"wi-rain",
     "snow":"wi-snow",
      "sleet":"wi-sleet",
       "wind":"wi-strong-wind",
        "fog":"wi-fog",
         "cloudy":"wi-cloudy",
          "partly-cloudy-day":"wi-day-cloudy",
           "partly-cloudy-night":"wi-night-alt-cloudy"
         }
/*variables used in the app*/
var latitude=undefined;
var longitude=undefined;
var key="002afba0eb55eb754276653ccb396beb";
var temp=0.0;
// getting location with HTML 5 API
function getLocation () {
    if (navigator.geolocation) {// HTML5 geolocation is supported
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      document.alert( "Geolocation is not supported by this browser.");
  }
}
// add coordinates
function showPosition(position) {
    latitude= position.coords.latitude;
    longitude= position.coords.longitude;
}

// gather weather information from darksky api
function getWeatherInfo(){
  getLocation();
 $.getJSON("https://api.darksky.net/forecast/"+key+"/"+latitude+","+longitude+"?extend=hourly&callback=?", function(forecast) {
temp=forecast.currently.apparentTemperature;
$("#degree").text(temp);
$("#unit").text("F°");

$("#weather-icon").addClass(iconValue[forecast.currently.icon]);
$("#weather-state").text(forecast.currently.icon);
$("#location").text(forecast.timezone);
});

}

/* formula of convert from fahrenheit to celsius*/
function fahToCel(value){
  return (value-32)/1.8;
}

/* toggle between celsius and fahrenheit   */
function showConvert() {
if( $("#unit").text()=="F°" ) {
$("#degree").text(fahToCel(temp).toFixed(1));
$("#unit").text("C°");
}
else {
  $("#degree").text(temp);
  $("#unit").text("F°");
}
}
