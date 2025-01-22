import json
import sqlite3

# Connect to your SQLite database (or create it)
conn = sqlite3.connect('../instance/database.db')
cursor = conn.cursor()

cursor.execute('''DROP TABLE IF EXISTS question''')

# Create a table if it doesn't exist
cursor.execute('''
CREATE TABLE IF NOT EXISTS question (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    operand1 INTEGER NOT NULL,
    operand2 INTEGER NOT NULL,
    result INTEGER NOT NULL
)
''')

# Load data from JSON file
with open('../questions-backup/questions-mt.json') as json_file:
    data = json.load(json_file)

# Insert data into the database
for question in data:
    cursor.execute('''
    INSERT INTO question (type, operand1, operand2, result) VALUES (?, ?, ?, ?)
    ''', (question['type'], question['operand1'], question['operand2'], question['result']))

# Commit the changes and close the connection
conn.commit()
conn.close()

print("Data has been successfully populated!")