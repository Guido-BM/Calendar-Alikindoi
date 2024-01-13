from ..models.db import db
from ..models.tag import Tag

class TagService:
    @staticmethod
    def get_all_tags():
        return Tag.query.all()

    @staticmethod
    def get_tag_by_id(tag_id):
        return Tag.query.get(tag_id)

    @staticmethod
    def create_tag(tag_type, event_id):
        new_tag = Tag(
            tag_type=tag_type,
            event_id=event_id
        )
        db.session.add(new_tag)
        db.session.commit()
        return new_tag

    @staticmethod
    def update_tag(tag, tag_type, event_id):
        tag.tag_type = tag_type
        tag.event_id = event_id
        db.session.commit()
        return tag

    @staticmethod
    def delete_tag(tag):
        db.session.delete(tag)
        db.session.commit()
        return '', 204
    