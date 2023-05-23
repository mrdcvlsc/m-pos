const Query = require('../database')
const TransactionItem = require('./TransactionItem')

const RecordTransaction = {
  schema: {
    body: {
      type: 'array',
      items: TransactionItem
    },
    response: {
      201: {
        type: 'object',
        properties: {
          changes: { type: 'number' }
        }
      }
    }
  },

  handler: function (request, reply) {
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
  
      reply.code(201).send({ changes: TotalChanges })
    } catch (err) {
      Query.ErrorHandler(err, 'items.js : 191 - recordTransactionInfo')
      reply.code(201).send({ changes: 0 })
    }
  }
}

module.exports = RecordTransaction;