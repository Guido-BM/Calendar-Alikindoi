from .db import db

from cryptography.fernet import Fernet


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    location = db.Column(db.Text, nullable=True)
    is_active = db.Column(db.Boolean(), nullable=False)

    # Add relationships
    events = db.relationship('Event', backref='user', lazy=True)
    GoogleCalendarEvent = db.relationship(
        'GoogleCalendarEvent', backref='user', lazy=True)
    expenses = db.relationship('Expenses', backref='user', lazy=True)
    wallets = db.relationship('Wallet', backref='user', lazy=True)
    piggybanks = db.relationship('Piggybank', backref='user', lazy=True)
    tasks = db.relationship('Task', backref='user', lazy=True)

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

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # do not serialize the password, its a security breach
            # "password": self.password,
            "location": self.location,
            "is_active": self.is_active,
            "events": [event.serialize() for event in self.events],
            "google_calendar_events": [google_calendar_event.serialize() for google_calendar_event in self.google_calendar_events],
            "expenses": [expense.serialize() for expense in self.expenses],
            "wallets": [wallet.serialize() for wallet in self.wallets],
            "piggybanks": [piggybank.serialize() for piggybank in self.piggybanks],
            "tasks": [task.serialize() for task in self.tasks]
        }
