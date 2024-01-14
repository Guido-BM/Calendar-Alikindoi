
import os
from flask_admin import Admin
from .models.db import db
from .models.user import User
from .models.event import Event
from .models.expenses import Expenses
from .models.event_tag import EventTag
from .models.google_calendar_event import GoogleCalendarEvent
from .models.piggybank import Piggybank
from .models.wallet import Wallet
from .models.tag import Tag
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')


    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Event, db.session))
    admin.add_view(ModelView(Expenses, db.session))
    admin.add_view(ModelView(Tag, db.session))
    admin.add_view(ModelView(EventTag, db.session))
    admin.add_view(ModelView(GoogleCalendarEvent, db.session))
    admin.add_view(ModelView(Piggybank, db.session))
    admin.add_view(ModelView(Wallet, db.session))
    

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
