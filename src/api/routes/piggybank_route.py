# rutas Piggybank Routes

from flask import request, jsonify, Blueprint
from flask_cors import CORS
from ..services.piggybank_service import PiggybankService

piggybank_blueprint = Blueprint('piggybank', __name__)
CORS(piggybank_blueprint)

piggybank_service = PiggybankService()

# Create
@piggybank_blueprint.route('/piggybank', methods=['POST'])
def create_piggybank():
    data = request.get_json()
    piggybank = piggybank_service.create_piggybank(data)
    return jsonify(piggybank), 201

# Read
@piggybank_blueprint.route('/piggybank/<int:id>', methods=['GET'])
def get_piggybank(id):
    piggybank = piggybank_service.get_piggybank(id)
    return jsonify(piggybank)

# Update
@piggybank_blueprint.route('/piggybank/<int:id>', methods=['PUT'])
def update_piggybank(id):
    data = request.get_json()
    piggybank = piggybank_service.update_piggybank(id, data)
    return jsonify(piggybank)

# Delete
@piggybank_blueprint.route('/piggybank/<int:id>', methods=['DELETE'])
def delete_piggybank(id):
    piggybank_service.delete_piggybank(id)
    return '', 204