const { send } = require('micro')

module.exports = (req, res) => {
  const routes = {
    curiosity: `https://${req.headers.host}/curiosity`,
    opportunity: `https://${req.headers.host}/opportunity`
  }
  send(res, 200, routes)
}
