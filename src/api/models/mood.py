from sqlalchemy import Enum
from .db import db
from sqlalchemy.orm import relationship

class MoodType(Enum):
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



class Mood(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    mood_type = db.Column(Enum(MoodType.HAPPY, MoodType.SAD, MoodType.ANGRY, MoodType.SURPRISED, MoodType.NEUTRAL, MoodType.RELAXED, MoodType.EXHAUSTED, MoodType.TIRED, MoodType.MOTIVATED, MoodType.THANKFUL, MoodType.STRESSED, MoodType.LOST, MoodType.FRIGHTENED, MoodType.EXCITED, MoodType.CONFUSED), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    event = relationship("Event", back_populates="mood")



    def to_dict(self):
        return {
            'id': self.id,
            'mood_type': self.mood_type.value,
            'event_id': self.event_id
        }
