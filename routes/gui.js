async function routes (fastify, options) {
  fastify.get('/gui/inventory', (req, rep) => {
    rep.sendFile('html/inventory.html')
  })

  fastify.get('/gui/menu', (req, rep) => {
    rep.sendFile('html/menu.html')
  })

  fastify.get('/gui/transaction', (req, rep) => {
    rep.sendFile('html/transaction.html')
  })

  fastify.get('/gui/visual', (req, rep) => {
    rep.sendFile('html/visual.html')
  })
}

module.exports = routes
