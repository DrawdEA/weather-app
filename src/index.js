import "./styles.css";
import { weatherVisuals } from "./weatherVisuals.js"

const location = document.querySelector("#location");
const searchForm = document.querySelector("#search-form");
const changeDisplay = document.querySelector("#change-display");

async function getWeather(place) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=metric&key=WPZ2YG7RFG8VZJYX3SX3C7ZXR&contentType=json`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    } catch(error) {
        console.error(error.message);
        throw error;
    }
    
    
}

// Listen for when the form is submitted
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(getWeather(location.value)
        .then(data => weatherVisuals.displayWeather(data))
        .catch(error => console.log(error)));
});

// Listen for when the user wants to change temperature
changeDisplay.addEventListener("click", () => {
    weatherVisuals.changeTemp();
});

// Initialize a place
getWeather("India")
        .then(data => weatherVisuals.displayWeather(data))
        .catch(error => console.log(error));