"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate  # Agrega esta línea
from api.utils import APIException, generate_sitemap
from api.models.db import db
from api.routes.event_route import event_api
from api.routes.user_route import user_api
from flask_sqlalchemy import SQLAlchemy
from api.admin import setup_admin
from api.commands import setup_commands
from api.routes.expenses_route import expense_api
from api.routes.tag_route import tag_api
from api.routes.event_tag_route import event_tag_api
from api.routes.wallet_route import wallet_api
from api.routes.piggybank_route import piggybank_api




ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configuración de la base de datos para SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///app.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Configuración de la extensión Migrate
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(event_api, url_prefix='/api')
app.register_blueprint(user_api, url_prefix='/api')
app.register_blueprint(expense_api, url_prefix='/api')
app.register_blueprint(tag_api, url_prefix='/api')
app.register_blueprint(event_tag_api, url_prefix='/api')
app.register_blueprint(wallet_api, url_prefix='/api')
app.register_blueprint(piggybank_api, url_prefix='/api')



# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
