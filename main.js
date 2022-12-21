
const noteElement = document.querySelector(".notification")
const iconElement = document.querySelector(".weather-icon")
const tempvalElement = document.querySelector(".temperature-value p")
const descElement = document.querySelector(".temperature-description p")
const locElement = document.querySelector(".location p")


//Variables and units setting.
let weather= {};

weather.temperature= {
    unit: "celsius"
}

const Kelvin = 273;


//Api Key
const key= "07c995901569727a4f31069ecadb3155";



//We will check if the browser of the user supports the geolocation..

if('geolocation' in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else
{
    noteElement.style.display="block";
    noteElement.innerHTML= "<p>Browser does not support geolocation</p>";
}

// Now we will set the position of the User

function setPosition(position)
{
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather (latitude, longitude);
}


// Show error when there is no location, or the browser's location is blocked.

function showError(error)
{
    noteElement.style.display="block";
    noteElement.innerHTML= `<p>${error.message}</p>`;
}


// Now we wil make "geoWeather" Function to get the Weather updates from the API....


function getWeather(latitude, longitude)
{    
    //If the link doesn't start directly from our server then we can use here the proxy like.
    //let proxy=`https://cors-herokuapp.com/`;
    let api =  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${key}`;
    
    console.log(api);
    fetch(api)
        .then(function(response)
        {
            let data= response.json();
            return data;

        })
        .then(function(data)
        {
           
            weather.temperature.value= Math.floor(data.main.temp);
            weather.description= data.weather[0].description;
            weather.iconId=data.weather[0].icon;
            weather.city= data.name;
            weather.country=data.sys.country;

        })
        .then(function()
        {
         showWeather();
        })
}


function showWeather()
{
    iconElement.innerHTML=`<img src="icons/${weather.iconId}.svg"/>`;
    tempvalElement.innerHTML=`${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML= weather.description;
    locElement.innerHTML=`${weather.city}, ${weather.country}`;

}































