function ErrorHandler(err, sqlCommand) {
  console.error(
    `\nERROR : [${sqlCommand}]
      message : ${err.message},
      code    : ${err.code}\n`
  );
}

const InventoryDB = {
  /// statement templates
  StmTemp : {
    INSERT : `INSERT INTO inventory (itemname, class, price, quantity) VALUES (?, ?, ?, ?)`,
    READ : `SELECT * FROM inventory`,
    DELETE : `DELETE FROM inventory WHERE itemname = ?`,
    UPDATE : `UPDATE inventory SET itemname = ?, class = ?, price = ?, quantity = ? WHERE itemname = ?`,
    ADDQUANTITY : `UPDATE inventory SET quantity = quantity + ? WHERE itemname = ?`,
    SUBQUANTITY : `UPDATE inventory SET quantity = quantity - ? WHERE itemname = ?`,
    RECORDTRANSACTION : `INSERT INTO transactions (buydate, itemname, class, price, quantity) VALUES (?, ?, ?, ?, ?)`,
    GET_TRANSACTIONS : 'SELECT * FROM transactions WHERE DATETIME(buydate) BETWEEN DATETIME(?) AND DATETIME(?)'
  },

  initialize : function(db, inventoryName) {
    try{
      db.exec(`
        CREATE TABLE ${inventoryName} (
          itemname TEXT PRIMARY KEY NOT NULL,
          class TEXT NOT NULL,
          price REAL NOT NULL,
          quantity INTEGER NOT NULL
        )`
      );
    }
    catch(err) {
      ErrorHandler(err,'initialize');
      return false;
    }
    return true;
  },

  init_transactions : function(db, transactionTableName) {
    try{
      db.exec(`
        CREATE TABLE ${transactionTableName} (
          buydate DATETIME NOT NULL,
          itemname TEXT NOT NULL,
          class TEXT NOT NULL,
          price REAL NOT NULL,
          quantity INTEGER NOT NULL
        )`
      );
    }
    catch(err) {
      ErrorHandler(err,'init_transactions');
      return false;
    }
    return true;
  },

  insertRow : function(insertStatement, Product, Class, Price, Quantity) {
    let result;
    try {
      result = insertStatement.run(Product, Class, Price, Quantity);
    }
    catch(err) {
      ErrorHandler(err,'insertRow');
      return { changes: 0 };
    }
    return { changes: result.changes };
  },

  updateRow : function(editStatement, NewProduct, NewClass, NewPrice, NewQuantity, Product) {
    let result;
    try {
      result = editStatement.run(NewProduct, NewClass, NewPrice, NewQuantity, Product);
    }
    catch(err) {
      ErrorHandler(err,'updateRow');
      return { changes: 0 };
    }
    return { changes: result.changes };
  },

  deleteRow : function(deleteStatement, Product) {
    let result;
    try {
      result = deleteStatement.run(Product);
    }
    catch(err) {
      ErrorHandler(err,'deleteRow');
      return { changes: 0 };
    }
    return { changes: result.changes };
  },

  retrieveRows : function(retreiveStatement) {
    let tableRows = {
      data:[]
    };
    try {
      for(let row of retreiveStatement.iterate()) {
        tableRows.data.push({
          itemname: row.itemname,
          class: row.class,
          price: row.price,
          quantity: row.quantity
        });
      }
    }
    catch(err) {
      ErrorHandler(err,'retrieveRows');
    }
    return tableRows.data;
  },

  drop : function(db) {
    try {
      db.exec(`DROP TABLE inventory`);
    }
    catch(err) {
      ErrorHandler(err,'drop');
      return false;
    }
    return true;
  },

  addQty : function(addStatement, Quantity, Product) {
    let result;
    try {
      result = addStatement.run(Quantity, Product);
    }
    catch(err) {
      ErrorHandler(err,'add quantity');
      return { changes: 0 };
    }
    return { changes: result.changes };
  },

  subQty : function(subStatement, Quantity, Product) {
    let result;
    try {
      result = subStatement.run(Quantity, Product);
    }
    catch(err) {
      ErrorHandler(err,'sub quantity');
      return { changes: 0 };
    }
    return { changes: result.changes };
  },

  recordTransaction : function(rcrdTrnsctnStatement, data, savedate) {
    let TotalChanges = 0;
    try {
      for(let i=0; i<data.length; ++i) {
        TotalChanges += rcrdTrnsctnStatement.run(
          savedate,
          data[i].itemname,
          data[i].class,
          data[i].price,
          data[i].quantity
        ).changes;
      }
    }
    catch(err) {
      ErrorHandler(err,'recordTransaction');
      return { changes: 0 };
    }
    return { changes: TotalChanges };
  },

  getTransactions : function(GetTransactionStatement, startdate, enddate) {
    let tableRows = {
      data:[]
    };

    console.log('Start date =', startdate);
    console.log('end date =', enddate);

    try {
      for(let row of GetTransactionStatement.iterate(startdate, enddate)) {
        tableRows.data.push({
          buydate: row.buydate,
          itemname: row.itemname,
          class: row.class,
          price: row.price,
          quantity: row.quantity
        });
      }
    }
    catch(err) {
      ErrorHandler(err,'getTransactions');
    }
    return tableRows.data;
  }
}

module.exports = { InventoryDB, ErrorHandler };