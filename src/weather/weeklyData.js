export function storeWeeklyData(day1, day2, day3, day4, day5) {
  // console.log("we start collecting weekly data here")
  let weeklyWeather = [day1, day2, day3, day4, day5];
  displayWeeklyData(weeklyWeather);
}

function displayWeeklyData(weeklyWeather) {
  let weeklyWeatherDiv = document.getElementById("weekGrid");
  weeklyWeatherDiv.innerHTML = "";

  weeklyWeather.forEach((days, index) => {
    ///  The weather data for the next 5 days are stored in the "days" variable
    let dayWeatherMom = document.createElement("div");
    dayWeatherMom.id = "dayWeatherMom " + index;
    // dayWeatherMom.classList.add("#weekGridDiv")
    let feelsLike = document.createElement("h5");
    feelsLike.innerText = `Feels like ${days.feelslike} on the ${days.datetime}`;
    dayWeatherMom.appendChild(feelsLike);
    weeklyWeatherDiv.appendChild(dayWeatherMom);
  });
}
