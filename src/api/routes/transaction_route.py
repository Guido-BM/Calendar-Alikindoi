from flask import request, jsonify, Blueprint
from flask_cors import CORS
from ..services.transaction_service import TransactionService

transaction_api = Blueprint('transaction_api', __name__)
CORS(transaction_api)

@transaction_api.route('/transactions', methods=['GET'])
def get_all_transactions():
    transactions = TransactionService.get_all_transactions()
    return jsonify([transaction.serialize() for transaction in transactions])

@transaction_api.route('/transactions/<int:transaction_id>', methods=['GET'])
def get_transaction_by_id(transaction_id):
    transaction = TransactionService.get_transaction_by_id(transaction_id)
    if transaction:
        return jsonify(transaction.serialize())
    else:
        return jsonify({"error": "Transaction not found"}), 404

@transaction_api.route('/transactions', methods=['POST'])
def create_transaction():
    data = request.get_json()
    amount = data.get('amount')
    description = data.get('description')
    category = data.get('category')
    type = data.get('type')
    user_id = data.get('user_id')

    if amount and type and user_id:
        new_transaction = TransactionService.create_transaction(amount, description, category, type, user_id)
        return jsonify(new_transaction.serialize()), 201
    else:
        return jsonify({"error": "Amount, type, and user_id are required"}), 400

@transaction_api.route('/transactions/<int:transaction_id>', methods=['PUT'])
def update_transaction(transaction_id):
    transaction = TransactionService.get_transaction_by_id(transaction_id)
    if transaction:
        data = request.get_json()
        amount = data.get('amount')
        description = data.get('description')
        category = data.get('category')
        type = data.get('type')
        user_id = data.get('user_id')

        updated_transaction = TransactionService.update_transaction(transaction, amount, description, category, type, user_id)
        return jsonify(updated_transaction.serialize())
    else:
        return jsonify({"error": "Transaction not found"}), 404

@transaction_api.route('/transactions/<int:transaction_id>', methods=['DELETE'])
def delete_transaction_by_id(transaction_id):
    transaction = TransactionService.get_transaction_by_id(transaction_id)
    if transaction:
        TransactionService.delete_transaction(transaction)
        return jsonify({"message": f"Transaction with ID {transaction_id} deleted successfully"}), 200
    else:
        return jsonify({"error": "Transaction not found"}), 404
