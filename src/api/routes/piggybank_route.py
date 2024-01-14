# rutas Piggybank Routes

from flask import request, jsonify, Blueprint
from flask_cors import CORS
from ..services.piggybank_service import PiggybankService

piggybank_api = Blueprint('piggybank_api', __name__)
CORS(piggybank_api)

piggybank_service = PiggybankService()

# Create
@piggybank_api.route('/piggybank', methods=['GET'])
def get_all_piggybanks():
    piggybanks = piggybank_service.get_all_piggybanks()
    return jsonify(piggybanks)

@piggybank_api.route('/piggybank', methods=['POST'])
def create_piggybank():
    data = request.get_json()
    piggybank = piggybank_service.create_piggybank(data)
    return jsonify(piggybank), 201

# Read
@piggybank_api.route('/piggybank/<int:id>', methods=['GET'])
def get_piggybank(id):
    piggybank = piggybank_service.get_piggybank(id)
    return jsonify(piggybank)

# Update
@piggybank_api.route('/piggybank/<int:id>', methods=['PUT'])
def update_piggybank(id):
    data = request.get_json()
    piggybank = piggybank_service.update_piggybank(id, data)
    return jsonify(piggybank)

# Delete
@piggybank_api.route('/piggybank/<int:id>', methods=['DELETE'])
def delete_piggybank(id):
    piggybank_service.delete_piggybank(id)
    return '', 204