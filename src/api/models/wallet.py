from .db import db
from datetime import datetime


class Wallet(db.Model):
      __tablename__ = 'wallet'
      id = db.Column(db.Integer, primary_key=True)
      user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
      balance = db.Column(db.Numeric, nullable=False)

      def __repr__(self):
        return f'<Wallet {self.id}>'

      def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "balance": self.balance,
        }