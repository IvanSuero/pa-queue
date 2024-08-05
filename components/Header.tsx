import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa'
import getWeather from '../lib/GetWeather'
import { WiCloud, WiDayCloudy, WiDayRainMix, WiDaySleet, WiDaySnowThunderstorm, WiDaySunny, WiFog, WiHail, WiMoonWaxingCrescent5, WiNightAltCloudy, WiNightAltSnowThunderstorm, WiNightRainMix, WiNightShowers, WiRain, WiShowers, WiSnow, WiThunderstorm, WiWindy } from 'react-icons/wi'
import LangSelector from './Language'
import { getTranslator } from '@/lib/Translator'

interface IconMap {
  [key: string]: any
}

const iconMap: IconMap = {
  'clear-day': WiDaySunny,
  'clear-night': WiMoonWaxingCrescent5,
  'cloudy': WiCloud,
  'fog': WiFog,
  'hail': WiHail,
  'partly-cloudy-day': WiDayCloudy,
  'partly-cloudy-night': WiNightAltCloudy,
  'rain-snow-showers-day': WiDaySnowThunderstorm,
  'rain-snow-showers-night': WiNightAltSnowThunderstorm,
  'rain-snow': WiDayRainMix,
  'rain': WiRain,
  'showers-day': WiShowers,
  'showers-night': WiNightShowers,
  'sleet': WiDaySleet,
  'snow-showers-day': WiDayRainMix,
  'snow-showers-night': WiNightRainMix,
  'snow': WiSnow,
  'thunder-rain': WiThunderstorm,
  'thunder-showers-day': WiThunderstorm,
  'thunder-showers-night': WiThunderstorm,
  'thunder': WiThunderstorm,
  'wind': WiWindy,
}


export default async function Header() {
  const { t, locale } = await getTranslator('home')

  return (
    <header className="bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 text-white py-2 text-center w-full flex items-center justify-center">
      <div className="flex sm:flex-row flex-col justify-center items-center w-10/12">
        <div className='flex flex-row justify-start items-center w-full px-4'>
          <p className='sm:text-2xl text-lg font-bold text-nowrap'>{t('title')}</p>
        </div>
        <Weather />
        <div className="flex flex-row justify-end items-center gap-8 w-full">
          <div className='w-fit text-nowrap text-sm sm:text-sm'>
            <p className="text-white sm:block hidden">
              {t('madeBy')} <a href="https://github.com/IvanSuero" className='underline'>Ivan</a> | {t('poweredBy')}&nbsp;
              <a className='underline' href="https://queue-times.com/">Queue-Times.com</a>
            </p>
          </div>
          <LangSelector selected={locale} />
        </div>
      </div>
    </header>
  )
}

async function Weather() {
  const {temp, icon, tempmax, tempmin} = await getWeather()
  const WeatherIcon = iconMap[icon] || WiDaySunny

  return (
    <div className='flex flex-col w-fit items-center justify-center gap-2'>
      <div className='flex flex-row items-center justify-center gap-2'>
        <WeatherIcon size={32} />
        <div className="text-white text-xl font-bold">{temp}°C</div>
      </div>

      <div className="hidden sm:flex space-x-2 text-white text-sm gap-4">

        <div className="flex items-center">
          <FaLongArrowAltUp size={20} />
          <span className='text-base font-semibold'>{tempmax}°C</span>
        </div>

        <div className="flex items-center">
          <FaLongArrowAltDown size={20} />
          <span className='text-base font-semibold'>{tempmin}°C</span>
        </div>

      </div>
    </div>
  )
}