from .db import db
from datetime import datetime

class EventTag(db.Model):
    __tablename__ = 'event_tag'
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)
    
    # Add relationships
    event = db.relationship('Event', backref='event', lazy=True)
    tag = db.relationship('Tag', backref='tag', lazy=True)
    
    def __repr__(self):
        return f'<EventTag {self.id}>'
    def serialize(self):
        return {
            "id": self.id,
            "event_id": self.event_id,
            "tag_id": self.tag_id,
        }
        