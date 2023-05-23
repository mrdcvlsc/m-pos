const Query = require('../database')

function AddItem (request, reply) {
  try {
    const item = request.body

    const result = Query.addItem.run(
      item.itemname,
      item.class,
      item.price,
      item.quantity
    )

    reply.status(201).send({ changes: result.changes })
  } catch (err) {
    Query.ErrorHandler(err, 'items.js : 92 - addItem')
    reply.status(201).send({ changes: 0 })
  }
}

module.exports = AddItem;