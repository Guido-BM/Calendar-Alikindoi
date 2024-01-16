import os
from flask import Blueprint, request, jsonify, redirect, session
import requests
import secrets
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, decode_token
from api.models.user import User
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

auth_todoist_api = Blueprint('auth_todoist_api', __name__)


@auth_todoist_api.route('/todoist/auth')
def todoist_auth():
    client_id = 'cc4d7bb11f96452fa6bcd38956c41ba7'
    scope = 'task:add,data:read,data:read_write,data:delete,project:delete'
    state = secrets.token_hex(16)  # Generate a CSRF token
    auth_url = f'https://todoist.com/oauth/authorize?client_id={client_id}&scope={scope}&state={state}'
    return redirect(auth_url)


@auth_todoist_api.route('/todoist/callback')
def todoist_callback():
    code = request.args.get('code')
    state = request.args.get('state')

    # Verify the state parameter
    if state != session.get('state'):
        return 'State parameter does not match', 400

    client_id = os.getenv('cc4d7bb11f96452fa6bcd38956c41ba7')
    client_secret = os.getenv('c5c3b2c440604c97938f4d9d2eac3386')
    redirect_uri = os.getenv('http://127.0.0.1:3001/todoist/callback')

    data = {
        'client_id': client_id,
        'client_secret': client_secret,
        'code': code,
        'redirect_uri': redirect_uri,
        'scope': 'task:add,data:read,data:read_write,data:delete,project:delete'
    }

    response = requests.post(
        'https://todoist.com/oauth/access_token', data=data)
    if response.status_code != 200:
        print(f"Error: {response.status_code}, {response.text}")
    else:
        token = response.json().get('access_token')
        # Store the token in the session
        session['access_token'] = token

    return 'Successfully authenticated'
