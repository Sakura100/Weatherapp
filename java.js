

$(document).ready(function(){

// JS objects
$container = $(".container");
$cityName = $container.find('#city-Name');
$weatherIcon = $container.find('#weather-Icon');
$tempC=$container.find('#temp-C');
$tempChangeButton=$container.find('#change-Temp');
$windSpeed=$container.find("#wind-speed");
$pressure=$container.find("#pressure");
$humidity=$container.find("#humidity");
$skyCondition=$container.find("#sky-condition");
$weatherImage=$container.find("#weather-image");

// initialize variables
var lat,long;
var apiLink,imageLink;
var tempC,tempF=0;
var temp=0;
var city, country, picLink, windSpeed,pressure,humidity, weather;

// main function
navigator.geolocation.getCurrentPosition(function(position){
	getPosition(position);
	getAPI();	
	 });


// get Position function
function getPosition(position){
	lat=position.coords.latitude;
	long=position.coords.longitude; };
	//$cityName.html(lat);
	//$tempC.html(long);


// get API
function getAPI(){

	apiLink = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+long;
	$.getJSON(apiLink,function(json){
	
	// get data from JSON into variables
	city=json.name;
	country=json.sys.country;
	tempC = (json.main.temp).toFixed(2);
	picLink=json.weather[0].icon;
	windSpeed=json.wind.speed;
	pressure=json.main.pressure;
	humidity=json.main.humidity;
	weather=json.weather[0].main;
	
	// initialize temp and calculation
	temp=tempC;
	tempF = (tempC*(9/5)+32).toFixed(2);

	// image selection
	switch (weather){
		case 'Drizzle':
		imageLink="http://icons.iconarchive.com/icons/icons8/ios7/72/Weather-Partly-Cloudy-Rain-icon.png";
		break;

		case 'Clouds':
		imageLink="http://icons.iconarchive.com/icons/iconsmind/outline/72/Clouds-icon.png";
		break;

		case 'Rain':
		imageLink="http://icons.iconarchive.com/icons/icons8/windows-8/72/Weather-Rain-icon.pngicons/large-weather/256/rain-icon.png";
		break;

		case 'Snow':
		imageLink="http://icons.iconarchive.com/icons/iconsmind/outline/72/Snow-2-icon.png";
		break;

		case 'Clear':
		imageLink="http://icons.iconarchive.com/icons/iconsmind/outline/72/Sun-icon.png";
		break;

		case 'Thunderstorm':
		imageLink="http://icons.iconarchive.com/icons/iconsmind/outline/72/Thunderstorm-icon.png";
		break; }

	// Webpage Display
	$windSpeed.html("Wind Speed (km/hr) <br>" + windSpeed);
	$pressure.html("Pressure(kpa) <br>" + pressure/10); 
	$humidity.html("Humidity (%) <br>"+humidity);
	$skyCondition.html(weather);
	$tempC.html(tempC+" C");
	$cityName.html("<h1>"+city+" "+country+"</h1>");
	$weatherIcon.html("<img src="+picLink+">")
	$tempChangeButton.html('C/F');
	$weatherImage.html("<img src="+imageLink+">");

});
}// end of getAPI function



$tempChangeButton.click(function(){
	if (temp==tempC) {
		temp=tempF;
		$tempC.html(tempF + " F");}
	else{
		temp=tempC;
		$tempC.html(tempC+" C");}

}); // Change button



}); // end of document





