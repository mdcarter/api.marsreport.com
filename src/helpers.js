function cos (deg) {
  return Math.cos(deg * Math.PI / 180)
}

function sin (deg) {
  return Math.sin(deg * Math.PI / 180)
}

function pad (int) {
  return (int < 10) ? ('0' + int) : int
}

function between (int, a, b) {
  return (int - a) * (int - b) <= 0
}

function season (solarLongitude, sol) {
  const seasons = ['Spring', 'Summer', 'Autumn', 'Winter']

  return {
    sol: sol,
    month: Math.ceil(solarLongitude / 360 * 12),
    season: seasons[Math.ceil(solarLongitude / 360 * 4) - 1],
    solarLongitude: +(Math.round((solarLongitude) + 'e+2') + 'e-2'),
    is_at_aphelion: between(solarLongitude, 60, 90),
    is_at_perihelion: between(solarLongitude, 240, 270)
  }
}

function readableTime (timestamp) {
  const remainder = timestamp % 3600
  const hours = pad(Math.floor(timestamp / 3600))
  const minutes = pad(Math.floor(remainder / 60))
  const seconds = pad(Math.round(remainder % 60))

  return {
    readable: `${hours}:${minutes}:${seconds}`,
    hour: parseInt(hours, 10),
    minute: parseInt(minutes, 10),
    second: parseInt(seconds, 10),
    stamp: Math.round(timestamp)
  }
}

function readableTimeTo (eventTime, currentTime) {
  let parsedDate = new Date(eventTime)
  parsedDate.setTime(parsedDate.getTime() + parsedDate.getTimezoneOffset() * 60 * 1000)
  parsedDate.setHours(parsedDate.getHours() - 5)

  const currentDate = new Date(2000, 0, 1, currentTime.hour, currentTime.minute)
  let eventDate = new Date(2000, 0, 1, parsedDate.getHours(), parsedDate.getMinutes())
  if (eventDate < currentDate) {
    eventDate.setDate(eventDate.getDate() + 1)
  }

  const secondsToEvent = (eventDate - currentDate) / 1000

  return {
    readable: `${pad(eventDate.getHours())}:${pad(eventDate.getMinutes())}:${pad(eventDate.getSeconds())}`,
    hour: eventDate.getHours(),
    minute: eventDate.getMinutes(),
    second: eventDate.getSeconds(),
    seconds_to_event: secondsToEvent,
    is_next: false,
    is_happening: (secondsToEvent <= 900 || secondsToEvent >= 85500)
  }
}

module.exports.sin = sin
module.exports.cos = cos
module.exports.pad = pad
module.exports.between = between
module.exports.season = season
module.exports.readableTime = readableTime
module.exports.readableTimeTo = readableTimeTo
