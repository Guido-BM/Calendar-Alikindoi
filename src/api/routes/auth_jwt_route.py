from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from .models.user import User

auth = Blueprint('auth', __name__)

@auth.route('/login', methods=['POST', 'GET'])
def create_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401
    
    access_token = create_access_token(identity=email)
    return jsonify({"token": access_token, "user_id": user.id})