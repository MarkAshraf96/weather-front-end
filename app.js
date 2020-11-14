
var app = angular.module('weather', []);

app.controller('myCtrl', function ($scope, $http) {
    degree = document.getElementById("degree");
    weatherText = document.getElementById("weatherText");
    city = document.getElementById("city");
    lastUpdated = document.getElementById("lastUpdated");

    iconID = null;
    latitude = null;
    longitude = null;
    response = null;

    $scope.getInitial = function () {
        const myData = JSON.parse(LastUpdate);
        degree.innerHTML = myData[0].degree + "&#8451";
        weatherText.innerHTML = myData[0].description;
        city.innerHTML = myData[0].city;
        lastUpdated.innerHTML = "Last Updated: " + myData[0].dt;
        $scope.weatherIconID = `http://openweathermap.org/img/wn/${myData[0].icon}@2x.png`;
        iconID = myData[0].icon;
        getLocation();

    }

    getLocation = function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(getPosition);
        } else {
            degree.innerHTML = "Geolocation is not supported by this browser.";
        }
    }
    getPosition = function (position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
    }

    $scope.getWeather = function () {
        if (latitude != null && longitude != null) {
            URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&exclude=hourly,daily&appid=900fee089d9eb34c4eb61e94ed0fd04a`
            $http.get(URL)
                .then(function (response) {

                    degree.innerHTML = response.data.main.temp + "&#8451";
                    weatherText.innerHTML = response.data.weather[0].description;
                    city.innerHTML = response.data.name;
                    $scope.weatherIconID = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
                    iconID = response.data.weather[0].icon;
                    unixConverter(response.data.dt)
                   // sendData();

                }, function (response) {
                    // Second function handles error
                    alert("Something went wrong");
                    response = "Something went wrong"
                });
        }
        else {
            alert("Permission to access location was not given.");
        }
      
    }

    unixConverter = function (timeStamp) {
        milliseconds = timeStamp * 1000;
        dateObject = new Date(milliseconds);
        lastUpdated.innerHTML = "Last Updated: " + dateObject.toLocaleString();
    }

    // postdata = function () {
    //     var data = {
    //         city: city.innerHTML,
    //         description: weatherText.innerHTML,
    //         dt: lastUpdated.innerHTML,
    //         degree: degree.innerHTML,
    //         icon: iconID

    //     };
    //     $http.post("http://localhost:3000/Temperature", JSON.stringify(data)).then(function (response) {
    //         if (response.data)

    //             alert("Post Data Submitted Successfully!");

    //     }, function (response) {

    //         alert( "Service not Exists");
    //     });

    // };
});