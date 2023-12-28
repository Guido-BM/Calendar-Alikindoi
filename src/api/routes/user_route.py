from flask import request, jsonify, Blueprint
from flask_cors import CORS
from ..services.user_service import UserService

user_api = Blueprint('user_api', __name__)
CORS(user_api)

@user_api.route('/users', methods=['GET'])
def get_all_users():
    users = UserService.get_all_users()
    return jsonify([user.serialize() for user in users])

@user_api.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = UserService.get_user_by_id(user_id)
    return jsonify(user.serialize()) if user else jsonify({"error": "User not found"}), 404

@user_api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')
    birth_date = data.get('birth_date')
    location = data.get('location')
    phone_number = data.get('phone_number')
    last_name = data.get('last_name')
    name = data.get('name')
    is_active = data.get('is_active', True)

    if email and password:
        new_user = UserService.create_user(email, password, is_active, name, last_name, phone_number, username, birth_date, location)
        return jsonify(new_user.serialize()), 201
    else:
        return jsonify({"error": "Email and password are required"}), 400

@user_api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = UserService.get_user_by_id(user_id)
    if user:
        data = request.get_json()
        UserService.update_user(user, email=data.get('email'), password=data.get('password'), is_active=data.get('is_active'), name=data.get('name'),username=data.get('username'), birth_date=data.get('birth_date'), location=data.get('location'), phone_number=data.get('phone_number'), last_name=data.get('last_name'))
        return jsonify(user.serialize())
    else:
        return jsonify({"error": "User not found"}), 404

@user_api.route('/users', methods=['DELETE'])
def delete_all_users():
    users = UserService.get_all_users()
    for user in users:
        UserService.delete_user(user)
    return jsonify({"message": "All users deleted successfully"}), 200

@user_api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user_by_id(user_id):
    user = UserService.get_user_by_id(user_id)
    if user:
        UserService.delete_user(user)
        return jsonify({"message": f"User with ID {user_id} deleted successfully"}), 200
    else:
        return jsonify({"error": "User not found"}), 404
