const db = require('better-sqlite3')('./data/database.db');

function ErrorHandler(err, sqlCommand) {

  console.error(
    `\nERROR : [${sqlCommand}]
      message : ${err.message},
      code    : ${err.code}\n`
  );
}

function CreateInventoryTable(db,TableName) {

  try {
    db.exec(`
      CREATE TABLE ${TableName} (
        itemname TEXT PRIMARY KEY NOT NULL,
        class TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL
      )`
    );

  } catch(err) {
    ErrorHandler(err, 'CreateInventoryTable - Controlled Error');
  }
}

function CreateTransactionTable(db,TableName) {

  try {
    db.exec(`
      CREATE TABLE ${TableName} (
        buydate DATETIME NOT NULL,
        itemname TEXT NOT NULL,
        class TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL
      )`
    );
  } catch(err) {
    ErrorHandler(err, 'CreateTransactionTable - Controlled Error');
  }
}

CreateInventoryTable(db,'inventory');
CreateTransactionTable(db,'transactions');

try {

  var addItemStm = db.prepare(
    `INSERT INTO inventory (itemname, class, price, quantity) VALUES (?, ?, ?, ?)`
  );

  var editItemStm = db.prepare(
    `UPDATE inventory SET itemname = ?, class = ?, price = ?, quantity = ? WHERE itemname = ?`
  );

  var deleteItemStm = db.prepare(`DELETE FROM inventory WHERE itemname = ?`);
  var readItemsStm   = db.prepare(`SELECT * FROM inventory`);

  var addQtyStm = db.prepare(
    `UPDATE inventory SET quantity = quantity + ? WHERE itemname = ?`
  );

  var subQtyStm = db.prepare(
    `UPDATE inventory SET quantity = quantity - ? WHERE itemname = ?`
  );

  var saveTransactionsStm = db.prepare(
    `INSERT INTO transactions (buydate, itemname, class, price, quantity) VALUES (?, ?, ?, ?, ?)`
  );

  var getTransactionsStm = db.prepare(
    'SELECT * FROM transactions WHERE DATETIME(buydate) BETWEEN DATETIME(?) AND DATETIME(?)'
  );
}
catch(err) {
  ErrorHandler(err, 'items.js');
}

const getAllItems = (request,reply) => {

  try {
    let TableRows = {data:[]};

    for(let row of readItemsStm.iterate()) {
      TableRows.data.push({
        itemname: row.itemname,
        class: row.class,
        price: row.price,
        quantity: row.quantity
      });
    }

    reply.send(TableRows.data);

  } catch(err) {
    ErrorHandler(err,'items.js : 70 - getAllItems');
    reply.send([]);
  }
}

const addItem = (request,reply) => {

  try {
    let item = request.body;
    
    let result = addItemStm.run(
      item.itemname,
      item.class,
      item.price,
      item.quantity
    );

    reply.code(201).send({ changes: result.changes});

  } catch(err) {
    ErrorHandler(err,'items.js : 92 - addItem');
    reply.code(201).send({ changes: 0 });
  }
}

const deleteItem = (request, reply) => {

  try {

    let { itemname } = request.params;
    itemname = itemname.replaceAll('&+',' ');
    
    let result = deleteItemStm.run(itemname);
    reply.send({ changes: result.changes});

  } catch(err) {
    ErrorHandler(err,'items.js : 112 - deleteItem');
    reply.send({ changes: 0});
  }
}

const updateItem = (request, reply) => {
  
  try {
    let { itemname } = request.params;
    let newValues = request.body;
    itemname = itemname.replaceAll('&+',' ');

    let result = editItemStm.run(
      newValues.itemname,
      newValues.class,
      newValues.price,
      newValues.quantity,
      itemname
    );

    reply.send({ changes: result.changes });

  } catch(err) {
    ErrorHandler(err,'items.js : 128 - updateItem');
    reply.send({ changes: 0 });
  }
}

const addQuantity = (request, reply) => {
  
  try {
    let { itemname } = request.params;
    let Added = request.body;
    itemname = itemname.replaceAll('&+',' ');

    let result = addQtyStm.run(
      Added.quantity,
      itemname
    );

    reply.send({ changes: result.changes });

  } catch(err) {
    ErrorHandler(err,'items.js : 151 - addQuantity');
    reply.send({ changes: 0 });
  }
}

const subQuantity = (request, reply) => {
  
  try {
    let { itemname } = request.params;
    let Subtracted = request.body;
    itemname = itemname.replaceAll('&+',' ');

    let result = subQtyStm.run(
      Subtracted.quantity,
      itemname
    );

    reply.send({ changes: result.changes });

  } catch(err) {
    ErrorHandler(err,'items.js : 171 - subQuantity');
    reply.send({ changes: 0 });
  }
}

const recordTransactionInfo = (request, reply) => {
  
  try {
    let { savedate } = request.params;
    let data = request.body;
    let TotalChanges = 0;

    for(let i=0; i<data.length; ++i) {
      TotalChanges += saveTransactionsStm.run(
        savedate,
        data[i].itemname,
        data[i].class,
        data[i].price,
        data[i].quantity
      ).changes;
    }

    reply.code(201).send({ changes: TotalChanges });

  } catch(err) {
    ErrorHandler(err,'items.js : 191 - recordTransactionInfo');
    reply.code(201).send({ changes: 0 });
  }
}

const getTransactionBetween = (request,reply) => {
  
  try {
    let date = request.params;
    let tableRows = { data:[] };

    for(let row of getTransactionsStm.iterate(date.startdate, date.enddate)) {
      tableRows.data.push({
        buydate: row.buydate,
        itemname: row.itemname,
        class: row.class,
        price: row.price,
        quantity: row.quantity
      });
    }

    reply.send(tableRows.data);

  } catch(err) {
    ErrorHandler(err,'items.js : 216 - getTransactions');
    reply.send([]);
  }
}

module.exports = {
  getAllItems,
  addItem,
  deleteItem,
  updateItem,
  addQuantity,
  subQuantity,
  recordTransactionInfo,
  getTransactionBetween
}