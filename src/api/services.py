from flask import jsonify
from .models.db import db
from .models.user import User
from .models.event import Event

class UserService:
    @staticmethod
    def get_all_users():
        return User.query.all()

    @staticmethod
    def get_user_by_id(user_id):
        return User.query.get(user_id)

    @staticmethod
    def create_user(email, password, is_active=True, name=None, population=None):
        new_user = User(email=email, password=password, is_active=is_active, name=name, population=population)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def update_user(user, email, password, is_active, name, population):
        user.email = email
        user.password = password
        user.is_active = is_active
        user.name = name
        user.population = population
        db.session.commit()
        return user

    @staticmethod
    def delete_user(user):
        db.session.delete(user)
        db.session.commit()

class EventService:
    @staticmethod
    def get_all_events():
        return Event.query.all()

    @staticmethod
    def get_event_by_id(event_id):
        return Event.query.get(event_id)

    @staticmethod
    def create_event(title, description, start_time, end_time, user_id):
        new_event = Event(
        title=title,
        description=description,
        start_time=start_time,
        end_time=end_time,
        user_id=user_id
    )
        db.session.add(new_event)
        db.session.commit()
        return new_event


    @staticmethod
    def update_event(event, title, description, start_time, end_time, user_id):
        event.title = title
        event.description = description
        event.start_time = start_time
        event.end_time = end_time
        event.user_id = user_id  # Actualiza el user_id
        db.session.commit()
        return event

    @staticmethod
    def delete_event(event):
        db.session.delete(event)
        db.session.commit()

