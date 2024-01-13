from .db import db
from datetime import datetime


class Event(db.Model):

    __tablename__ = 'event'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    start_time = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    end_time = db.Column(db.DateTime, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    
    # Add relationships
    
    google_calendar_event = db.relationship('GoogleCalendarEvent', backref='user', lazy=True)
    expenses = db.relationship('Expenses', backref='user', lazy=True)
    wallet = db.relationship('Wallet', backref='user', lazy=True)
    piggybanks = db.relationship('Piggybank', backref='user', lazy=True)
    event_tags = db.relationship('EventTag', backref='tag', lazy=True)
    
    def __repr__(self):
        return f'<Event {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "start_time": self.start_time.isoformat(),
            "end_time": self.end_time.isoformat() if self.end_time else None,
            "user_id": self.user_id,
        }
