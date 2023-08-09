const express = require('express')
const routes = express.Router()

routes.get('/inventory', (req, rep) => {
  rep.sendFile('html/inventory.html', { root: './gui' })
})

routes.get('/menu', (req, rep) => {
  rep.sendFile('html/menu.html', { root: './gui' })
})

routes.get('/transaction', (req, rep) => {
  rep.sendFile('html/transaction.html', { root: './gui' })
})

routes.get('/visual', (req, rep) => {
  rep.sendFile('html/visual.html', { root: './gui' })
})

routes.get('/stats', (req, rep) => {
  rep.sendFile('dashboard/index.html', { root: './gui' })
})

routes.get('/chess', (req, rep) => {
  rep.sendFile('chessboard/index.html', { root: './gui' })
})

module.exports = routes;