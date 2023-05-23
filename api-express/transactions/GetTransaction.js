const Query = require('../database')

function GetTransaction (request, reply) {
  try {
    const date = request.params
    const tableRows = { data: [] }

    for (const row of Query.getTransactions.iterate(date.startdate, date.enddate)) {
      tableRows.data.push({
        buydate: row.buydate,
        itemname: row.itemname,
        class: row.class,
        price: row.price,
        quantity: row.quantity
      })
    }

    reply.send(tableRows.data)
  } catch (err) {
    Query.ErrorHandler(err, 'items.js : 216 - getTransactions')
    reply.send([])
  }
}

module.exports = GetTransaction;