import os

import numpy
from tensorflow.keras import models
from tensorflow.keras.preprocessing import image

from ..constants.main import SUPPORTED_IMAGE_FORMATS, error_messages

PATH = os.path.join(os.getcwd(), 'src', 'model', 'custom_cnn.h5')
print('model_path', PATH)
COVID_MODEL = models.load_model(PATH)
print(COVID_MODEL.summary())


def predict(batch_id='b_01'):
    dir_ = os.path.join(os.getcwd(), f'uploads/{batch_id}')
    files = os.listdir(dir_)
    tester = []
    predictions = []
    for file in files:
        pred = {'file': file, 'predictions': {}}
        if file.split('.')[-1] in SUPPORTED_IMAGE_FORMATS:
            try:
                img = image.load_img(
                    f'{dir_}/{file}',
                    color_mode='rgb',
                    target_size=(256, 256),
                    interpolation='nearest')
                img_array = image.img_to_array(img)
                print(img_array)
                tester.append(img_array)
            except Exception as e:
                print(e)
            tester = numpy.array(tester)/255
            print('tester', tester)
            result = COVID_MODEL.predict(tester)
            pred['predictions']['ncovid'] = round(result[0][0]*100, 2)
            pred['predictions']['covid'] = round(result[0][1]*100, 2)
            pred['predictions']['other'] = round(result[0][2]*100, 2)
        else:
            pred['error'] = error_messages('UnsupportedFormat')
        predictions.append(pred)
    print(predictions)
