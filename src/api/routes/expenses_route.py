from flask import request, jsonify, Blueprint
from flask_cors import CORS
from ..services.expenses_service import ExpenseService
from ..services.user_service import UserService
from datetime import datetime

expense_api = Blueprint('expense_api', __name__)
CORS(expense_api)

@expense_api.route('/expenses', methods=['GET'])
def get_all_expenses():
    expenses = ExpenseService.get_all_expenses()
    return jsonify([expense.serialize() for expense in expenses])

@expense_api.route('/expenses/<int:expense_id>', methods=['GET'])
def get_expense_by_id(expense_id):
    expense = ExpenseService.get_expense_by_id(expense_id)
    if expense:
        return jsonify(expense.serialize())
    else:
        return jsonify({"error": "Expense not found"}), 404



@expense_api.route('/expenses/<int:expense_id>', methods=['PUT'])
def update_expense(expense_id):
    expense = ExpenseService.get_expense_by_id(expense_id)
    if expense:
        data = request.get_json()
        amount = data.get('amount')
        description = data.get('description')
        category = data.get('category')
        type = data.get('type')
        user_id = data.get('user_id')

        updated_expense = ExpenseService.update_expense(expense, amount, description, category, type, user_id)
        return jsonify(updated_expense.serialize())
    else:
        return jsonify({"error": "Expense not found"}), 404

@expense_api.route('/expenses/<int:expense_id>', methods=['DELETE'])
def delete_expense_by_id(expense_id):
    expense = ExpenseService.get_expense_by_id(expense_id)
    if expense:
        ExpenseService.delete_expense(expense)
        return jsonify({"message": f"Expense with ID {expense_id} deleted successfully"}), 200
    else:
        return jsonify({"error": "Expense not found"}), 404




@expense_api.route('/expenses/user/<int:user_id>', methods=['GET'])
def get_expenses_by_user_id(user_id):
    expenses = ExpenseService.get_expenses_by_user_id(user_id)
    if expenses:
        return jsonify([expense.serialize() for expense in expenses])
    else:
        return jsonify({"error": "User not found"}), 404

@expense_api.route('/users/<int:user_id>/expenses', methods=['POST'])
def create_expense_for_user(user_id):
    data = request.get_json()
    amount = data.get('amount')
    date = data.get('date')
    description = data.get('description')

    if amount and date and description:
        new_expense = ExpenseService.create_expense(amount, date, description, user_id)
        return jsonify(new_expense.serialize()), 201
    else:
        return jsonify({"error": "Amount, date, and description are required"}), 400