from flask import jsonify
from ..models.db import db
from ..models.mood import Mood

class MoodService:
    @staticmethod
    def get_all_moods():
        return Mood.query.all()

    @staticmethod
    def get_mood_by_id(mood_id):
        return Mood.query.get(mood_id)

    @staticmethod
    def create_mood(mood_type, event_id):
        new_mood = Mood(
            mood_type=mood_type,
            event_id=event_id
        )
        db.session.add(new_mood)
        db.session.commit()
        return new_mood

    @staticmethod
    def update_mood(mood, mood_type, event_id):
        mood.emotion_type = mood_type
        mood.event_id = event_id
        db.session.commit()
        return mood

    @staticmethod
    def delete_mood(mood):
        db.session.delete(mood)
        db.session.commit()