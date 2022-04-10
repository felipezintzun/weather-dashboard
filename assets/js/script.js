var apiKey = "7a8c1bcf69306c6abefcbac5b212cfd8"

 $("#submit-btn").on("click",function(){
    var cityInput = $("#input-area").val()
    console.log(cityInput)

    coordinatesCall(cityInput)
 })

 function coordinatesCall (cityInput) {
     $.ajax({
         url:`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`,
         type:'GET',
         success: function(results) {
             console.log(results)
             var lat = results.coord.lat
             var lon = results.coord.lon
             console.log(lat,lon)
             oneCity(lat,lon)
         }
     })
 }

 function oneCity (lat,lon) {
    var request;

    request = $.ajax({
        url:`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=${apiKey}&units=imperial`,
        type:'GET',
        success: function(results) {
            console.log(results)
        }
    });

    request.done(function(response){
        formatSearch(response);
    });
}


function formatSearch(jsonObject) {
    var city_name = jsonObject.name;
    var city_weather = jsonObject.weather[0].main;
    var city_temp = jsonObject.main.temp;

    $("#city-name").text(city_name);
    $("#city-weather").text(city_weather);
    $("#city-temp").text(city_temp+ " Fahrenheit");

}
