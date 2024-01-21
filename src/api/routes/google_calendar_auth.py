import datetime
import os.path

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google_auth_oauthlib.flow import Flow
from flask_cors import CORS
from flask import Flask, jsonify, redirect
from flask import Blueprint, request
import pickle

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
credentials = '../../../credentials.json'

get_google_calendar_auth_api = Blueprint('get_google_calendar_auth_api', __name__)
CORS(get_google_calendar_auth_api)

@get_google_calendar_auth_api.route('/callback')
def callback():
    code = request.args.get('code')
    if not code:
        return 'Error: No code provided', 400
    try:
        flow = Flow.from_client_secrets_file(
            credentials,
            scopes=SCOPES,
            redirect_uri='http://localhost:5000/callback')

        flow.fetch_token(code=code)

        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(flow.credentials, token)

        access_token = flow.credentials.token
        print(f"Access token: {access_token}")
        return redirect(f"http://localhost:3000/home?accessToken={access_token}", code=302)
    except Exception as e:
        print(f"Error during fetch_token: {str(e)}")
        return f"Error: {str(e)}", 500

@get_google_calendar_auth_api.route('/authorize')
def authorize():
    flow = Flow.from_client_secrets_file(
        credentials,
        scopes=SCOPES,
        redirect_uri='http://localhost:5000/callback')

    authorization_url, state = flow.authorization_url(
        'https://accounts.google.com/o/oauth2/auth',
        access_type='offline',
        include_granted_scopes='true')

    return redirect(authorization_url)

@get_google_calendar_auth_api.route('/google_calendar_auth', methods=['GET'])
def get_google_calendar_auth():
    """Shows basic usage of the Google Calendar API.
    Prints the start and name of the next 10 events on the user's calendar.
    """
    creds = None

    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)

    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            return redirect('/authorize')

    return jsonify({"creds": creds.to_json()})

    # service = build('calendar', 'v3', credentials=creds)

    # # Call the Calendar API
    # now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time