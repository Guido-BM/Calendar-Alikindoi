from .db import db
from sqlalchemy.orm import relationship



class Expenses(db.Model):
    __tablename__ = 'expenses'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    amount = db.Column(db.Numeric, nullable=False)
    description = db.Column(db.Text, nullable=True)
    date = db.Column(db.Date, nullable=False)
    category = db.Column(db.String(255), nullable=True)
    source_account = db.Column(db.Text, nullable=True)
    
    # Add relationships
    user = db.relationship('User', backref='user', lazy=True)
    # wallet = db.relationship('Wallet', backref='wallet', lazy=True)
    
    def __repr__(self):
        return f'<Expenses {self.id}>'
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "amount": self.amount,
            "description": self.description,
            "date": self.date,
            "category": self.category,
            "source_account": self.source_account,
        }
