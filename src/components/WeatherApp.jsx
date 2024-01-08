import { useState } from 'react'
import {
  clear_icon,
  cloud_icon,
  drizzle_icon,
  humidity_icon,
  rain_icon,
  search_icon,
  snow_icon,
  wind_icon
} from './index'

import '../styles/weather.css'

const WeatcherApp = () => {
  const [inputValue, setInputValue] = useState('')
  const [wicon, setWicon] = useState(cloud_icon)

  let api_key = '8d26859ea1a0e53f42a28cb5b5b35cd3'

  const search = async () => {
    const element = document.getElementsByClassName('cityInput')
    if (element[0].value === '') {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`
    const response = await fetch(url);
    const data = await response.json();

    const humidity = document.getElementsByClassName('humidity-percentage')
    const wind = document.getElementsByClassName('wind-speed')
    const weather = document.getElementsByClassName('weather-temp')
    const location = document.getElementsByClassName('weather-location')

    humidity[0].innerHTML = data.main.humidity + '%'
    wind[0].innerHTML = Math.floor(data.wind.speed) + ' km/h'
    weather[0].innerHTML = Math.round(data.main.temp) + '°C'
    location[0].innerHTML = data.name

    if (data.weather[0].main === 'Clouds') {
      setWicon(cloud_icon)
    } else if (data.weather[0].main === 'Clear') {
      setWicon(clear_icon)
    } else if (data.weather[0].main === 'Rain') {
      setWicon(rain_icon)
    } else if (data.weather[0].main === 'Snow') {
      setWicon(snow_icon)
    } else if (data.weather[0].main === 'Drizzle') {
      setWicon(drizzle_icon)
    }
     
  }
  return (
    <div className='container'>
      <div className="top">
        <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} type="text" className='cityInput' placeholder='Enter your city' />
        <div className="search-icon" onClick={()=> search()}>
          <img src={search_icon} alt="search icon" />
        </div>
      </div>
      <div className="weather-icon">
        <img src={wicon} alt="cloud_icon" />
      </div>
      <div className="weather-temp">24</div>
      <div className="weather-location">Varanasi</div>

      <div className="data-container"> 
        <div className="element">
          <img src={humidity_icon} alt="" />
          <div className="data">
            <div className="humidity-percentage">78%</div>
            <div className="text">Humidity</div>
          </div>
        </div>

        <div className="element">
          <img src={wind_icon} alt="" />
          <div className="data">
            <div className="wind-speed">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default WeatcherApp