from flask import Blueprint, redirect, request
import requests

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
        data = {
            'client_id': client_id,
            'client_secret': client_secret,
            'code': code,
            'redirect_uri': redirect_uri
        }
        response = requests.post(
            'https://todoist.com/oauth/access_token', data=data)
        token = response.json()
        print(f"Token response: {token}")  # Print out the entire response
    except Exception as e:
        print(f"Error during fetch_token: {str(e)}")
        return f"Error: {str(e)}", 500
    if token:
        access_token = token.get('access_token')
        print(f"Access token: {access_token}")
    else:
        return "Error: Empty response from Todoist", 500
    return 'Successfully authenticated'
