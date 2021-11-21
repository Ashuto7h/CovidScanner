import { createUseStyles } from 'react-jss';
import { COLORS } from '../constants';

const useCustomAppBarStyles = createUseStyles({
    appBar: {
        background: `${COLORS.appBarBackground} !important`
    },
    covidLogo: {
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        background: 'linear-gradient(180deg, rgba(37,123,224,1) 10%, rgba(100,198,247,1) 90%)',
        color: COLORS.covidColor,
        fontFamily: "'Kanit', sans-serif",
        fontSize: '22px',
        fontWeight: 'bold',
        letterSpacing: '0.06em',
        marginRight: '5px'
    },
    navItem: {
        color: `${COLORS.scannerColor} !important`,
        fontWeight: 'bold !important',
        marginLeft: 'auto',
        marginRight: 0
    },
    scannerLogo: {
        color: COLORS.scannerColor,
        fontFamily: "'Kanit', sans-serif",
        fontSize: '22px',
        letterSpacing: '0.03em',
        marginRight: '5px'
    }
});
export default useCustomAppBarStyles;
