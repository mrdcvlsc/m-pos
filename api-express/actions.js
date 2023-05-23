const express = require('express')
const routes = express.Router()

routes.get('/inventory', require('./inventory/RetrieveInventory'))
routes.post('/inventory', require('./inventory/AddItem'))
routes.delete('/inventory/:itemname', require('./inventory/DeleteItem'))
routes.put('/inventory/:itemname', require('./inventory/UpdateItem'))

routes.put('/inventory/add-qty/:itemname', require('./inventory/AddQuantity'))
routes.put('/inventory/sub-qty/:itemname', require('./inventory/SubtracyQuantity'))

routes.post('/transactions/:savedate', require('./transactions/RecordTransaction'))
routes.get('/transactions/:startdate/:enddate', require('./transactions/GetTransaction'))

module.exports = routes
