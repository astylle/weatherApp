import { displayStoredLocations } from "./sidebar";
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
        console.log("Results: ", data)
        console.log("temp", data.currentConditions.feelslike)
        console.log("days", data.days[0].datetime)
        storeWeatherData(data.address ,data.currentConditions.temp, data.currentConditions.feelslike, data.days[0].datetime, data.days[0].description, data.currentConditions.sunrise, data.currentConditions.sunset)
        storeWeeklyData(data.days[0], data.days[1], data.days[2], data.days[3], data.days[4])
    } catch (error) {
        console.error("Fetch Error: ", error)
    }
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

}

function storeWeeklyData(day1, day2, day3, day4, day5){
    // console.log("we start collecting weekly data here")
    let weeklyWeather = [day1, day2, day3, day4, day5]
    displayWeeklyData(weeklyWeather)
}

function displayWeeklyData(weeklyWeather){
    let weeklyWeatherDiv = document.getElementById("weekGrid")

    weeklyWeather.forEach((days, index) => {
        ///  The weather data for the next 5 days are stored in the "days" variable
        // console.log(days)
        let dayWeatherMom = document.createElement("div")
        dayWeatherMom.id = "dayWeatherMom " + index
        // dayWeatherMom.classList.add("#weekGridDiv")
        let feelsLike = document.createElement("h5");
        feelsLike.innerText = `Feels like ${days.feelslike} on the ${days.datetime}`
        dayWeatherMom.appendChild(feelsLike)

        weeklyWeatherDiv.appendChild(dayWeatherMom)
    });
}


// function clearData(){
//     document.getElementById("tempDivID")
// }