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
    user = db.relationship('User', backref='piggybanks', lazy=True)  # Changed backref to 'piggybanks'

    def __repr__(self):
        return f'<Piggybank {self.Goal_ID}>'

    def serialize(self):  # This should be an instance method, not a standalone function
        return {
            "goal_id": self.Goal_ID,
            "user_id": self.User_ID,
            "target_amount": str(self.Target_Amount),
            "current_amount": str(self.Current_Amount),
            "deadline": self.Deadline.isoformat(),
        }