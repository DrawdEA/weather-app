import "./styles.css";

const location = document.querySelector("#location");
const searchForm = document.querySelector("#search-form");

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

function displayWeather(data) {

}

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(getWeather(location.value)
        .then(value => console.log(value.description))
        .catch(error => console.log(error)));
});