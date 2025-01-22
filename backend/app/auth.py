from flask import Blueprint, request, jsonify
from functools import wraps
import jwt
from datetime import datetime, timedelta, timezone
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from .models import User
from flask import current_app

auth = Blueprint('auth', __name__)

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
            data = jwt.decode(
                token, 
                current_app.config['SECRET_KEY'], 
                algorithms=['HS256']
            )
            current_user = User.query\
                .filter_by(public_id=data['public_id'])\
                .first()
            print(current_user)
        except:
            return jsonify({
                'message' : 'Token is invalid!'
            }), 401
        # returns the current logged in users context to the routes
        return  f(current_user, *args, **kwargs)
  
    return decorated

# route for logging user in
@auth.route('/login', methods =['POST'])
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
        }, current_app.config['SECRET_KEY'], algorithm='HS256')
  
        return jsonify({'token' : token}), 201
    
    return jsonify({'message': 'Invalid email or password'}), 401

@auth.route('/register', methods=['POST'])
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
    #redirect(url_for('login')) #maybe add this later so that it just takes you to the login page