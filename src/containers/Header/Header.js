import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'

import axios from 'axios';

import weatherCodeParse from '../../helpers/weatherCodeParse'

import './Header.scss'

const Header = () => {
    const [searchText, setSearchText] = useState('');
    const [weatherInfo, setWeatherInfo] = useState({
        isFetched: false,
        name: '',
        weather: [],
        temp: {},
        error: null
    });

    const fetchWeatherInfo = () => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
              q: searchText,
              appid: 'dba5075b7d066e436af0750296333d19',
              units: 'metric'
            }
          })
          .then(function (response) {
            setWeatherInfo({ //hato bolgan shu yerda negaki fetWeatherinfo yozilgan
                isFetched: true,
                name: response.data.name,
                weather: response.data.weather,
                temp: response.data.main,
                error: false
            })
          })
          .catch(function (error) {
            setWeatherInfo({ //hato bolgan shu yerda negaki fetWeatherinfo yozilgan
                isFetched: true,
                name: '',
                weather: [],
                temp: {},
                error: error
            })
          })
          .then(function () {
            // always executed
          }); 
    }

    useEffect(() => {
        fetchWeatherInfo();
    }, [searchText])

    // console.log(searchText)

    return (
        <header className="header">
            <h1>
                <Link to="/">Weather</Link>
            </h1>

            <div className="search-input">
                <input
                    type="search"
                    placeholder='Find your sity'
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                { 
                    searchText.length > 0 ? (
                        <div className="search-result">
                            {
                                weatherInfo.isFetched ? (
                                        <div className="">
                                            {
                                                weatherInfo.weather.length > 0 ? (
                                                    <Link
                                                        className='weather-result-card'
                                                        to={`/city/${weatherInfo.name}`}
                                                    >
                                                        <h4>{weatherInfo.name}</h4>
                                                        <img
                                                            src={weatherCodeParse(weatherInfo.weather[0].id)}
                                                            className='weather-result-icon'
                                                            alt=""
                                                            />
                                                            <h2>{Math.round(weatherInfo.temp.temp)}° C</h2>
                                                    </Link>
                                                ) : (
                                                    <h3>City nod found</h3>
                                                )
                                            }
                                        </div>
                                ) : (
                                        <h1>Loading ...</h1>
                                ) 
                            }
                        </div>
                    ) : (
                        <h1></h1>
                    )
                }
            </div>
        </header>
    )
}

export default Header;