from .db import db
from .event import Event
from .transaction import Transaction

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    phone_number = db.Column(db.String(80), unique=False, nullable=False)
    username = db.Column(db.String(80), unique=False, nullable=False)
    birth_date = db.Column(db.String(80), unique=False, nullable=False)
    location = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), nullable=False)
    events = db.relationship('Event', backref='user', lazy=True, cascade='all, delete-orphan')
    transactions = db.relationship('Transaction', back_populates='user', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "last_name": self.last_name,
            "phone_number": self.phone_number,
            "username": self.username,
            "birth_date": self.birth_date,
            "location": self.location,
            "is_active": self.is_active
        }
