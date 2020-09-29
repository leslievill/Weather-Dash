$(document).ready(function(){

    var cities = [];

    $("#currentCity").hide();
    $("#fiveDay").hide();

    //main current city forecast API Call
    function currentCityForecast(city){
        var apiKey = "0fcb591e23303f02ceac7bdfd808d0cf";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var weatherIcon = response.weather[0].icon;
            var date = $("<h2>").text(moment().format('l'));
            var icon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"); 
            //convert temp to fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
                
            $("#currentCityName").text(response.name);
            $("#currentCityName").append(date);
            $("#currentCityName").append(icon);
            $("#currentCityTemp").text(tempF.toFixed(2) + " \u00B0F");
            $("#currentCityHumid").text(response.main.humidity + "%");
            $("#currentCityWind").text(response.wind.speed + "MPH");

                var lat = response.coord.lat
                var lon = response.coord.lon
                queryURL = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon; 
                $.ajax({
                    url: queryURL,
                    method: "GET"
                }).then(function(response){
                    var uvIndex = response.value;
                    $("#currentCityUV").removeClass("favorable");
                    $("#currentCityUV").removeClass("moderate");
                    $("#currentCityUV").removeClass("severe");
                        if (uvIndex <= 2.9){
                            $("#currentCityUV").addClass("favorable");
                        } else if (uvIndex >= 3 && uvIndex <= 7.9){
                            $("#currentCityUV").addClass("moderate");
                        } else {
                            $("#currentCityUV").addClass("severe");
                        };

                        $("#currentCityUV").text(response.value);
                    
                });   

                $("#currentCity").show();   
        }); 
    };
}