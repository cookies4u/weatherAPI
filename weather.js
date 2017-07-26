// geo location //
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation

var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;
var api = 'https://fcc-weather-api.glitch.me/api/current?' + lat + lon;
// var api = 'https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139'

$( document ).ready(function(){
   console.log( "ready!" );
   /*
   var getLocation = () => {
		if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(showPosition);
		} else { 
		    console.log("Geolocation is not supported by this browser.");
		}
	}
	var showPosition = (position) => {
		var lat = "lat=" + position.coords.latitude;
	    var lon = "lon=" + position.coords.longitude;
	    console.log(lat, " ", lon);
	}
	getLocation();
	*/
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function (position) {
	    	var lat = "lat=" + position.coords.latitude;
	    	var lon = "lon=" + position.coords.longitude;
	    	console.log(lat, " ", lon);
	    	getWeather(lat, lon);

	    });
	} else { 
	    console.log("Geolocation is not supported by this browser.");
	}

});


// http://fcc-weather-api.glitch.me
// ajax get command

var getWeather = (lat, lon) => {
	$.ajax({
	  url: api,
	  method: "GET"
	}).done(function(response) {
	  console.log(response);
	  console.log(response.main.temp);
	});
}

/*
{ 
	"coord": { "lon":159, "lat":35 },
	"weather":
		[{ 
			"id":500, 
			"main":"Rain", 
			"description":"light rain", 
			"icon":"https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399" 
		}], 
	"base":"stations", 
	"main":{ "temp":22.59, "pressure":1027.45, "humidity":100, "temp_min":22.59, "temp_max":22.59, "sea_level":1027.47, "grnd_level":1027.45 }, 
	"wind":{ "speed":8.12, "deg":246.503 }, 
	"rain":{ "3h":0.45 },
	"clouds":{ "all":92 }, 
	"dt":1499521932, 
	"sys":{ "message":0.0034, "sunrise":1499451436, "sunset":1499503246 }, 
	"id":0, 
	"name":"", 
	"cod":200 
}
*/