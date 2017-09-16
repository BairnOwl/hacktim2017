
#!/usr/bin/env python3
import sqlite3
import csv
import sys

def create(database):
    conn = sqlite3.connect(database)

    c = conn.cursor()

    # Delete table if already exists
    c.execute('DROP TABLE IF EXISTS "fridge";')

    c.execute('PRAGMA foreign_keys = ON;')


    # Create tables

    c.execute('''CREATE TABLE IF NOT EXISTS fridge(
            name text not null,
            imagePath text not null,
            dateAdded int not null,
            count int not null,
            PRIMARY KEY(name));
            ''')

    conn.commit()
    conn.close()

    ###################################################
    #               END OF YOUR CODE                  #
    ###################################################

if __name__ == '__main__':
    create(sys.argv[1])
