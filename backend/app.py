# flask imports
from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
import uuid # for public id
from  werkzeug.security import generate_password_hash, check_password_hash
# imports for PyJWT authentication
import jwt
from datetime import datetime, timedelta, timezone
from functools import wraps
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)

# Configure SQLite database
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')  # Database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable event system (optional)

#DB setup ---- 
db = SQLAlchemy(app)

# Define a model (table structure) (this is setting up the ORM)
class User(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    public_id = db.Column(db.String(50), unique = True)
    email = db.Column(db.String(70), unique = True)
    password = db.Column(db.String(80))

# Create the database and tables
with app.app_context():
    db.drop_all() #obliterates the database, remove at prod
    db.create_all()

#DB Setup ----

# decorator for verifying the jwt. This is just middleware that can be used to protect routes.
# syntax is less than intuitive but the effect is that routes with this decorator have this jwt checking
# code interjected before the route is called.
def token_required(f):
    @wraps(f) # this is python decorator. This means decorated wraps the route function labelled by token_required
    def decorated(*args, **kwargs):
        token = None
        # Extract token from the Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'message': 'Token is missing or invalid!'}), 401

        token = auth_header.split(' ')[1]  # Get the token part after "Bearer"

        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user = User.query\
                .filter_by(public_id = data['public_id'])\
                .first()
            print(current_user)
        except:
            return jsonify({
                'message' : 'Token is invalid!'
            }), 401
        # returns the current logged in users context to the routes
        return  f(current_user, *args, **kwargs)
  
    return decorated

@app.route('/', methods=['GET'])
def home():
    return "Welcome to the Flask server!"

@app.route('/test', methods=['GET'])
@token_required #this decorator engages the jwt checking code
def test_route(current_user):
    return jsonify({'message' : 'Hello, ' + current_user.email + '!'})

# route for logging user in
@app.route('/login', methods =['POST'])
def login():
    # creates dictionary of form data
    login_data = request.get_json()
  
    if not login_data or not login_data.get('email') or not login_data.get('password'):
        return jsonify({'message' : 'Details missing'}), 401
  
    user = User.query\
        .filter_by(email = login_data.get('email'))\
        .first()
  
    if not user:
        return jsonify({'message': 'User does not exist'}), 401
  
    if check_password_hash(user.password, login_data.get('password')):
        # generates the JWT Token
        token = jwt.encode({
            'public_id': user.public_id,
            'exp' : datetime.now(timezone.utc) + timedelta(minutes = 30)
        }, app.config['SECRET_KEY'], algorithm='HS256')
  
        return jsonify({'token' : token}), 201
    
    return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/register', methods=['POST'])
def register_new_user():
    data = request.get_json()
    # Check if data is None (indicates invalid JSON)
    if data is None or data.get('email') is None or data.get('password') is None:
        return jsonify({"error": "Details missing"}), 400

    # gets name, email and password
    password, email = data.get('password'), data.get('email')
  
    # checking for existing user
    user = User.query\
        .filter_by(email = email)\
        .first()
    if not user:
        # database ORM object
        user = User(
            public_id = str(uuid.uuid4()),
            email = email,
            password = generate_password_hash(password)
        )
        # insert user
        db.session.add(user)
        db.session.commit()
  
        return jsonify({"message": f'User {email} successfully registered.'}), 201
    else:
        # returns 202 if user already exists
        return jsonify({"message": f'User {email} already exists. Please Log in.'}), 202


@app.route('/data', methods=['POST'])
def receive_data():
    data = request.get_json()
    return jsonify({"received": data}), 201

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)