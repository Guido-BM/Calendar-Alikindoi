from .db import db
from datetime import datetime

class Piggybank(db.Model):
    __tablename__ = 'piggybank'

    Goal_ID = db.Column(db.Integer, primary_key=True)
    User_ID = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    Target_Amount = db.Column(db.Numeric, nullable=False)
    Current_Amount = db.Column(db.Numeric, nullable=False)
    Deadline = db.Column(db.Date, nullable=False)

    # Add relationships
    user = db.relationship('User', backref='user', lazy=True)

    def __repr__(self):
        return f'<Piggybank {self.Goal_ID}>'

    def serialize(self):
        return {
            "id": self.id,
            "goal_id": self.goal_id,
            "user_id": self.user_id,
            "target_amount": self.target_amount,
            "current_amount": self.current_amount,
            "deadline": self.deadline,
        }
