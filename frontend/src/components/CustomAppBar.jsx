import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import useCustomAppBarStyles from './customAppBarStyles';


const CustomAppBar = () => {
    const classes = useCustomAppBarStyles();
    return (
        <Box>
            <AppBar className={classes.appBar} position='sticky'>
                <Toolbar>
                    <Typography component='div' variant='h6'>
                        <span className={classes.covidLogo}>Covid</span>

                        <span className={classes.scannerLogo}>Scanner</span>
                    </Typography>

                    <Button className={classes.navItem} sx={{ marginLeft: 'auto' }}>
                        Api
                    </Button>

                    <Button className={classes.navItem}>Try It</Button>

                    <Button className={classes.navItem}>About</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default CustomAppBar;
