import json
import sqlite3

conn = sqlite3.connect('traceforum.sql')
cursor = conn.cursor()

cursor.execute('SELECT * from transition')
rows = cursor.fetchall()

print(rows[0])

"""
# Read the SQL file
with open('data.sql', 'r') as sql_file:
    sql_commands = sql_file.read()

# Connect to the database
conn = sqlite3.connect('example.db')  # Replace with your database connection details
cursor = conn.cursor()

# Execute the SQL commands from the file
cursor.executescript(sql_commands)

# Execute a query to retrieve data (replace with your own query)
cursor.execute('SELECT id, name, age FROM users')
data = cursor.fetchall()

# Convert the data into a list of dictionaries
result = []
for row in data:
    result.append({
        'id': row[0],
        'name': row[1],
        'age': row[2]
    })

# Close the database connection
conn.close()

# Write the data to a JSON file
with open('data.json', 'w') as json_file:
    json.dump(result, json_file, indent=4)

print("Data has been read from the SQL file and written to 'data.json'.")
"""