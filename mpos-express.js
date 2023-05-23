const express = require('express')
const app = express()
const path = require('path')

const PORT = process.env.PORT || 8080

const os = require('os')
const networkInterfaces = os.networkInterfaces()

// enable express.js to parse json data
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// serve static front-end resources
app.use(express.static('gui'));

app.use('/data', require('./api-express/actions'))
app.use('/gui', require('./routes/gui-express'))

app.get('*', (req, res) => {
  res.redirect('/gui/menu')
});

app.listen(PORT, () => {
  console.log(`Express server started on port ${PORT}`)
})

if (typeof networkInterfaces.wlp2s0 !== 'undefined') {
  console.log(`\n(a) app-server-ip: ${networkInterfaces.wlp2s0[0].address}:${PORT}/gui/menu\n`)
} else if (typeof networkInterfaces.enp3s0f1 !== 'undefined') {
  console.log(`\n(b) app-server-ip: ${networkInterfaces.enp3s0f1[0].address}:${PORT}/gui/menu\n`)
} else if (typeof networkInterfaces['Wi-Fi'] !== 'undefined') {
  console.log(`\n(c) app-server-ip: ${networkInterfaces['Wi-Fi'][1].address}:${PORT}/gui/menu\n`)
} else if (typeof networkInterfaces.Ethernet !== 'undefined') {
  console.log(`\n(d) app-server-ip: ${networkInterfaces.Ethernet[1].address}:${PORT}/gui/menu\n`)
} else {
  console.log('\nno IP found for sharing over the network')
}
