from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Flask server!"

@app.route('/hello', methods=['GET'])
def hello():
    return "Hello, Flask!"

@app.route('/data', methods=['POST'])
def receive_data():
    data = request.json
    return jsonify({"received": data}), 201

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)