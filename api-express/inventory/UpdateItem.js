const Query = require('../database')

function UpdateItem (request, reply) {
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

module.exports = UpdateItem;