import { createUseStyles } from 'react-jss';
import { Typography } from '@mui/material';
import FadeIn from '../components/FadeIn';
import UploadCard from '../components/UploadCard';
import PredictCard from '../components/PredictCard';

const useLandStyles = createUseStyles({
    arrowRightTop: {
        height: '75px',
        left: '-60px',
        position: 'relative',
        top: '275px',
        transform: 'rotate(142deg)',
        width: '100px'
    },
    arrowTopRight: {
        height: '75px',
        left: '-60px',
        position: 'relative',
        top: '275px',
        transform: 'rotate(184deg)',
        width: '100px'
    },
    ctIllustration: {
        background: 'white',
        borderBlock: '4px',
        boxShadow: '0 0 8px rgb(0 0 0 / 13%)',
        height: '240px',
        marginLeft: '20px',
        marginTop: '20px',
        padding: '10px',
        transform: 'rotateZ(345deg)',
        width: '400px'
    },
    sec1: {
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        marginTop: '40px',
        width: '100%'
    },
    sec1CenterDiv: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-evenly'
    },
    sec2: { marginTop: '260px' },
    uploadCard: {


        backgroundColor: 'transparent !important',


borderRadius: '15px !important',
        // boxShadow:
//     '0px 10px 30px 5px rgb(0 0 0 / 20%), 0px 7px 18px 2px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%) !important',
left: '-60px',
        position: 'relative',
        top: '195px'
    }
});

const Land = () => {
    const classes = useLandStyles();
    return (
        <>
            <FadeIn className={classes.sec1}>
                <div className={classes.sec1CenterDiv}>
                    <img
                        alt='ct illustration'
                        className={classes.ctIllustration}
                        src='ct_illustration.png'
                    />

                    <img
                        alt='arrow_curved'
                        className={classes.arrowTopRight}
                        src='arrow_curve.png'
                    />

                    <UploadCard className={classes.uploadCard} disabled />

                    <img
                        alt='arrow_curved'
                        className={classes.arrowRightTop}
                        src='arrow_curve.png'
                    />

                    <PredictCard />
                </div>
            </FadeIn>

            <FadeIn className={classes.sec2}>
                <Typography textAlign='center' variant='h1'>
                    Get Covid Predictions in easy steps
                </Typography>
            </FadeIn>

            <FadeIn className={classes.sec2}>
                <Typography textAlign='center' variant='h1'>
                    Upload Multiple Files (max : 50)
                </Typography>
            </FadeIn>

            <FadeIn className={classes.sec2}>
                <Typography textAlign='center' variant='h1'>
                    Upload Scans in any format
                </Typography>
            </FadeIn>
        </>
    );
};

export default Land;
