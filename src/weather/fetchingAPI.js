///User input information 
let apiKey = "A7LTJY4SMSV4V2JNWLW8NXDXQ"
const key = "weatherData"
let storedArray = JSON.parse(localStorage.getItem(key)) || [];

export function locationSearch(e){
    e.preventDefault()
    let userInput = document.getElementById("location").value
    console.log(userInput)
    grabLocationData(userInput)
} 

// class WeatherReport{
//     constructor(

//     )
//     // fukill this in with information from the function below, but using objects inside objects, meaning that it would be *currentConditions and the *days[0] categories
// }

function WeatherReport(temp,feelsLike,date,desc,sunrise,sunset){
    this.temp = temp;
    this.feelsLike = feelsLike;
    this.date = date;
    this.desc = desc;
    this.sunrise = sunrise;
    this.sunset = sunset;
}

async function grabLocationData(query){
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}/next5days?unitGroup=metric&key=${apiKey}`)
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json() // puts the information in json
        console.log("Results: ", data)
        console.log("temp", data.currentConditions.feelslike)
        console.log("days", data.days[0].datetime)
        storeWeatherData(data.currentConditions.temp, data.currentConditions.feelsLike, data.days[0].datetime, data.days[0].description, data.currentConditions.sunrise, data.currentConditions.sunset)
    } catch (error) {
        console.error("Fetch Error: ", error)
    }
}

function storeWeatherData(temp, feelslike, date, desc,sunrise,sunset){
    //creates and stores in local storage
    let currentWeather = new WeatherReport(temp, feelslike, date, desc, sunrise, sunset)
    console.log(currentWeather)
    storedArray.push(currentWeather)
    console.log("the stored array is:" + storedArray)

    localStorage.setItem(key, JSON.stringify(storedArray))
    console.log("Local Storage" + localStorage)

}   
