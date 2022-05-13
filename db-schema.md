# Sqlite3 Database Tables

# inventory

## table

| Row Name | Data Type |      Properties      |
| :------: | :-------: | :------------------: |
| itemname |   TEXT    | PRIMARY KEY NOT NULL |
|  class   |   TEXT    |       NOT NULL       |
|  price   |   REAL    |       NOT NULL       |
| quantity |  INTEGER  |       NOT NULL       |

## queries

- add an item
    ```sql
    INSERT INTO inventory (itemname, class, price, quantity) VALUES ('sample-name', 'sample-class', 69, 499);
    ```

- retrieve all items
    ```sql
    SELECT * FROM inventory;
    ```

- delete an item
    ```sql
    DELETE FROM inventory WHERE itemname = 'sample-itemname',
    ```

- edit an item
    ```sql
    UPDATE inventory SET itemname = 'new-itemname', class = 'new-class', price = 999, quantity = 777 WHERE itemname = 'old-itemname'
    ```

- add quantity count
    ```sql
    UPDATE inventory SET quantity = quantity + 7 WHERE itemname = 'sample-itemname'
    ```
    
- sub quantity count
    ```sql
    UPDATE inventory SET quantity = quantity - 2 WHERE itemname = 'sample-itemname'
    ```

-----

# transactions

## table

| Row Name | Data Type |   Properties   |
| :------: | :-------: | :------------: |
| buydate  |   DATE    |    NOT NULL    |
| itemname |   TEXT    |    NOT NULL    |
|  class   |   TEXT    |    NOT NULL    |
|  price   |   REAL    |    NOT NULL    |
| quantity |  INTEGER  |    NOT NULL    |

## queries

- get current datetime.
    ```sql
    DATETIME()
    OR
    DATETIME('now')
    ```

- subtract (-) or add (+) from a date, you can also use the ```'now'``` as a date.
    ```sql
    DATETIME('2022-05-13T03:40:35.303Z', '+3 day', '-1 year', '-2 months', '+1 hour', '-2 minute', '+1 second');
    ```

- get all transactions between two dates
    ```sql
    SELECT * FROM transactions WHERE DATETIME(buydate) BETWEEN DATETIME(startdate) AND DATETIME(enddate)
    ```
    Note that the ```DATETIME``` function was just used here because we need the same date types for the conditions and column values. You can use any **sqlite3** date function modifier you want. If you can guarantee that the values are all just the same date type, then there is no need to use any date function modifier.

- record a transaction ; example:
    ```sql
    INSERT INTO transactions (buydate, itemname, class, price, quantity) VALUES ('2021-02-05','regular jeans', 'clothes', 35, 7);
    ```