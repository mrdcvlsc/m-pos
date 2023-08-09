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

  fastify.get('/gui/test', (req, rep) => {
    rep.sendFile('dashboard/index.html')
  })

  fastify.get('/gui/chess', (req, rep) => {
    rep.sendFile('chessboard/index.html')
  })
}

module.exports = routes
