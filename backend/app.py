from flask import Flask, request, jsonify
import uuid
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Flask server!"

@app.route('/register', methods=['POST'])
def register_new_user():
    data = request.get_json()
    # Check if data is None (indicates invalid JSON)
    if data is None:
        return jsonify({"error": "Invalid JSON"}), 400

    # Process the data (for example, print it)
    print(data.get('username'))

    # Return a response
    return jsonify({"message": "Data received", "data": data}), 200

@app.route('/data', methods=['POST'])
def receive_data():
    data = request.json
    return jsonify({"received": data}), 201

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)