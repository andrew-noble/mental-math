from flask import Blueprint, jsonify, request
from .auth import token_required

main = Blueprint('main', __name__)

@main.route('/')
def home():
    return "Welcome to the Flask server!"

@main.route('/test')
@token_required
def test_route(current_user):
    return jsonify({'message': f'Hello, {current_user.email}!'})

@main.route('/data', methods=['POST'])
def receive_data():
    data = request.get_json()
    return jsonify({"received": data}), 201
