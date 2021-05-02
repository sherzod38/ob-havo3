import { useState, useEffect } from 'react';
import axios from 'axios';

import CitySwitcher from '../containers/CitySwitcher'

import weatherCodeParse from '../helpers/weatherCodeParse'

const HomepPage = () => {

    const [activeCity, setActiveCity ] = useState('tashkent');
    const [activeWeather, setActivWeather ] = useState({
        isFetched: false,
        data: {},
        error: null
    });

    const fetchWeatherInfo = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              q: activeCity,
              appid: 'dba5075b7d066e436af0750296333d19',
              units: 'metric'
            }
          })
          .then(function (response) {
            setActivWeather({
                isFetched: true,
                data: response.data,
                error: false
            })
          })
          .catch(function (error) {
            setActivWeather({
                isFetched: true,
                data: {},
                error: error
            })
          })
          .then(function () {
            // always executed
          }); 
    }
    console.log(activeWeather.data)
    useEffect(() => {
        fetchWeatherInfo();
    }, [activeCity])    

    return (
        <div className="">
            <CitySwitcher setActiveCity={setActiveCity} activeCity={activeCity}/>     
            <div className="">
                {
                    activeWeather.isFetched ? (
                        <div className="main-weather">
                            <h1>{activeWeather.data.name}</h1>
                            <h1>{Math.round(activeWeather.data.main.temp)}º C</h1>
                            <img className='weather-icon' src={weatherCodeParse(activeWeather.data.weather[0].id)}/>
                            <div>
                                {
                                    activeWeather.data.weather.map((weather) => (
                                        <h1>It's <span className='weather-status'> {weather.main}</span> now in <span className="weather-city">{activeWeather.data.name}</span></h1>
                                    ))
                                }
                            </div>

                        </div>
                    ) : (
                        <h1>Loading ...</h1>
                    )
                }
            </div>
        </div>
    )
}

export default HomepPage;