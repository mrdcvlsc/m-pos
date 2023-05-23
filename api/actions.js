async function routes (fastify, options) {
  fastify.get('/data/inventory', require('./inventory/RetrieveInventory'))
  fastify.post('/data/inventory', require('./inventory/AddItem'))
  fastify.delete('/data/inventory/:itemname', require('./inventory/DeleteItem'))
  fastify.put('/data/inventory/:itemname', require('./inventory/UpdateItem'))

  fastify.put('/data/inventory/add-qty/:itemname', require('./inventory/AddQuantity'))
  fastify.put('/data/inventory/sub-qty/:itemname', require('./inventory/SubtracyQuantity'))

  fastify.post('/data/transactions/:savedate', require('./transactions/RecordTransaction'))
  fastify.get('/data/transactions/:startdate/:enddate', require('./transactions/GetTransaction'))
}

module.exports = routes
