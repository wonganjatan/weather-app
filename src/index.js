const form = document.getElementById("weather-form")
const resultDiv = document.getElementById("weather-result")

form.addEventListener("submit", () => {
    const city = document.getElementById("location").value

    console.log(city)
})