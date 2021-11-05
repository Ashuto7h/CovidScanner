from typing import Literal, Optional


ALLOWED_EXTENSIONS = ['dcm', 'png', 'jpg', 'jpeg', 'nii','webp']
SUPPORTED_IMAGE_FORMATS = ['png', 'jpg', 'jpeg', 'webp']
ErrorKeys = Literal['UnsupportedFormat', 'NoFilesRecieved', 'BadRequest']


def error_messages(error_type: ErrorKeys, suffix: Optional[str] = None):
    errors: dict[ErrorKeys, str] = {
        'UnsupportedFormat': f'Recieved unsupported file format {suffix}',
        'NoFilesRecieved': 'No Files Received. Please upload atleast one file',
        'BadRequest': 'Bad Request'
    }
    return errors[error_type]
