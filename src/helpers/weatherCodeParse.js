import clear from '../assets/images/icons/sunrise.svg'
import drizzle from '../assets/images/icons/drizzle.svg'
import rain from '../assets/images/icons/rain.svg'
import snow from '../assets/images/icons/snow.svg'
import thunder from '../assets/images/icons/thunder.svg'
import tornado from '../assets/images/icons/tornado.svg'
import clouds from '../assets/images/icons/stratuscumulus.svg'
import defaultIcon from '../assets/images/icons/weathercock.svg'


const weatherCodeParse = (weatherCode) => {
    switch(true) {
        case 200 <= weatherCode && weatherCode <= 232:
            return thunder;
        case 300 <= weatherCode && weatherCode <= 321:
            return drizzle;
        case 500 <= weatherCode && weatherCode <= 531:
            return rain;
        case 600 <= weatherCode && weatherCode <= 622:
            return snow;
        case 701 <= weatherCode && weatherCode <= 781:
            return tornado;
        case weatherCode === 800 :
            return clear;
        case 801 <= weatherCode && weatherCode <= 804:
            return clouds;
        default:
            return defaultIcon;
    }
}

export default weatherCodeParse;