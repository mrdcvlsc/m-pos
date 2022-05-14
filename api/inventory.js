const {
  getAllItems,  addItem,  deleteItem,   updateItem,
  addQuantity,  subQuantity,  recordTransactionInfo,
  getTransactionBetween
} = require('../controllers/database');

const Item = {
  type: 'object',
  properties: {
    itemname: { type: 'string' },
    class: { type: 'string' },
    price: { type: 'number' },
    quantity: { type: 'number' }
  }
}

const TransactItem = {
  type: 'object',
  properties: {
    buydate: { type: 'string' },
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

const DeleteItemOption = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          changes: { type: 'number' }
        }
      }
    }
  },
  handler: deleteItem
}

const UpdateItemOption = {
  schema: {
    body: {
      type: 'object',
      required: ['itemname', 'class', 'price', 'quantity'],
      properties: Item.properties
    },
    response: {
      200: {
        type: 'object',
        properties: {
          changes: { type: 'number' }
        }
      }
    }
  },
  handler: updateItem
}

const AddQtyOption = {
  schema: {
    body: {
      type: 'object',
      required: ['quantity'],
      properties: {
        quantity: { type: 'number' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          changes: { type: 'number' }
        }
      }
    }
  },
  handler: addQuantity
}

const SubQtyOption = {
  schema: {
    body: {
      type: 'object',
      required: ['quantity'],
      properties: {
        quantity: { type: 'number' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          changes: { type: 'number' }
        }
      }
    }
  },
  handler: subQuantity
}

const RecordTransactionOption = {
  schema: {
    body: {
      type: 'array',
      items: TransactItem
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
  handler: recordTransactionInfo
}

const GetTransactionOption = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: TransactItem
      }
    }
  },
  handler: getTransactionBetween
}

async function api(fastify, options) {
  fastify.get('/data/inventory', RetreiveInventory);
  fastify.post('/data/inventory', PostItemOption);
  fastify.delete('/data/inventory/:itemname', DeleteItemOption);
  fastify.put('/data/inventory/:itemname', UpdateItemOption);
  
  fastify.put('/data/inventory/add-qty/:itemname',AddQtyOption);
  fastify.put('/data/inventory/sub-qty/:itemname',SubQtyOption);

  fastify.post('/data/transactions/:savedate', RecordTransactionOption);
  fastify.get ('/data/transactions/:startdate/:enddate', GetTransactionOption);
}

module.exports = api;