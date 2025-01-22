from flask import Blueprint, jsonify, request
from .models import Question
from .auth import token_required
from .utils.to_dict import to_dict
main = Blueprint('main', __name__)

@main.route('/')
def home():
    return "Welcome to the Flask server!"

@main.route('/test')
@token_required
def test_route(current_user):
    return jsonify({'message': f'Hello, {current_user.email}!'})

@main.route('allQuestions')
#@token_required #this passes current_user to the function below, btw
def get_all_questions():
    questions = Question.query.all()
    questions_dict = to_dict(questions)
    return jsonify({'questions': questions_dict})