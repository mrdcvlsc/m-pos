const Query = require('../database')
const Item = require('./Item')

const RetreiveInventory = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item
      }
    }
  },

  // get all items
  handler: function (request, reply) {
    try {
      const TableRows = { data: [] }
  
      for (const row of Query.readItems.iterate()) {
        TableRows.data.push({
          itemname: row.itemname,
          class: row.class,
          price: row.price,
          quantity: row.quantity
        })
      }
  
      reply.send(TableRows.data)
    } catch (err) {
      Query.ErrorHandler(err, 'items.js : 70 - getAllItems')
      reply.send([])
    }
  }
}

module.exports = RetreiveInventory;