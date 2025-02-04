
import { format, parseISO, setHours, setMinutes, setSeconds } from "date-fns";

const weatherVisuals = (() => {
    let isFarenheit = false;
    let mainCelcius;
    let feelsLikeCelcius;
    let forecastCelcius = [];

    const city = document.querySelector("#city");
    const temperature = document.querySelector("#temperature");
    const weatherStatus = document.querySelector("#weather-status");
    const time = document.querySelector("#time");
    const forecastIcon = document.querySelector("#forecast-icon");

    const forecastCollection = document.querySelector("#seven-day-forecast").children;

    const feelsLikeTemp = document.querySelector("#feels-like-temp");
    const sunriseData = document.querySelector("#sunrise-data");
    const windData = document.querySelector("#wind-data");
    const gustsData = document.querySelector("#gusts-data");
    const directionData = document.querySelector("#direction-data");

    const images = require.context('./icons', false, /\.svg$/);

    function toFahrenheit(num) {
        return Math.round((num * 1.8 + 32) * 10) / 10 + "°F";
    }

    function updateTemp() {
        temperature.textContent = isFarenheit ? toFahrenheit(Number(temperature.textContent.replace("°C", ""))) : mainCelcius + "°C";
        feelsLikeTemp.textContent = isFarenheit ? toFahrenheit(Number(feelsLikeTemp.textContent.replace("°C", ""))) : feelsLikeCelcius + "°C";
        for (let i = 0; i < 7; i++) {
            forecastCollection[i].querySelector(".forecast-temp").textContent = isFarenheit ? toFahrenheit(Number(forecastCollection[i].querySelector(".forecast-temp").textContent.replace("°C", ""))) : forecastCelcius[i] + "°C";
        }
    }

    function displayWeather(data) {
        // Set data for header info
        city.textContent = data.resolvedAddress;
        mainCelcius = Number(data.currentConditions.temp)
        temperature.textContent = mainCelcius + "°C";
        weatherStatus.textContent = data.currentConditions.conditions;
        const mainImg = images(`./${data.currentConditions.icon}.svg`);
        forecastIcon.src = mainImg;

        const timeString = data.currentConditions.datetime;
        const [hours, minutes, seconds] = timeString.split(":").map(Number);
        let date = new Date();
        date = setHours(date, hours);
        date = setMinutes(date, minutes);
        date = setSeconds(date, seconds);
        time.textContent = format(date, "h:mm a");

        // Set data for the seven day forecast
        for (let i = 0; i < 7; i++) {
            forecastCollection[i].querySelector(".forecast-data").textContent = format(parseISO(data.days[i].datetime), "E");
            
            const img = images(`./${data.days[i].icon}.svg`);
            forecastCollection[i].querySelector(".forecast-logo").src = img;
            forecastCelcius[i] = Number(data.days[i].temp);
            forecastCollection[i].querySelector(".forecast-temp").textContent = forecastCelcius[i]  + "°C";
        }

        // Set data for other misc info
        feelsLikeCelcius = Number(data.currentConditions.feelslike);
        feelsLikeTemp.textContent = feelsLikeCelcius + "°C";

        const sunriseDateString = data.currentConditions.sunrise;
        const [sunriseHours, sunriseMinutes, sunriseSeconds] = sunriseDateString.split(":").map(Number);
        let sunriseDate = new Date();
        sunriseDate = setHours(sunriseDate, sunriseHours);
        sunriseDate = setMinutes(sunriseDate, sunriseMinutes);
        sunriseDate = setSeconds(sunriseDate, sunriseSeconds);
        sunriseData.textContent = format(sunriseDate, "h:mm a");

        gustsData.textContent = "Gusts: " + (data.currentConditions.windgust === null ? 0 : data.currentConditions.windgust) + " km/h";
        windData.textContent = "Wind: " + data.currentConditions.windspeed + " km/h";
        directionData.textContent = "Direction: " + data.currentConditions.winddir + " ESE";

        // Update temperature in case that it is set in Fahrenheit
        updateTemp();
    }

    

    function changeTemp() {
        isFarenheit = !isFarenheit;
        updateTemp();
    }

    return { displayWeather, changeTemp };
})();

export { weatherVisuals };