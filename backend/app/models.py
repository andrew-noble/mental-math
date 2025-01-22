from . import db

#this file is just the db/ORM setup

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(70), unique=True)
    password = db.Column(db.String(80))

class Question(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(10))
    operand1 = db.Column(db.Integer)
    operand2 = db.Column(db.Integer)
    result = db.Column(db.Integer)
