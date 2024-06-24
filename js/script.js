const searchLocation = document.getElementById('searchLocation')

// Get User Current Position
navigator.geolocation.getCurrentPosition(function (pos) {
    const lat = pos.coords.latitude
    const long = pos.coords.longitude
    weatherData(`${lat}, ${long}`)
})

// Get data from API
async function weatherData(city) {
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${city}&days=3&key=f47a07e014ae49ada4a154129242406`)
    let data = await res.json()
    console.table(data);
    displayTodayWeather(data)
    displayTommorowWeather(data)
    displayAfterTommorowWeather(data)
}

// Search for Input Location
searchLocation.addEventListener('input', function (e) {
    weatherData(e.target.value)
})

// Display Today Weather
function displayTodayWeather(data) {
    console.log(data);
    // Display Date
    let todayDate = data.current.last_updated
    let date = new Date(todayDate);
    weekDayToday.innerHTML = date.toLocaleString('en-us', { weekday: 'long' })
    dateToday.innerHTML = `${date.getDate()}  ${date.toLocaleString('en-us', { month: 'long' })}`
    // Location Name
    cityToday.innerHTML = data.location.name
    // Location Temperature
    tempToday.innerHTML = data.current.temp_c + "<sup>o</sup>C"
    // Location Condition
    todayCond.innerHTML = data.current.condition.text
    // Location Humidity
    humidityToday.innerHTML = data.current.humidity + "%"
    // Location Wind Speed
    windSpeedToday.innerHTML = data.current.wind_kph + "Km/hr"
    // Location Wind Direction
    dirToday.innerHTML = data.current.wind_dir
    // Condition Image
    imgToday.setAttribute('src', data.current.condition.icon)
}

// Display Tommorow Weather
function displayTommorowWeather(data) {
    // Display Date
    let tommorowDate = data.forecast.forecastday[1].date
    let tomDate = new Date(tommorowDate);
    tommorowDay.innerHTML = tomDate.toLocaleString(`en-us` , {weekday:'long'})

    // Condition Image
    iconTommorow.setAttribute('src' , data.forecast.forecastday[1].day.condition.icon)

    // Location Max Temperature
    tommorowMaxTemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c + "<sup>o</sup>C"

    // Location Min Temperature
    tommorowMinTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c + "<sup>o</sup>C"

    // Location Condition
    tommorowCond.innerHTML = data.forecast.forecastday[1].day.condition.text
}


// Display After Tommorow Weather
function displayAfterTommorowWeather(data) {
    // Display Date
    let afterTommorowDate = data.forecast.forecastday[2].date
    let afterTomDate = new Date(afterTommorowDate);
    afterTommorow.innerHTML = afterTomDate.toLocaleString(`en-us` , {weekday:'long'})

    // Condition Image
    iconAfterTommorow.setAttribute('src' , data.forecast.forecastday[2].day.condition.icon)

    // Location Max Temperature
    afterTommorowMaxTemp.innerHTML = data.forecast.forecastday[2].day.maxtemp_c + "<sup>o</sup>C"

    // Location Min Temperature
    afterTommorowMinTemp.innerHTML = data.forecast.forecastday[2].day.mintemp_c + "<sup>o</sup>C"

    // Location Condition
    afterTommorowCond.innerHTML = data.forecast.forecastday[2].day.condition.text
}


