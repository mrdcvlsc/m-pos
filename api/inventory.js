const db = require('better-sqlite3')('./data/database.db');
const { InventoryDB, ErrorHandler } = require('./database.js');

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

  fastify.post('/data/inventory', (req,rep) => {

  });
}

module.exports = api;