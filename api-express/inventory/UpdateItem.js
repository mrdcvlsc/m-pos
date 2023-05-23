const Query = require('../database')
const Item = require('./Item')

const UpdateItem = {
  schema: {
    body: {
      type: 'object',
      required: ['itemname', 'class', 'price', 'quantity'],
      properties: Item.properties
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
  
  // update item
  handler: function (request, reply) {
    try {
      let { itemname } = request.params
      const newValues = request.body
      itemname = itemname.replaceAll('&+', ' ')
  
      const result = Query.editItem.run(
        newValues.itemname,
        newValues.class,
        newValues.price,
        newValues.quantity,
        itemname
      )
  
      reply.send({ changes: result.changes })
    } catch (err) {
      Query.ErrorHandler(err, 'items.js : 128 - updateItem')
      reply.send({ changes: 0 })
    }
  }
}

module.exports = UpdateItem;