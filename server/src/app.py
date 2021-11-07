import os

from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS

from .api import bp_scan

load_dotenv()
app = Flask(__name__, static_url_path='',
            static_folder=os.path.join(os.getcwd(), 'uploads'))
cors = CORS(app)
# routes blueprint
app.register_blueprint(bp_scan)
app.config['CORS_HEADERS'] = 'Content-Type'


@ app.route('/', methods=['GET'])
def init():
    return 'covidct server is running'
