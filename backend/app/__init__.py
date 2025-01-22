from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
from flask_cors import CORS
#instantiate the ORM
db = SQLAlchemy()

#this is the "app factory" design pattern. It is the entrypoint that does setup and config
def create_app():
    app = Flask(__name__)

    CORS(app)
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173/"}})

    load_dotenv()
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    # Configure SQLite database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # Database file
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable event system (optional)

    #bind the database to the app
    db.init_app(app)

    # Create database tables
    with app.app_context():
        db.create_all()

    # Register "blueprints". This is equivalent (but not as nice tbh) to "router" object setup in express.
    from .auth import auth
    from .main import main
    app.register_blueprint(auth, url_prefix='/auth')
    app.register_blueprint(main, url_prefix='')

    return app