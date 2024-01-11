from .db import db
from .event import Event
from .transaction import Transaction
from cryptography.fernet import Fernet



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
    events = db.relationship('Event', backref='user',
                             lazy=True, cascade='all, delete-orphan')
    transactions = db.relationship(
        'Transaction', back_populates='user', lazy=True, cascade='all, delete-orphan')
    access_token = db.Column(db.String(255), nullable=True)
<<<<<<< HEAD
=======

    @staticmethod
    # Generates a key for encrypting the access token
    def generate_key():
        return Fernet.generate_key()
    # Encrypts the access token

    def encrypt_access_token(self, access_token, key):
        f = Fernet(key)
        self.access_token = f.encrypt(access_token.encode()).decode()
    # Decrypts the access token

    def decrypt_access_token(self, key):
        f = Fernet(key)
        decrypted_token = f.decrypt(self.access_token.encode())
        return decrypted_token.decode()
    # Returns the access token

    def get_access_token(self, key):
        return self.decrypt_access_token(key)
    # Returns the access token encrypted

    def get_encrypted_access_token(self):
        return self.access_token
>>>>>>> e9bd19ee6237193048055832b6dc6ed79446a66c

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
