import { COLORS } from './theme';

const server = 'https://covidct.herokuapp.com';
const local = 'http://127.0.0.1:5000';

export const ALLOWED_EXTENSIONS = ['dcm', 'png', 'jpg', 'jpeg', 'nii', 'webp'];
export const LABELS = { covid: 'Covid', ncovid: 'Non Covid', other: 'Pneumonia/Other' };
export const API_URL = local;
export { COLORS };
