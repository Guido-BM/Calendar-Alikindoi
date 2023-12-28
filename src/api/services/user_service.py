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
    def create_user(email, password, is_active=True, name=None, last_name=None, phone_number=None, username=None, birth_date=None, location=None):
        new_user = User(email=email, password=password, is_active=is_active, name=name, last_name=last_name, phone_number=phone_number, username=username, birth_date=birth_date, location=location)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def update_user(user, email, password, is_active, name, last_name, phone_number, username, birth_date, location):
        try:
            user.email = email
            # user.password = password
            user.is_active = is_active
            user.name = name
            user.last_name = last_name
            user.phone_number = phone_number
            user.username = username
            user.birth_date = birth_date
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