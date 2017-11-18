const { config } = require('dotenv')
const { router, get } = require('microrouter')

config({ path: '.env' })

const routes = require('./routes')

module.exports = router(
  get('/', routes.getRoutes),
  get('/curiosity', routes.getCuriosity),
  get('/opportunity', routes.getOpportunity)
)
