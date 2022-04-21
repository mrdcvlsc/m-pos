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
    UPDATE : `UPDATE inventory SET itemname = ?, class = ?, price = ?, quantity = ? WHERE itemname = ?`
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
  }
}

module.exports = { InventoryDB, ErrorHandler };