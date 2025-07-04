///User input information 
let myKey = "A7LTJY4SMSV4V2JNWLW8NXDXQ"

export function locationSearch(e){
    e.preventDefault()
    let userInput = document.getElementById("location").value
    console.log(userInput)
    grabLocationData(userInput)
} 

// function WeatherReport(temp,date,)

async function grabLocationData(query){
    try{
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}/next5days?unitGroup=metric&key=${myKey}`)
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json() // puts the information in json
        console.log("Results: ", data)
    } catch (error) {
        console.error("Fetch Error: ", error)
    }
}

