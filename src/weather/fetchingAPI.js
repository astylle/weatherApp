import { displayStoredLocations } from "./sidebar";
import { storeWeeklyData } from "./weeklyData";
///User input information 
let apiKey = "A7LTJY4SMSV4V2JNWLW8NXDXQ"
const key = "weatherData"
let storedArray = JSON.parse(localStorage.getItem(key)) || [];
let localWeatherData = document.getElementById("clearLocal")



//clears local storage
export function clearLS() {
    localWeatherData.addEventListener("click", ()=>{
        localStorage.clear()
        storedArray = []
        let favoriteCityList = document.getElementById("favCities")
        favoriteCityList.innerHTML = ""
    })
}

export function locationSearch(e){
    e.preventDefault()
    let userInput = document.getElementById("location").value
    console.log(userInput)
    grabLocationData(userInput)
} 

function WeatherReport(location,temp,feelsLike,date,desc,sunrise,sunset){
    this.location = location
    this.temp = temp;
    this.feelsLike = feelsLike;
    this.date = date;
    this.desc = desc;
    this.sunrise = sunrise;
    this.sunset = sunset;
}

export async function grabLocationData(query){
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}/next5days?unitGroup=metric&key=${apiKey}`)
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json() // puts the information in json
        console.log(data)
        storeWeatherData(data.resolvedAddress ,data.currentConditions.temp, data.currentConditions.feelslike, data.days[0].datetime, data.days[0].description, data.currentConditions.sunrise, data.currentConditions.sunset)
        storeWeeklyData(data.days[0], data.days[1], data.days[2], data.days[3], data.days[4])
    } catch (error) {
        console.error("Fetch Error: ", error)
    }
}

function searchSanitization(query){
    let unsantizedQuery = query

}

function storeWeatherData(location, temp, feelsLike, date, desc,sunrise,sunset){
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

