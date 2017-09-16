
#!/usr/bin/env python3
import sqlite3
import csv
import sys

def create(database):
    conn = sqlite3.connect(database)

    c = conn.cursor()

    # Delete table if already exists
    c.execute('DROP TABLE IF EXISTS "food";')

    c.execute('PRAGMA foreign_keys = ON;')


    # Create tables

    c.execute('''CREATE TABLE IF NOT EXISTS food(
            name text not null,
            nutrition_grade text not null,
            fat int not null,
            saturated_fat int not null,
            sugars int not null,
            salt int not null,
            serving_size text not null,
            PRIMARY KEY(name));
            ''')


    milk = ("Whole Milk", "B", 3.75, 2.08, 5, 0.138, "1 cup")
    lays_chips = ("Lay's Classic", "D", 35.7, 5.36, 3.57, 3.17, "1 oz")
    turkey = ("Turkey Bologna - Oscar Mayer", "N/A", 14.3, 3.57, 0, 1.63, "28 g")
    coke = ("Coca Cola", "E", 0, 0, 10.6, 0, "33cL")
    grapes = ("Grapes", "A", 0.5, 0.1, 15.4, 0.1, "N/A")

    foods = [milk, lays_chips, turkey, coke, grapes]

    for f in foods:
        c.execute('''INSERT INTO food VALUES(?, ?, ?, ?, ?, ?, ?)''', f)


    conn.commit()
    conn.close()

    ###################################################
    #               END OF YOUR CODE                  #
    ###################################################

if __name__ == '__main__':
    create(sys.argv[1])
