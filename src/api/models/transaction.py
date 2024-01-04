from .db import db
from sqlalchemy.orm import relationship

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    category = db.Column(db.String(50), nullable=True)
    type = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    user = relationship("User", back_populates="transactions")

    def __repr__(self):
        return f'<Transaction {self.id}>'

    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "description": self.description,
            "category": self.category,
            "type": self.type,
            "user_id": self.user_id,
        }
