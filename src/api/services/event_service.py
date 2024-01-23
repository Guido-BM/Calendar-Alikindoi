from flask import jsonify
from ..models.db import db
from ..models.event import Event

class EventService:
    @staticmethod
    def get_all_events():
        return Event.query.all()

    @staticmethod
    def get_event_by_id(event_id):
        return Event.query.get(event_id)
    
    @staticmethod
    def get_events_by_user(user_id):
        return Event.query.filter_by(user_id=user_id).all()

    @staticmethod
    def check_event_duplicity(title, start_time, end_time):
        existing_event = Event.query.filter_by(title=title, start_time=start_time, end_time=end_time).first()
        return existing_event is not None

    @staticmethod
    def create_event(title, description, start_time, end_time, user_id):
        if EventService.check_event_duplicity(title, start_time, end_time):
            return {"error": "An event with the same title and start/end times already exists"}, 400

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
        event.user_id = user_id
        db.session.commit()
        return event

    @staticmethod
    def delete_event(event):
        db.session.delete(event)
        db.session.commit()
