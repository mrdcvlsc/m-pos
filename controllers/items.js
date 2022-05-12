const db = require('better-sqlite3')('./data/database.db');
const { InventoryDB, ErrorHandler } = require('./database');

try {
  InventoryDB.initialize(db,'inventory');
  InventoryDB.init_transactions(db,'transactions');
  var insertStatement = db.prepare(InventoryDB.StmTemp.INSERT);
  var updateStatement = db.prepare(InventoryDB.StmTemp.UPDATE);
  var deleteStatement = db.prepare(InventoryDB.StmTemp.DELETE);
  var readStatement   = db.prepare(InventoryDB.StmTemp.READ);
  var addQtyStatement = db.prepare(InventoryDB.StmTemp.ADDQUANTITY);
  var subQtyStatement = db.prepare(InventoryDB.StmTemp.SUBQUANTITY);
}
catch(err) {
  ErrorHandler(err, 'Initial');
}

const getAllItems = (request,reply) => {
  let inventoryData = InventoryDB.retrieveRows(readStatement);
  reply.send(inventoryData);
}

const addItem = (request,reply) => {
  let item = request.body;
  let queryResult = InventoryDB.insertRow(
    insertStatement,
    item.itemname,
    item.class,
    item.price,
    item.quantity
  );
  
  reply.code(201).send(queryResult);
}

const deleteItem = (request, reply) => {
  let { itemname } = request.params;
  itemname = itemname.replaceAll('&+',' ');
  
  let queryResult = InventoryDB.deleteRow(deleteStatement,itemname);

  reply.send(queryResult);
}

const updateItem = (request, reply) => {
  let { itemname } = request.params;
  let newValues = request.body;

  itemname = itemname.replaceAll('&+',' ');

  let queryResult = InventoryDB.updateRow(
    updateStatement,
    newValues.itemname,
    newValues.class,
    newValues.price,
    newValues.quantity,
    itemname
  );

  reply.send(queryResult);
}

const addQuantity = (request, reply) => {
  let { itemname } = request.params;
  let AdditionalQuantity = request.body;

  itemname = itemname.replaceAll('&+',' ');

  let queryResult = InventoryDB.addQty(
    addQtyStatement,
    AdditionalQuantity.quantity,
    itemname
  );

  reply.send(queryResult);
}

const subQuantity = (request, reply) => {
  let { itemname } = request.params;
  let SubtractedQuantity = request.body;

  itemname = itemname.replaceAll('&+',' ');

  let queryResult = InventoryDB.subQty(
    subQtyStatement,
    SubtractedQuantity.quantity,
    itemname
  );

  reply.send(queryResult);
}

module.exports = {
  getAllItems,
  addItem,
  deleteItem,
  updateItem,
  addQuantity,
  subQuantity
}