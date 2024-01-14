from flask import jsonify
from ..models.db import db
from ..models.piggybank import Piggybank

class PiggybankService:
    @staticmethod
    def get_all_piggybanks():
        return Piggybank.query.all()

    @staticmethod
    def get_piggybank_by_id(piggybank_id):
        return Piggybank.query.get(piggybank_id)

    @staticmethod
    def create_piggybank(piggybank_name, piggybank_amount, user_id):
        new_piggybank = Piggybank(
            piggybank_name=piggybank_name,
            piggybank_amount=piggybank_amount,
            user_id=user_id
        )
        db.session.add(new_piggybank)
        db.session.commit()
        return new_piggybank

    @staticmethod
    def update_piggybank(piggybank, piggybank_name, piggybank_amount, user_id):
        piggybank.piggybank_name = piggybank_name
        piggybank.piggybank_amount = piggybank_amount
        piggybank.user_id = user_id
        db.session.commit()
        return piggybank

    @staticmethod
    def delete_piggybank(piggybank):
        db.session.delete(piggybank)
        db.session.commit()