import { CardContent, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { Fragment } from 'react';
import { createUseStyles } from 'react-jss';
import { LABELS } from '../constants';

const usePredictCardStyles = createUseStyles({
    greenProgress: {
        '& span': { backgroundColor: 'lime !important' },
        backgroundColor: '#a3e1a375 !important'
    },
    landPaper: {
        height: '250px',
        left: '-105px',
        position: 'relative',
        top: '10px',
        transform: 'rotate(19deg)',
        width: '280px'
    },
    orangeProgress: {
        '& span': { backgroundColor: 'orange !important' },
        backgroundColor: '#ffa50054 !important'
    },
    redProgress: {
        '& span': { backgroundColor: 'orangered !important' },
        backgroundColor: '#ff450061 !important'
    },
    tryPaper: { marginLeft: '10px', maxWidth: '250px', padding: '4px' }
});

const PredictCard = ({ predict }) => {
    const classes = usePredictCardStyles();
    const getPredictions = (predObject) => {
        if (!predObject) return predObject;
        const x = Object.entries(predObject).sort((a, b) => b[1] - a[1]);
        const preds = [];
        const classnames = {
            covid: classes.redProgress,
            ncovid: classes.greenProgress,
            other: classes.orangeProgress
        };
        for (const pred of x) {
            preds.push({ class: classnames[pred[0]], name: LABELS[pred[0]], percent: pred[1] });
        }
        return preds;
    };

    const predictions = getPredictions(predict) ?? [
        { class: classes.greenProgress, name: 'Non Covid', percent: 83.7 },
        { class: classes.redProgress, name: 'Covid', percent: 11.2 },
        { class: classes.orangeProgress, name: 'Pneumonia/Other', percent: 5.1 }
    ];

    return (
        <Paper
            className={!predict ? classes.landPaper : classes.tryPaper}
            elevation={predict ? 0 : 4}>
            <CardContent>
                <Typography
                    gutterBottom
                    sx={{
                        fontSize: '18px',
                        fontWeight: 'bold'
                    }}
                    textAlign='center'>
                    Predictions
                </Typography>

                <Grid container spacing={2}>
                    {predictions.map((pred) => (
                        <Fragment key={pred.name}>
                            <Grid item xs={8}>
                                {pred.name}
                            </Grid>

                            <Grid item textAlign='end' xs={4}>
                                {pred.percent}%
                            </Grid>

                            <Grid item xs={12}>
                                <LinearProgress
                                    className={pred.class}
                                    value={pred.percent}
                                    variant='determinate'
                                />
                            </Grid>
                        </Fragment>
                    ))}
                </Grid>
            </CardContent>
        </Paper>
    );
};
export default PredictCard;
