# from flask import Flask, request, jsonify, Blueprint
# from flask_cors import CORS
# from ..services.mood_service import MoodService

# #app = Flask(__name__)
# mood_api = Blueprint('mood_api', __name__)
# CORS(mood_api)

# @mood_api.route('/moods', methods=['GET'])
# def get_moods():
#     moods = Mood.query.all()
#     return jsonify([mood.to_dict() for mood in moods])

# @mood_api.route('/moods', methods=['POST'])
# def create_mood():
#     data = request.get_json()
#     mood = Mood(mood_type=data['mood_type'], event_id=data['event_id'])
#     db.session.add(mood)
#     db.session.commit()
#     return jsonify(mood.to_dict()), 201

# @mood_api.route('/moods/<int:id>', methods=['GET'])
# def get_mood(id):
#     mood = Mood.query.get(id)
#     if mood is None:
#         return jsonify({'error': 'Mood not found'}), 404
#     return jsonify(mood.to_dict())

# @mood_api.route('/moods/<int:id>', methods=['PUT'])
# def update_mood(id):
#     mood = Mood.query.get(id)
#     if mood is None:
#         return jsonify({'error': 'Mood not found'}), 404
#     data = request.get_json()
#     mood.mood_type = data['mood_type']
#     mood.event_id = data['event_id']
#     db.session.commit()
#     return jsonify(mood.to_dict())

# @mood_api.route('/moods/<int:id>', methods=['DELETE'])
# def delete_mood(id):
#     mood = Mood.query.get(id)
#     if mood is None:
#         return jsonify({'error': 'Mood not found'}), 404
#     db.session.delete(mood)
#     db.session.commit()
#     return jsonify({'message': 'Mood deleted'})
