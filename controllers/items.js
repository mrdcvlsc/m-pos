const db = require('better-sqlite3')('./data/database.db');
const { InventoryDB, ErrorHandler } = require('./database');

try {
  InventoryDB.initialize(db,'inventory');
  insertStatement = db.prepare(InventoryDB.StmTemp.INSERT);
  updateStatement = db.prepare(InventoryDB.StmTemp.UPDATE);
  deleteStatement = db.prepare(InventoryDB.StmTemp.DELETE);
  readStatement = db.prepare(InventoryDB.StmTemp.READ);
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

module.exports = {
  getAllItems,
  addItem,
  deleteItem
}