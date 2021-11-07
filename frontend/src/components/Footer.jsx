import { Grid, Paper, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { COLORS } from '../constants';
import useCustomAppBarStyles from './customAppBarStyles';

const useFooterStyles = createUseStyles({
    footerDiv: {
        backgroundColor: `${COLORS.appBarBackground} !important`,
        boxShadow:
            'box-shadow: 0px -9px 6px -3px rgb(0 0 0 / 20%), 0px -9px 14px 1px rgb(0 0 0 / 14%), 0px -9px 18px 3px rgb(0 0 0 / 12%) !important',
        marginTop: '100px'
    },
    footerText: { color: '#ffffffb5' },
    madeBy: { color: COLORS.madeByText }
});
const Footer = () => {
    const classes = useFooterStyles();
    const customAppBarClasses = useCustomAppBarStyles();
    return (
        <Paper className={classes.footerDiv} elevation={10}>
            <Grid container spacing={2}>
                <Grid justifyContent='center' sx={{ mt: 2 }} xs={12}>
                    <Typography component='div' display='flex' justifyContent='center' variant='h6'>
                        <span className={customAppBarClasses.covidLogo}>Covid</span>

                        <span className={customAppBarClasses.scannerLogo}>Scanner</span>

                        <span className={classes.madeBy}>made by Ashutosh Sahu</span>
                    </Typography>
                </Grid>

                <Grid xs={12}>
                    <Typography display='flex' justifyContent='center'>
                        <span className={classes.footerText}>Privacy Policy</span>|

                        {/* eslint-disable-next-line react/jsx-child-element-spacing */}

                        <span>Terms & Conditions</span>
                    </Typography>
                </Grid>

                <Grid xs={4} />

                <Grid xs={4} />
            </Grid>
        </Paper>
    );
};
export default Footer;
