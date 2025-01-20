# flask imports
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid # for public id
from  werkzeug.security import generate_password_hash, check_password_hash
# imports for PyJWT authentication
import jwt
from datetime import datetime, timedelta
from functools import wraps
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# Configure SQLite database
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')  # Database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable event system (optional)
db = SQLAlchemy(app)

#DB setup ---- 
# Define a model (table structure) (this is setting up the ORM)
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

# Create the database and tables
with app.app_context():
    db.create_all()

#DB Setup ----

# decorator for verifying the jwt. This is just middleware that can be used to protect routes.
# syntax is less than intuitive but the effect is that routes with this decorator have this jwt checking
# code interjected before the route is called.
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
  
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = User.query\
                .filter_by(public_id = data['public_id'])\
                .first()
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users context to the routes
        return  f(current_user, *args, **kwargs)
  
    return decorated

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Flask server!"

@app.route('/api/test', methods=['GET'])
@token_required #this decorator engages the jwt checking code
def test_route(current_user):
    return jsonify({'message' : 'Hello, ' + current_user.name + '!'})

@app.route('/register', methods=['POST'])
def register_new_user():
    data = request.get_json()
    # Check if data is None (indicates invalid JSON)
    if data is None:
        return jsonify({"error": "Invalid JSON"}), 400

    # gets name, email and password
    name, email = data.get('name'), data.get('email')
    password = data.get('password')
  
    # checking for existing user
    user = User.query\
        .filter_by(email = email)\
        .first()
    if not user:
        # database ORM object
        user = User(
            public_id = str(uuid.uuid4()),
            name = name,
            email = email,
            password = generate_password_hash(password)
        )
        # insert user
        db.session.add(user)
        db.session.commit()
  
        return jsonify({"message": 'Successfully registered.'}), 201
    else:
        # returns 202 if user already exists
        return jsonify({"message": 'User already exists. Please Log in.'}), 202

@app.route('/data', methods=['POST'])
def receive_data():
    data = request.json
    return jsonify({"received": data}), 201

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)