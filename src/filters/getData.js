const fetch = require('node-fetch')
const { redis } = require('../connectors')

module.exports = (handler) => {
  return async function (req, res) {
    const key = 'mars:data'
    let data = await redis.get(key)

    if (!data) {
      const results = await fetch(process.env.MARS_WEATHER_URL)
      data = await results.json()
      await redis.set(key, JSON.stringify(data))
      await redis.expire(key, 60)
    } else {
      data = JSON.parse(data)
    }

    res.data = data.report
    await handler(req, res)
  }
}
