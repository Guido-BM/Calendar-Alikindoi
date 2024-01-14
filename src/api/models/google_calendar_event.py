from .db import db
from datetime import datetime

class GoogleCalendarEvent(db.Model):
    __tablename__ = 'google_calendar_event'

    id = db.Column(db.Integer, primary_key=True)
    User_ID = db.Column(db.Integer, db.ForeignKey('user.id'))
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'))  
    Title = db.Column(db.String(255))
    Description = db.Column(db.Text)
    Start_DateTime = db.Column(db.DateTime)
    End_DateTime = db.Column(db.DateTime)
    Sync_Status = db.Column(db.Boolean)
    Last_Sync_Time = db.Column(db.DateTime)

    def __repr__(self):
        return f'<GoogleCalendarEvent {self.Title}>'

    def serialize(self):
        return {
            "id": self.GoogleEvent_ID,
            "title": self.Title,
            "user_id": self.User_ID,
            "start_time": self.Start_DateTime.isoformat(),
            "end_time": self.End_DateTime.isoformat() if self.End_DateTime else None,
            "event_id": self.Event_ID,
            "description": self.Description,
            "sync_status": self.Sync_Status,
            "last_sync_time": self.Last_Sync_Time.isoformat(),
        }