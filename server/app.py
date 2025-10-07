# server/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_PATH = "sessions.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''
        CREATE TABLE IF NOT EXISTS sessions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT NOT NULL,
            part TEXT NOT NULL,
            volume INTEGER NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

@app.route("/sessions", methods=["GET"])
def get_sessions():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("SELECT * FROM sessions ORDER BY id DESC")
    data = c.fetchall()
    conn.close()
    sessions = [{"id": r[0], "date": r[1], "part": r[2], "volume": r[3]} for r in data]
    return jsonify(sessions)

@app.route("/sessions", methods=["POST"])
def add_session():
    data = request.json
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("INSERT INTO sessions (date, part, volume) VALUES (?, ?, ?)",
              (data["date"], data["part"], data["volume"]))
    conn.commit()
    conn.close()
    return jsonify({"message": "Session added successfully!"}), 201

@app.route("/sessions/<int:id>", methods=["DELETE"])
def delete_session(id):
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute("DELETE FROM sessions WHERE id = ?", (id,))
    conn.commit()
    conn.close()
    return jsonify({"message": "Session deleted."})

if __name__ == "__main__":
    init_db()
    app.run(port=5000, debug=True)
