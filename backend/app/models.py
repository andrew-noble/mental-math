from . import db

#this file is just the ORM setup

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    email = db.Column(db.String(70), unique=True)
    password = db.Column(db.String(80)) 