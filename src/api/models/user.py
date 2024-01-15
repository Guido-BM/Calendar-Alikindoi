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
            "email": self.email,
            "password": self.password,
            "username": self.username,
            "location": self.location,
            "is_active": self.is_active
        }
