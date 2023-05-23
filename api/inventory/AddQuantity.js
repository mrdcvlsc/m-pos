const Query = require('../database')

const AddQuantity = {
  schema: {
    body: {
      type: 'object',
      required: ['quantity'],
      properties: {
        quantity: { type: 'number' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          changes: { type: 'number' }
        }
      }
    }
  },

  // add quantity
  handler: function (request, reply) {
    try {
      let { itemname } = request.params
      const Added = request.body
      itemname = itemname.replaceAll('&+', ' ')
  
      const result = Query.addQty.run(
        Added.quantity,
        itemname
      )
  
      reply.send({ changes: result.changes })
    } catch (err) {
      Query.ErrorHandler(err, 'items.js : 151 - addQuantity')
      reply.send({ changes: 0 })
    }
  }
}

module.exports = AddQuantity;