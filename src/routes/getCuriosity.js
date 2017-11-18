const { send } = require('micro')
const { getData } = require('../filters')
const { solarLongitude, marsSolDate } = require('../calendar')
const { season, readableTime, readableTimeTo } = require('../helpers')

module.exports = getData(async (req, res) => {
  const curiosityLambda = 360 - 137.4
  const sol = Math.floor(marsSolDate - curiosityLambda / 360) - 49268
  let missionTime = (24 * marsSolDate) % 24 - curiosityLambda * 24 / 360
  if (missionTime < 0) {
    missionTime += 24
  } else if (missionTime >= 24) {
    missionTime -= 24
  }

  const time = readableTime(missionTime * 3600)

  let curiosity = {
    time: time,
    year: season(solarLongitude, sol),
    sunrise: readableTimeTo(res.data.sunrise, time),
    sunset: readableTimeTo(res.data.sunset, time),
    temperatures: {
      min: res.data.min_temp,
      max: res.data.max_temp,
      min_fahrenheit: Math.round((res.data.min_temp * 1.8) + 32),
      max_fahrenheit: Math.round((res.data.max_temp * 1.8) + 32)
    },
    pressure: {
      pascal: res.data.pressure,
      trend: res.data.pressure_string
    },
    weather: res.data.atmo_opacity
  }

  if (curiosity.sunrise.seconds_to_event < curiosity.sunset.seconds_to_event) {
    curiosity.sunrise.is_next = true
  } else {
    curiosity.sunset.is_next = true
  }

  send(res, curiosity ? 200 : 404, curiosity)
})
