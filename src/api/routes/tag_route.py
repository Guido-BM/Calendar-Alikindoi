# rutas Tag Routes

from flask import request, jsonify, Blueprint
from flask_cors import CORS
from ..services.tag_service import TagService

tag_blueprint = Blueprint('tag', __name__)
CORS(tag_blueprint)

tag_service = TagService()

# Create
@tag_blueprint.route('/tag', methods=['POST'])
def create_tag():
    data = request.get_json()
    tag = tag_service.create_tag(data)
    return jsonify(tag), 201

# Read
@tag_blueprint.route('/tag/<int:id>', methods=['GET'])
def get_tag(id):
    tag = tag_service.get_tag(id)
    return jsonify(tag)

# Update
@tag_blueprint.route('/tag/<int:id>', methods=['PUT'])
def update_tag(id):
    data = request.get_json()
    tag = tag_service.update_tag(id, data)
    return jsonify(tag)

# Delete
@tag_blueprint.route('/tag/<int:id>', methods=['DELETE'])
def delete_tag(id):
    tag_service.delete_tag(id)
    return '', 204
