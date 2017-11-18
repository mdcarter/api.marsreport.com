const { send } = require('micro')
const { solarLongitude, marsSolDate } = require('../calendar')
const { season, readableTime } = require('../helpers')

module.exports = (req, res) => {
  const solDate = marsSolDate - 46235 - 0.042431
  const sol = Math.floor(solDate)
  const missionTime = (24 * solDate) % 24 * 3600

  const opportunity = {
    time: readableTime(missionTime),
    year: season(solarLongitude, sol)
  }

  send(res, opportunity ? 200 : 404, opportunity)
}
