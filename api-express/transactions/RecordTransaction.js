const Query = require('../database')

function RecordTransaction (request, reply) {
  try {
    const { savedate } = request.params
    const data = request.body
    let TotalChanges = 0

    for (let i = 0; i < data.length; ++i) {
      TotalChanges += Query.saveTransactions.run(
        savedate,
        data[i].itemname,
        data[i].class,
        data[i].price,
        data[i].quantity
      ).changes
    }

    reply.status(201).send({ changes: TotalChanges })
  } catch (err) {
    Query.ErrorHandler(err, 'items.js : 191 - recordTransactionInfo')
    reply.status(201).send({ changes: 0 })
  }
}

module.exports = RecordTransaction;