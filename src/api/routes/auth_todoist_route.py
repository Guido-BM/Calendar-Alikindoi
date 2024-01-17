import os
from flask import Blueprint, request, jsonify, redirect, session
import requests
import secrets
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, decode_token
from api.models.user import User
from jwt.exceptions import ExpiredSignatureError, InvalidTokenError

auth_todoist_api = Blueprint('auth_todoist_api', __name__)\

client_id = os.getenv('TODOIST_CLIENT_ID')
client_secret = os.getenv('TODOIST_CLIENT_SECRET')
redirect_uri = os.getenv('TODOIST_REDIRECT_URI')
state = secrets.token_hex(16)
scope = 'task:add,data:read,data:read_write,data:delete,project:delete'


@auth_todoist_api.route('/todoist/auth')
def todoist_auth():
    auth_url = f'https://todoist.com/oauth/authorize?client_id={client_id}&scope={scope}&state={state}'
    return redirect(auth_url)


@auth_todoist_api.route('/todoist/callback', methods=['GET'])
def todoist_callback():
    code = request.args.get('code')
    if not code:
        return 'Error: No code provided', 400
    try:
        data = {
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
            'redirect_uri': redirect_uri,
            'scope': 'task:add,data:read,data:read_write,data:delete,project:delete'
        }
        response = requests.post(
            'https://todoist.com/oauth/access_token', data=data, timeout=5)
        token = response.json()
        print(f"Token response: {token}")  # Print out the entire response
    except requests.exceptions.RequestException as e:
        print(f"Error during fetch_token: {str(e)}")
        return f"Error: {str(e)}", 500
    if token:
        access_token = token.get('access_token')
        print(f"Access token: {access_token}")
    else:
        return "Error: Empty response from Todoist", 500
    return 'Successfully authenticated'
