// geo location //
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation

var lat, lon;
var tempUnit = 'C';
var currentTempInCelsius;
var api = 'https://fcc-weather-api.glitch.me/api/current?';
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

	$("#tempUnit").click(function() {
		tempUnit = (tempUnit === 'C' ? 'F' : 'C');
		console.log(tempUnit);
		$('#tempUnit').text(tempUnit);
		if (tempUnit === 'F') {
			var fahTemp = Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);
			$("#temp").text(fahTemp + " " + String.fromCharCode(176));
		} else {
			$("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
		}
	});

});


// http://fcc-weather-api.glitch.me
// ajax get command

var getWeather = (lat, lon) => {
	$.ajax({
	  url: api + lat + '&' + lon,
	  method: "GET"
	}).done(function(response) {
	  console.log(response);
	  console.log(response.main.temp);
	  $("#city").text(response.name + ", ");
      $("#country").text(response.sys.country);

      currentTempInCelsius = response.main.temp;
      $("#temp").text(currentTempInCelsius + " " + String.fromCharCode(176));
      $("#tempunit").text(tempUnit);

      document.getElementById('icon').setAttribute("src", response.weather[0].icon);
      $("#description").text(response.weather[0].description);
	});
}

/*
{
    "coord": {
        "lon": 139,
        "lat": 35
    },
    "weather": [
        {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "https://cdn.glitch.com/6e8889e5-7a72-48f0-a061-863548450de5%2F10n.png?1499366021399"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 24.3,
        "pressure": 1010.78,
        "humidity": 100,
        "temp_min": 24.3,
        "temp_max": 24.3,
        "sea_level": 1019.77,
        "grnd_level": 1010.78
    },
    "wind": {
        "speed": 8.36,
        "deg": 27.0031
    },
    "rain": {
        "3h": 8.285
    },
    "clouds": {
        "all": 80
    },
    "dt": 1501022355,
    "sys": {
        "message": 0.0039,
        "country": "JP",
        "sunrise": 1500925721,
        "sunset": 1500976317
    },
    "id": 1851632,
    "name": "Shuzenji",
    "cod": 200
}
*/