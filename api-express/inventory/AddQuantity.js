const Query = require('../database')

function AddQuantity (request, reply) {
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

module.exports = AddQuantity;