from flask import jsonify
from ..models.db import db
from ..models.user import User

class UserService:
    @staticmethod
    def get_all_users():
        return User.query.all()

    @staticmethod
    def get_user_by_id(user_id):
        return User.query.get(user_id)

    @staticmethod
    def create_user(email, password, is_active=True, username=None, location=None):
        new_user = User(email=email, password=password, is_active=is_active, username=username, location=location)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def update_user(user, email, password, is_active, username, location):
        try:
            user.email = email
            user.password = password
            user.is_active = is_active            
            user.username = username
            user.location = location
            db.session.commit()
            return user
        except Exception as e:
            db.session.rollback()
            raise e

    @staticmethod
    def delete_user(user):
        db.session.delete(user)
        db.session.commit()
