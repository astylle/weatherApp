import { displayStoredLocations } from "./sidebar";
const key = "weatherData"
let storedArray = JSON.parse(localStorage.getItem(key)) || [];

function WeatherReport(location,temp,feelsLike,date,desc,sunrise,sunset){
    this.location = location
    this.temp = temp;
    this.feelsLike = feelsLike;
    this.date = date;
    this.desc = desc;
    this.sunrise = sunrise;
    this.sunset = sunset;
}

export function storeWeatherData(location, temp, feelsLike, date, desc,sunrise,sunset){
    //creates and stores in local storage
    let currentWeather = new WeatherReport(location, temp, feelsLike, date, desc, sunrise, sunset)
    storedArray.push(currentWeather)

    localStorage.setItem(key, JSON.stringify(storedArray))

    displayWeatherData(currentWeather)
    
    ///this is supposed to give me a list of unique cities
    displayStoredLocations()
}   

function displayWeatherData(weather){
    const weatherObject = weather
    console.log(weatherObject)
    
    document.getElementById("realTemp").innerText = "The temperature is:" + weatherObject.temp
    document.getElementById("feelsLike").innerText = "Feels like " + weatherObject.feelsLike
    document.getElementById("header").innerHTML = `Its currently ${weatherObject.temp} in ${weatherObject.location}`
}
