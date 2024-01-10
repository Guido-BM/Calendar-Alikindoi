from flask import Blueprint, redirect, request
import requests
from requests.auth import HTTPBasicAuth

auth_api = Blueprint('auth_api', __name__)

client_id = 'cc4d7bb11f96452fa6bcd38956c41ba7'
client_secret = 'c5c3b2c440604c97938f4d9d2eac3386'
redirect_uri = 'http://127.0.0.1:3001/callback'


@auth_api.route('/authorize')
def authorize():
    authorization_url = f"https://todoist.com/oauth/authorize?client_id={client_id}&scope=data:read_write&state=secretstring"
    return redirect(authorization_url)


@auth_api.route('/callback')
def callback():
    code = request.args.get('code')
    if not code:
        return 'Error: No code provided', 400
    try:
        token_response = requests.post('https://todoist.com/oauth/access_token', auth=HTTPBasicAuth(client_id, client_secret), data={
            'code': code,
            'redirect_uri': redirect_uri,
            'grant_type': 'authorization_code'
        }, timeout=10)  # Add timeout argument with a value of 10 seconds
        token_response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return f"Error: {str(e)}", 500
    if token_response.text:
        access_token = token_response.json().get('access_token')
    else:
        return "Error: Empty response from Todoist", 500
    return 'Successfully authenticated'
