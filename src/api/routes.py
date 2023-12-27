from flask import request, jsonify, Blueprint
from flask_cors import CORS
from .services import UserService, EventService

api = Blueprint('api', __name__)
CORS(api)

# Rutas para usuarios

@api.route('/users', methods=['GET'])
def get_all_users():
    users = UserService.get_all_users()
    return jsonify([user.serialize() for user in users])

@api.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = UserService.get_user_by_id(user_id)
    if user:
        return jsonify(user.serialize())
    else:
        return jsonify({"error": "User not found"}), 404

@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    is_active = data.get('is_active', True)
    name = data.get('name') 
    population = data.get('population')  

    if email and password:
        new_user = UserService.create_user(email, password, is_active, name, population)
        return jsonify(new_user.serialize()), 201
    else:
        return jsonify({"error": "Email and password are required"}), 400

@api.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = UserService.get_user_by_id(user_id)
    if user:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        is_active = data.get('is_active')
        name = data.get('name')  
        population = data.get('population')  

        updated_user = UserService.update_user(user, email, password, is_active, name, population)
        return jsonify(updated_user.serialize())
    else:
        return jsonify({"error": "User not found"}), 404

@api.route('/users', methods=['DELETE'])
def delete_all_users():
    users = UserService.get_all_users()
    for user in users:
        UserService.delete_user(user)
    return jsonify({"message": "All users deleted successfully"}), 200


@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user_by_id(user_id):
    user = UserService.get_user_by_id(user_id)
    if user:
        UserService.delete_user(user)
        return jsonify({"message": f"User with ID {user_id} deleted successfully"}), 200
    else:
        return jsonify({"error": "User not found"}), 404

# Rutas para eventos

@api.route('/events', methods=['GET'])
def get_all_events():
    events = EventService.get_all_events()
    return jsonify([event.serialize() for event in events])

@api.route('/events/<int:event_id>', methods=['GET'])
def get_event_by_id(event_id):
    event = EventService.get_event_by_id(event_id)
    if event:
        return jsonify(event.serialize())
    else:
        return jsonify({"error": "Event not found"}), 404

@api.route('/events', methods=['POST'])
def create_event():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    start_time = data.get('start_time')
    end_time = data.get('end_time')
    user_id = data.get('user_id')

    if title and start_time and user_id:
        new_event = EventService.create_event(title, description, start_time, end_time, user_id)
        return jsonify(new_event.serialize()), 201
    else:
        return jsonify
