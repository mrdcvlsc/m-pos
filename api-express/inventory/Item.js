const Item = {
  type: 'object',
  properties: {
    itemname: { type: 'string' },
    class: { type: 'string' },
    price: { type: 'number' },
    quantity: { type: 'number' }
  }
}

module.exports = Item;