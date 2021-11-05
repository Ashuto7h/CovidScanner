import { createUseStyles } from 'react-jss';
import { Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { CloudUploadTwoTone } from '@mui/icons-material';
import FadeIn from '../components/FadeIn';
import UploadCard from '../components/UploadCard';
import PredictCard from '../components/PredictCard';
import { UploadIcon } from '../assets';

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
    gradientText: {
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        background: 'linear-gradient(180deg, rgba(37,123,224,1) 10%, rgba(100,198,247,1) 90%)',
        textShadow: '0px 7px 8px #01073940'
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
        justifyContent: 'space-evenly',
        width: '100%'
    },
    sec2: { marginTop: '400px' },
    sec3: { marginTop: '200px' },
    sec4: { marginTop: '200px' },
    upload2Tone: { height: '200px', width: '200px' },
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
    const steps = ['Get A CT Scan', 'Upload the CT Scan', 'Get Covid Predictions'];
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
                <Grid container rowGap={5}>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.gradientText}
                            fontWeight='bold'
                            sx={{ color: '#04123aab' }}
                            textAlign='center'
                            variant='h4'>
                            Get Covid Predictions In Easy Steps
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Stepper activeStep={1} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Grid>
                </Grid>
            </FadeIn>

            <FadeIn className={classes.sec3}>
                <Grid container rowGap={2}>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.gradientText}
                            fontWeight='bold'
                            textAlign='center'
                            variant='h4'>
                            Upload Any Amount of Files
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography fontWeight='bold' textAlign='center' variant='h4'>
                            <UploadIcon className={classes.upload2Tone} />
                        </Typography>
                    </Grid>
                </Grid>
            </FadeIn>

            <FadeIn className={classes.sec4}>
                <Typography
                    className={classes.gradientText}
                    fontWeight='bold'
                    textAlign='center'
                    variant='h4'>
                    Upload Scans in any format
                </Typography>
            </FadeIn>
        </>
    );
};

export default Land;
