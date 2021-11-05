from flask import Flask
from dotenv import load_dotenv

try:
    from .api.v1.scan import bp_scan
except ImportError:
    from src.api.v1.scan import bp_scan

load_dotenv()
app = Flask(__name__)

# routes blueprint
app.register_blueprint(bp_scan)

@app.route('/',methods=['GET'])
def init():
    return 'covidct server is running'