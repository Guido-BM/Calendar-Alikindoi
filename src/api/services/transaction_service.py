from flask import jsonify
from ..models.db import db
from ..models.transaction import Transaction

class TransactionService:
    @staticmethod
    def get_all_transactions():
        return Transaction.query.all()

    @staticmethod
    def get_transaction_by_id(transaction_id):
        return Transaction.query.get(transaction_id)

    @staticmethod
    def create_transaction(amount, description, category, type, user_id):
        new_transaction = Transaction(
            amount=amount,
            description=description,
            category=category,
            type=type,
            user_id=user_id
        )
        db.session.add(new_transaction)
        db.session.commit()
        return new_transaction

    @staticmethod
    def update_transaction(transaction, amount, description, category, type, user_id):
        # Actualiza los valores de la transacción
        transaction.amount = amount
        transaction.description = description
        transaction.category = category
        transaction.type = type
        transaction.user_id = user_id

        db.session.commit()
        return transaction

    @staticmethod
    def delete_transaction(transaction):
        db.session.delete(transaction)
        db.session.commit()
