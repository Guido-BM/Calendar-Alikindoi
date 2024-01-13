from .db import db
from datetime import datetime

class GoogleCalendarEvent(db.Model):
    __tablename__ = 'google_calendar_event'

    GoogleEvent_ID = db.Column(db.Integer, primary_key=True)
    User_ID = db.Column(db.Integer, db.ForeignKey('users.User_ID'))
    Event_ID = db.Column(db.Integer, db.ForeignKey('events.Event_ID'))
    Title = db.Column(db.String(255))
    Description = db.Column(db.Text)
    Start_DateTime = db.Column(db.DateTime)
    End_DateTime = db.Column(db.DateTime)
    Sync_Status = db.Column(db.Boolean)
    Last_Sync_Time = db.Column(db.DateTime)

    # Add relationships
    events = db.relationship('Event', backref='user', lazy=True)
    User_ID = db.relationship('User', backref='user', lazy=True)

    

    def __repr__(self):
        return f'<GoogleCalendarEvent {self.title}>'

    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "start_time": self.start_time.isoformat(),
            "end_time": self.end_time.isoformat() if self.end_time else None,
            "sync_status": self.sync_status,
            "last_sync_time": self.last_sync_time.isoformat(),
            "user_id": self.user_id,
            "event_id": self.event_id,
        }