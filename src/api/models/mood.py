from sqlalchemy import Enum
from .db import db

class EmotionType(Enum):
    HAPPY = "happy"
    SAD = "sad"
    ANGRY = "angry"
    SURPRISED = "surprised"
    NEUTRAL = "neutral"
    RELAXED = "relaxed"
    EXHAUSTED = "exhausted"
    TIRED = "tired"
    MOTIVATED = "motivated"
    THANKFUL = "thankful"
    STRESSED = "stressed"
    LOST = "lost"
    FRIGHTENED = "frightened"
    EXCITED = "excited"
    CONFUSED = "confused"
    




class Emotion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    emotion_type = db.Column(Enum(EmotionType), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)

    def __repr__(self):
        return f'<Emotion {self.emotion_type}>'