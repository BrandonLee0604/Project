import axios from "axios";

const locationApiKey = "a367be8a474ebc6af354d43e477142ed";
const hourlyForecast = "cf73e17fb7297e881d0aa33137e66196";

export const currentWeatherAPI = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/weather`,
    params: {appid: locationApiKey, units: 'metric'},
})

export const forecastWeatherAPI = axios.create({
    baseURL: `https://api.openweathermap.org/data/2.5/onecall`,
    params: {appid: hourlyForecast, units: 'metric'},
})
