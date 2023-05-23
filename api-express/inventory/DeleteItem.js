const Query = require('../database')

function DeleteItem (request, reply) {
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

module.exports = DeleteItem;