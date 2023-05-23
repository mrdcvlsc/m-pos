const Query = require('../database')

const DeleteItem = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          changes: { type: 'number' }
        }
      }
    }
  },

  // delete item
  handler: function (request, reply) {
    try {
      let { itemname } = request.params
      itemname = itemname.replaceAll('&+', ' ')
  
      const result = Query.deleteItem.run(itemname)
      reply.send({ changes: result.changes })
    } catch (err) {
      Query.ErrorHandler(err, 'items.js : 112 - deleteItem')
      reply.send({ changes: 0 })
    }
  }
}

module.exports = DeleteItem;