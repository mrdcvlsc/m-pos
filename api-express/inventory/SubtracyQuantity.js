const Query = require('../database')

function SubtractQuantity (request, reply) {
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

module.exports = SubtractQuantity;