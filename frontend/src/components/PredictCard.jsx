import { Card, CardContent, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { Fragment } from 'react';
import { createUseStyles } from 'react-jss';
import FadeIn from './FadeIn';

const usePredictCardStyles = createUseStyles({
    greenProgress: { '& span': { backgroundColor: 'lightgreen !important' } },
    orangeProgress: { '& span': { backgroundColor: 'orange !important' } },
    redProgress: {
        '& span': { backgroundColor: 'orangered !important' }
    }
});
const PredictCard = () => {
    const classes = usePredictCardStyles();
    const predictions = [
        { class: classes.greenProgress, name: 'Non Covid', percent: 83.7 },
        { class: classes.redProgress, name: 'Covid', percent: 11.2 },
        { class: classes.orangeProgress, name: 'Pneumonia/Other', percent: 5.1 }
    ];

    return (
        <FadeIn ms={1500}>
            <Paper
                elevation={4}
                sx={{
                    height: '250px',
                    left: '-105px',
                    position: 'relative',
                    top: '10px',
                    transform: 'rotate(19deg)',
                    width: '280px'
                }}>
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
        </FadeIn>
    );
};
export default PredictCard;
