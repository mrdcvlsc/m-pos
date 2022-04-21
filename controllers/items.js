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
  console.log(inventoryData);
  reply.send(inventoryData);
}

const addItem = (request,reply) => {
  let item = request.body;
  let queryResults = InventoryDB.insertRow(
    insertStatement,
    item.itemname,
    item.class,
    item.price,
    item.quantity
  );
  
  reply.code(201).send(queryResults);
}

module.exports = {
  getAllItems,
  addItem
}