const fs = require('fs');
const db = require('better-sqlite3')('./data/inventory.db');
const { InventoryDB, ErrorHandler } = require('./inventory-db');

let insertStatement, updateStatement, deleteStatement, readStatement;

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

async function api(fastify, options) {

  fastify.get('/data/inventory',(req,rep) => {
    rep.send(InventoryDB.retrieveRows(readStatement));
  });
}

module.exports = api;