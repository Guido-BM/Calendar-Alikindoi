from .db import db
from datetime import datetime

class Tag(db.Model):
    __tablename__ = 'tag'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    
    # Add relationships
    # event_tags = db.relationship('EventTag', backref='tag', lazy=True)
    
    def __repr__(self):
        return f'<Tag {self.name}>'
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }