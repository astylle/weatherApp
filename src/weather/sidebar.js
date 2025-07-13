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
    console.log("list of cities" + cities)
    let storedArray = JSON.parse(localStorage.getItem("weatherData"))
    let favoriteCityList = document.getElementById("favCities")
    favoriteCityList.innerHTML = ""

    storedArray.forEach(city =>{
        cities.push(city.location)
    })
    let uniqueCities = [...new Set(cities)]
    uniqueCities.forEach(city=>{
        favoriteCities(city.split(",")[0].trim())
    })

}

function favoriteCities(city){
  let favoriteCityList = document.getElementById("favCities")
  let li = document.createElement("li")
  let span = document.createElement("span")
  span.classList.add("sidebar-text")
  span.id = city 
  console.log(city)


  span.innerText = city
  span.addEventListener("click", ()=>{grabLocationData(city)})
  li.appendChild(span)
  favoriteCityList.appendChild(li)
}

export function callAll(){
  displayStoredLocations()
  // toggleSidebar()
}
