const Query = require('../database')

const SubtractQuantity = {
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

  // sub quantity
  handler: function (request, reply) {
    try {
      let { itemname } = request.params
      const Subtracted = request.body
      itemname = itemname.replaceAll('&+', ' ')
  
      const result = Query.subQty.run(
        Subtracted.quantity,
        itemname
      )
  
      reply.send({ changes: result.changes })
    } catch (err) {
      Query.ErrorHandler(err, 'items.js : 171 - subQuantity')
      reply.send({ changes: 0 })
    }
  }
}

module.exports = SubtractQuantity;