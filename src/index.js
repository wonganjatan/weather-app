async function getCoordinates(city) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`

    const response = await fetch(url)
    const data = await response.json()

    if (!data.results || data.results.length === 0) {
        throw new Error("City not found")
    }

    const loc = data.results[0]

    return {
        lat: loc.latitude,
        lon: loc.longitude,
        name: loc.name,
        country: loc.country,
    }
}

async function getWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&timezone=auto`

    const response = await fetch(url)
    const data = await response.json()

    return data
}

function updateUI(weather, coords, container) {
    const temp = weather.current.temperature_2m
    const wind = weather.current.wind_speed_10m

    container.innerHTML = `
        <h2>${coords.name}, ${coords.country}</h2>
        <p>Temperature: <strong>${temp}C</strong></p>
        <p>Wind: ${wind} km/h</p>
    `
}

const app = () => {

    const form = document.getElementById("weather-form")
    const resultDiv = document.getElementById("weather-result")

    form.addEventListener("submit", async (e) => {
        e.preventDefault()

        const city = document.getElementById("location").value
        if (!city) return

        resultDiv.textContent = "Loading..."

        try {
            const coords = await getCoordinates(city);
            const weather = await getWeather(coords.lat, coords.lon)
            updateUI(weather, coords, resultDiv)
        } catch (error) {
            resultDiv.textContent = "Error"
        }
    })
}

app()