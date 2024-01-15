from eralchemy2 import render_er
from .db import db

class Diagram:
    @staticmethod
    def draw_diagram():
        try:
            result = render_er(db.Model, 'diagram.png')
            
            print("Success! Check the diagram.png file")
        except Exception as e:
            print("There was a problem genering the diagram")
            raise e