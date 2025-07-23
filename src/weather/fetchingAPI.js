import { storeWeeklyData } from "./weeklyData";
import { storeWeatherData } from "./dailyData";
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
    
    if(unsantizedQuery){

    }

}


