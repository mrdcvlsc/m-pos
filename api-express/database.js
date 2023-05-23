const db = require('better-sqlite3')('./data/database.db')

class Query {
  static addItem = db.prepare(
    'INSERT INTO inventory (itemname, class, price, quantity) VALUES (?, ?, ?, ?)'
  )

  static editItem = db.prepare(
    'UPDATE inventory SET itemname = ?, class = ?, price = ?, quantity = ? WHERE itemname = ?'
  )

  static deleteItem = db.prepare('DELETE FROM inventory WHERE itemname = ?')
  static readItems = db.prepare('SELECT * FROM inventory')

  static addQty = db.prepare(
    'UPDATE inventory SET quantity = quantity + ? WHERE itemname = ?'
  )

  static subQty = db.prepare(
    'UPDATE inventory SET quantity = quantity - ? WHERE itemname = ?'
  )

  static saveTransactions = db.prepare(
    'INSERT INTO transactions (buydate, itemname, class, price, quantity) VALUES (?, ?, ?, ?, ?)'
  )

  static getTransactions = db.prepare(
    'SELECT * FROM transactions WHERE DATETIME(buydate) BETWEEN DATETIME(?) AND DATETIME(?)'
  )

  static ErrorHandler (err, sqlCommand) {
    console.error(
      `\nERROR : [${sqlCommand}]
        message : ${err.message},
        code    : ${err.code}\n`
    )
  }

  static CreateInventoryTable = function (db, TableName) {
    try {
      db.exec(`
        CREATE TABLE ${TableName} (
          itemname TEXT PRIMARY KEY NOT NULL,
          class TEXT NOT NULL,
          price REAL NOT NULL,
          quantity INTEGER NOT NULL
        )`
      )
    } catch (err) {
      this.ErrorHandler(err, 'CreateInventoryTable - Controlled Error')
    }
  }

  static CreateTransactionTable = function (db, TableName) {
    try {
      db.exec(`
        CREATE TABLE ${TableName} (
          buydate DATETIME NOT NULL,
          itemname TEXT NOT NULL,
          class TEXT NOT NULL,
          price REAL NOT NULL,
          quantity INTEGER NOT NULL
        )`
      )
    } catch (err) {
      this.ErrorHandler(err, 'CreateTransactionTable - Controlled Error')
    }
  }
}

Query.CreateInventoryTable(db, 'inventory')
Query.CreateTransactionTable(db, 'transactions')

module.exports = Query;