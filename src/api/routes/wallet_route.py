# rutas Wallet Routes

from flask import request, jsonify, Blueprint
from flask_cors import CORS
from ..services.wallet_service import WalletService

wallet_api = Blueprint('wallet_api', __name__)
CORS(wallet_api)

wallet_service = WalletService()

# Create
@wallet_api.route('/wallet', methods=['GET'])
def get_all_wallets():
    wallets = wallet_service.get_all_wallets()
    return jsonify(wallets)

@wallet_api.route('/wallet', methods=['POST'])
def create_wallet():
    data = request.get_json()
    wallet = wallet_service.create_wallet(data)
    return jsonify(wallet), 201

# Read
@wallet_api.route('/wallet/<int:id>', methods=['GET'])
def get_wallet(id):
    wallet = wallet_service.get_wallet(id)
    return jsonify(wallet)

# Update
@wallet_api.route('/wallet/<int:id>', methods=['PUT'])
def update_wallet(id):
    data = request.get_json()
    wallet = wallet_service.update_wallet(id, data)
    return jsonify(wallet)

# Delete
@wallet_api.route('/wallet/<int:id>', methods=['DELETE'])
def delete_wallet(id):
    wallet_service.delete_wallet(id)
    return '', 204