const Query = require('../database')
const Item = require('./Item')

const AddItem = {
  schema: {
    body: {
      type: 'object',
      required: ['itemname', 'class', 'price', 'quantity'],
      properties: Item.properties
    },
    response: {
      201: {
        type: 'object',
        properties: {
          changes: { type: 'number' }
        }
      }
    }
  },

  // add item
  handler: function (request, reply) {
    try {
      const item = request.body
  
      const result = Query.addItem.run(
        item.itemname,
        item.class,
        item.price,
        item.quantity
      )
  
      reply.code(201).send({ changes: result.changes })
    } catch (err) {
      Query.ErrorHandler(err, 'items.js : 92 - addItem')
      reply.code(201).send({ changes: 0 })
    }
  }
}

module.exports = AddItem;