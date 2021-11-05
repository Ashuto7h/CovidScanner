import datetime
import os

from flask import request
from flask.blueprints import Blueprint
from flask.json import jsonify

from ...constants import ALLOWED_EXTENSIONS, error_messages

bp_scan = Blueprint('', __name__, url_prefix='')


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@bp_scan.route('/upload', methods=['POST'])
def upload():
    # check if the post request has the file part
    print(request.files,request.body)
    if 'file' not in request.files:
        return jsonify(error=error_messages('NoFilesRecieved'))

    file = request.files['file']
    # if user does not select file, browser also
    # submit an empty part without filename
    if file.filename == '':
        print('No selected file')
        return jsonify(error=error_messages('NoFilesRecieved'))
    if file and allowed_file(file.filename):
        filename = str(datetime.datetime.now().timestamp())
        file.save(os.path.join('uploads', filename))
        return jsonify(file_name=filename, upload=True)

    return jsonify(error=error_messages('BadRequest'))

