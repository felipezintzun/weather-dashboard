var apiKey = "7a8c1bcf69306c6abefcbac5b212cfd8"

$("#submit-btn").on("click", function () {
    var cityInput = $("#input-area").val()
    console.log(cityInput)
        $("#previousCity").text(cityInput)
    coordinatesCall(cityInput)
});

function coordinatesCall(cityInput) {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`,
        type: 'GET',
        success: function (results) {
            console.log(results)
            var lat = results.coord.lat
            var lon = results.coord.lon
            console.log(lat, lon)
            oneCity(lat, lon)

            var previousSearch = JSON.parse(localStorage.getItem("weather-dash")) || []
            previousSearch.push(cityInput)
            localStorage.setItem("weather-dash",JSON.stringify(previousSearch))
            searchHistory()
        }
    })
};

searchHistory()

function searchHistory () {
    var previousSearch = JSON.parse(localStorage.getItem("weather-dash")) || []
    var searchC = "<h2 id='previousCity'></h2>"
    for (let i = 0;i<previousSearch.length;i++) {

        searchC +=`<button class="button">${previousSearch[i]}</button>`

    }

    $("#searchHistory").html(searchC)
};

$("#searchHistory").on("click","button",function(event){
    event.preventDefault();

    var city = $(this).text()
    coordinatesCall(city)
});

function oneCity(lat, lon) {
    var request;

    request = $.ajax({
        url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`,
        type: 'GET',
        success: function (results) {
            console.log(results)

            $("#current-weather").html(`
            <div class="card"><h2>Current Weather</h2>
            <div class="card-content">
                <div class="content">
                <img src="http://openweathermap.org/img/wn/${results.current.weather[0].icon}@2x.png"/>
                <p>Temp:${results.current.temp}</p>
                <p>Description: ${results.current.weather[0].main}
                <p>Weather:${results.current.weather}</p>
                <p>Wind Speed:${results.current.wind_speed}</p>
                <p>Humidity:${results.current.humidity}</p>
                <p>UVI:${results.current.uvi}</p>
                </div>
            </div>
            </div>
            `)
            var fiveDayForecast =""
            for (let i = 0;i<5;i++){
                fiveDayForecast+=`
                <div class="card">
                <div class="card-content">
                    <div class="content">
                    <span id="date">${moment(data.daily[0].dt, "X").format("MM/DD/YYYY")}</span>
                    <img src="http://openweathermap.org/img/wn/${results.current.weather[0].icon}@2x.png"/>
                    <p>Temp:${results.daily[i].temp.day}</p>
                    <p>Description: ${results.daily[i].weather[0].main}
                    <p>Weather:${results.daily[i].weather}</p>
                    <p>Wind Speed:${results.daily[i].wind_speed}</p>
                    <p>Humidity:${results.daily[i].humidity}</p>
                    <p>UVI:${results.daily[i].uvi}</p>
                    </div>
                </div>
                </div>
                `
            }
            $("#five-day-forecast").html(fiveDayForecast)
        }
    });

    // request.done(function(response){
    //     formatSearch(response);
    // });
};

function formatSearch(jsonObject) {
    var city_name = jsonObject.name;
    var city_weather = jsonObject.weather[0].main;
    var city_temp = jsonObject.main.temp;

    $("#city-name").text(city_name);
    $("#city-weather").text(city_weather);
    $("#city-temp").text(city_temp + " Fahrenheit");

};
