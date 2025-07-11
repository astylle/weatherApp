import { grabLocationData } from "./fetchingAPI";
export function toggleSidebar() {
      document.getElementById('sidebar').classList.toggle('collapsed');
      console.log("test")
    }

export function updateSite(weather){
  const weatherObject = weather

  const dateDiv = document.createElement("h2")
    dateDiv.innerText = "It's currently" + weatherObject.date
    document.getElementById("header")

    const locationDiv = document.createElement("div")
    locationDiv.innerText = weatherObject.location
    document.getElementById("header").appendChild(locationDiv)
}

export function displayStoredLocations(){
    let cities = [];
    let storedArray = JSON.parse(localStorage.getItem("weatherData"))
    let favoriteCityList = document.getElementById("favCities")
    favoriteCityList.innerHTML = ""

    storedArray.forEach(city =>{
        cities.push(city.location)
    })
    let uniqueCities = [...new Set(cities)]
    uniqueCities.forEach(city=>{
        favoriteCities(city)
    })

}

function favoriteCities(city){
  let favoriteCityList = document.getElementById("favCities")
  let div = document.createElement("div")

  console.log(city + "Test")
  div.id = city 
  div.innerText = city
  div.addEventListener("click", ()=>{grabLocationData(city)})
  favoriteCityList.appendChild(div)
}

export function callAll(){
  displayStoredLocations()
  // toggleSidebar()
}
