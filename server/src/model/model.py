import os

import numpy
from flask import json
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

from ..constants.main import SUPPORTED_IMAGE_FORMATS, error_messages

PATH = os.path.join(os.getcwd(), 'src', 'model', 'custom_cnn.h5')
COVID_MODEL = load_model(PATH)


def predict(batch_id='b_01'):
    dir_ = os.path.join(os.getcwd(), f'uploads/{batch_id}')
    files = os.listdir(dir_)
    print('files', files)
    predictions = []
    for file in files:
        tester = []
        pred = {'filename': file, 'predictions': {}}
        if file.split('.')[-1] in SUPPORTED_IMAGE_FORMATS:
            img = image.load_img(
                f'{dir_}/{file}',
                color_mode='rgb',
                target_size=(256, 256),
                interpolation='nearest')
            img_array = image.img_to_array(img)
            print(img_array)
            tester.append(img_array)
            test = numpy.array(tester)/255
            print('test_batch', test)
            result = COVID_MODEL.predict(test)
            pred['predictions']['ncovid'] = round(result[0][0]*100, 3)
            pred['predictions']['covid'] = round(result[0][1]*100, 3)
            pred['predictions']['other'] = round(result[0][2]*100, 3)
        else:
            pred['error'] = error_messages('UnsupportedFormat')
        predictions.append(pred)
    print(predictions)
    with open(os.path.join('uploads', batch_id, 'predict.json'), 'w', encoding='utf-8') as f:
        json.dump(predictions, f, indent=4)
    return predictions
