const { getAllItems, addItem } = require('../controllers/items');

let insertStatement, updateStatement, deleteStatement, readStatement;

const Item = {
  type: 'object',
  properties: {
    itemname: { type: 'string' },
    class: { type: 'string' },
    price: { type: 'number' },
    quantity: { type: 'number' }
  }
}

const RetreiveInventory = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Item
      }
    }
  },
  handler: getAllItems
}

const PostItemOption = {
  schema: {
    body: {
      type: 'object',
      required: ['itemname', 'class', 'price', 'quantity'],
      properties: Item.properties
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
  handler: addItem
}

async function api(fastify, options) {

  fastify.get('/data/inventory', RetreiveInventory);
  fastify.post('/data/inventory', PostItemOption);
}

module.exports = api;