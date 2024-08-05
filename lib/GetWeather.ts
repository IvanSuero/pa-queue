

export default async function getWeeather() {
  const res = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/41.0878286%2C%201.1572475/today?unitGroup=metric&include=current&key=${process.env.WEATHER_KEY}&contentType=json`)
  const data = await res.json()
  const {temp, icon} = data.currentConditions
  const {tempmin, tempmax} = data.days[0]
  
  return {temp: Math.round(temp), icon, tempmin: Math.round(tempmin), tempmax: Math.round(tempmax)}
}