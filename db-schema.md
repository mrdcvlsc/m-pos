# Sqlite3 Database Tables

## inventory
| Row Name | Data Type |      Properties      |
| :------: | :-------: | :------------------: |
| itemname |   TEXT    | PRIMARY KEY NOT NULL |
|  class   |   TEXT    |       NOT NULL       |
|  price   |   REAL    |       NOT NULL       |
| quantity |  INTEGER  |       NOT NULL       |

-----

## transactions
| Row Name | Data Type |   Properties   |
| :------: | :-------: | :------------: |
| buydate  |   DATE    |    NOT NULL    |
| itemname |   TEXT    |    NOT NULL    |
|  price   |   REAL    |    NOT NULL    |
| quantity |  INTEGER  |    NOT NULL    |
