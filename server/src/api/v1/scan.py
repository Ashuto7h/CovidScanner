import datetime
import os

from flask import request
from flask.blueprints import Blueprint
from flask.json import jsonify

from ...constants import ALLOWED_EXTENSIONS, error_messages
from ...model import predict

bp_scan = Blueprint('', __name__, url_prefix='')


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@bp_scan.route('/getbatch', methods=['GET'])
def new_batch():
    batch_name = f'b_{int(datetime.datetime.now().timestamp())}'
    os.mkdir(os.path.join('uploads', batch_name))


@bp_scan.route('/upload', methods=['POST'])
def upload():
    status = []
    files = request.files
    batch_id = f'b_{int(datetime.datetime.now().timestamp())}'
    os.makedirs(os.path.join('uploads', batch_id))

    for file in files.to_dict():
        file_name = files[file].filename
        if not file_name:
            status.append(
                {'filename': file_name, 'error': error_messages('NoFilesRecieved')})
        if allowed_file(file_name):
            files[file].save(os.path.join('uploads', batch_id, file_name or str(
                datetime.datetime.now().timestamp())))
        else:
            status.append(
                {'filename': file_name,
                 'error': error_messages('UnsupportedFormat',
                                         f"(.{file_name.split('.')[-1]})" if file_name else None)})
    x = predict(batch_id)
    for pred in x:
        status.append(pred)
    return jsonify(status=status, batchId=batch_id)


@bp_scan.route('/predict/<batch_id>', methods=['GET'])
def get_predictions(batch_id):
    pass
