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

- record a transaction ; example:
    ```sql
    INSERT INTO transactions (buydate, itemname, class, price, quantity) VALUES ('2021-02-05','regular jeans', 'clothes', 35, 7);
    ```

- get all transactions for the last 7 days
    ```sql
    select * from transactions where buydate > DATE_SUB(CURDATE(), INTERVAL 7 DAY);
    ```

- get all transactions for the last 30 days
    ```sql
    select * from transactions where buydate > DATE_SUB(CURDATE(), INTERVAL 30 DAY);
    ```

- get all transactions for the last 365 days
    ```sql
    select * from transactions where buydate > DATE_SUB(CURDATE(), INTERVAL 365 DAY);
    ```

- display all dates between two given dates
    ```sql
    select * from
    (select adddate('1970-01-01',t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 +t0.i) selected_date from
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v
    where selected_date between '2012-02-10' and '2012-02-15';
    ```

- display all dates THE PAST 7 days
    ```sql
    select * from
    (select adddate('1970-01-01',t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 +t0.i) selected_date from
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v
    where selected_date between DATE_SUB(CURDATE(), INTERVAL 7 DAY) and CURDATE();
    ```

- display all dates THE PAST 30 days
    ```sql
    select * from
    (select adddate('1970-01-01',t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 +t0.i) selected_date from
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v
    where selected_date between DATE_SUB(CURDATE(), INTERVAL 30 DAY) and CURDATE();
    ```

- display all dates THE PAST 365 days
    ```sql
    select * from
    (select adddate('1970-01-01',t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 +t0.i) selected_date from
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v
    where selected_date between DATE_SUB(CURDATE(), INTERVAL 364 DAY) and CURDATE();
    ```

- display 12 months
    ```sql
    select DATE_FORMAT(selected_date,'%y%m') from
    (select adddate('1970-01-01',t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 +t0.i) selected_date from
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
    (select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4) v
    where selected_date between DATE_SUB(CURDATE(), INTERVAL 364 DAY) and CURDATE();
    ```
