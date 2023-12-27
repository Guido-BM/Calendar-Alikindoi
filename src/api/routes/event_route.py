# rutas/event_routes.py
from flask import request, jsonify, Blueprint
from flask_cors import CORS
from ..services.event_service import EventService

event_api = Blueprint('event_api', __name__)
CORS(event_api)

@event_api.route('/events', methods=['GET'])
def get_all_events():
    events = EventService.get_all_events()
    return jsonify([event.serialize() for event in events])

@event_api.route('/events/<int:event_id>', methods=['GET'])
def get_event_by_id(event_id):
    event = EventService.get_event_by_id(event_id)
    if event:
        return jsonify(event.serialize())
    else:
        return jsonify({"error": "Event not found"}), 404

@event_api.route('/events', methods=['POST'])
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
        return jsonify({"error": "Title, start_time, and user_id are required"}), 400

@event_api.route('/events/<int:event_id>', methods=['PUT'])
def update_event(event_id):
    event = EventService.get_event_by_id(event_id)
    if event:
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        user_id = data.get('user_id')

        updated_event = EventService.update_event(event, title, description, start_time, end_time, user_id)
        return jsonify(updated_event.serialize())
    else:
        return jsonify({"error": "Event not found"}), 404

@event_api.route('/events', methods=['DELETE'])
def delete_all_events():
    events = EventService.get_all_events()
    for event in events:
        EventService.delete_event(event)
    return jsonify({"message": "All events deleted successfully"}), 200

@event_api.route('/events/<int:event_id>', methods=['DELETE'])
def delete_event_by_id(event_id):
    event = EventService.get_event_by_id(event_id)
    if event:
        EventService.delete_event(event)
        return jsonify({"message": f"Event with ID {event_id} deleted successfully"}), 200
    else:
        return jsonify({"error": "Event not found"}), 404