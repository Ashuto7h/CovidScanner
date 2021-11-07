import { Dialog, Grid, Typography } from '@mui/material';
import { createUseStyles } from 'react-jss';
import { API_URL, COLORS } from '../constants';
import PredictCard from "./PredictCard";

const usePredictDialogStyles = createUseStyles({
    fileName: { color:COLORS.uploadLightColor },
    image: { width: '300px' },
    imgDiv: { padding: '10px', width: 'max-content' }
});
const PredictDialog = ({ details, open, setOpen }) => {
    const handleClose = () => {
        setOpen(false);
    };
    const classes = usePredictDialogStyles();
    console.log(details);
    return (
        <Dialog onClose={handleClose} open={open}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography
                        className={classes.fileName}
                        fontWeight='bold'
                        textAlign='center'
                        variant='h6'>
                        {details.status.filename}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.imgDiv}>
                        <img
                            className={classes.image}
                            src={`${API_URL}/${details.batchId}/${details.status.filename}`}
                        />
                    </div>
                </Grid>

                <Grid item justifyContent='center' xs={6}>
                    <PredictCard predict={details.status.predictions} />
                </Grid>
            </Grid>
        </Dialog>
    );
};
export default PredictDialog;
