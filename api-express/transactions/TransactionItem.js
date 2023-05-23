const TransactionItem = {
  type: 'object',
  properties: {
    buydate: { type: 'string' },
    itemname: { type: 'string' },
    class: { type: 'string' },
    price: { type: 'number' },
    quantity: { type: 'number' }
  }
}

module.exports = TransactionItem;