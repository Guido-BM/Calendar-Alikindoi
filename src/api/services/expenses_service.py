from flask import jsonify
from ..models.db import db
from ..models.expenses import Expenses
from datetime import datetime

class ExpenseService:
    @staticmethod
    def get_all_expenses():
        return Expenses.query.all()

    @staticmethod
    def get_expense_by_id(expense_id):
        return Expenses.query.get(expense_id)

    @staticmethod
    def create_expense(amount, description, user_id, date=None):
        # Obtén la fecha de hoy
        date = datetime.today()
        
        new_expense = Expenses(
            user_id=user_id,
            amount=amount,
            description=description,
            date=date
        )
        db.session.add(new_expense)
        db.session.commit()
        return new_expense

    @staticmethod
    def update_expense(expense, amount, description, category, type, user_id):
        # Actualiza los valores de la transacción
        expense.amount = amount
        expense.description = description
        expense.category = category
        expense.type = type
        expense.user_id = user_id

        db.session.commit()
        return expense

    @staticmethod
    def delete_expense(expense):
        db.session.delete(expense)
        db.session.commit()
