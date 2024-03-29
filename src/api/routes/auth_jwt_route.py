from flask import Blueprint, request, jsonify, redirect, url_for
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models.user import User

auth_jwt_api = Blueprint('auth_jwt_api', __name__)
CORS(auth_jwt_api)



@auth_jwt_api.route('/login', methods=['POST', 'GET'])
def create_token():
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        return jsonify({"msg": "Bad email or password"}), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({"token": access_token, "user_id": user.id})

@auth_jwt_api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Accede a la identidad del usuario actual con get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    # Añade esta comprobación
    if user is None:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({"id": user.id, "username": user.email}), 200

@auth_jwt_api.route("/identify", methods=['POST', 'GET'])
@jwt_required()
def identify():
    current_user_id = get_jwt_identity()
    user = User.query.filter_by(id=current_user_id).first()

    if user is None:
        return jsonify({"msg": "User not found"}), 404

    return jsonify({"id": user.id}), 200
