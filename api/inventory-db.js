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
    try {
      insertStatement.run(Product, Class, Price, Quantity);
    }
    catch(err) {
      ErrorHandler(err,'insertRow');
    }
    return insertStatement.changes;
  },

  updateRow : function(editStatement, NewProduct, NewClass, NewPrice, NewQuantity, Product) {
    try {
      editStatement.run(NewProduct, NewClass, NewPrice, NewQuantity, Product);
    }
    catch(err) {
      ErrorHandler(err,'updateRow');
    }
    return editStatement.changes;
  },

  deleteRow : function(deleteStatement, Product) {
    try {
      deleteStatement.run(Product);
    }
    catch(err) {
      ErrorHandler(err,'deleteRow');
    }
    return deleteStatement.changes;
  },

  retrieveRows : function(retreiveStatement) {
    let tableRows = {
      data:[]
    };
    try {
      for(let row of retreiveStatement.iterate()) {
        console.log(row);
        tableRows.data.push([row.itemname,row.class,row.price,row.quantity]);
      }
    }
    catch(err) {
      ErrorHandler(err,'retrieveRows');
    }
    return tableRows;
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