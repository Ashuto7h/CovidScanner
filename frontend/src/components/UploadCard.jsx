import { Button, Card, CardContent, Paper, Typography } from '@mui/material';
import { useHistory } from 'react-router';
import { createUseStyles } from 'react-jss';
import { ArrowRightAlt } from '@mui/icons-material';
import Dropzone from './Dropzone';
import FadeIn from './FadeIn';

const useUploadCardStyles = createUseStyles(() => ({
    noImage: { left: '2px', position: 'relative', top: '6px' },
    trySample: {
        '&:hover': {
            '& svg': { left: '6px', transition: '0.2s ease-in' },
            textDecoration: 'underline'
        }
    }
}));
const UploadCard = ({ className, disabled }) => {
    const history = useHistory();
    const classes = useUploadCardStyles();
    return (
        <FadeIn ms={1600}>
            <Paper className={className} elevation={24} onClick={() => history.push('/try')} raised>
                <CardContent
                    sx={{
                        alignItems: 'center',
                        background:
                            'linear-gradient(180deg, rgba(37,123,224,1) 10%, rgba(100,198,247,1) 90%)',
                        borderRadius: '15px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                    <Typography
                        gutterBottom
                        sx={{
                            color: '#ffffff',
                            fontSize: '24px'
                        }}
                        textAlign='center'>
                        Upload CT Scan
                    </Typography>

                    <Dropzone disabled={disabled} />

                    <Button sx={{ marginTop: '10px' }} variant='contained'>
                        Upload
                    </Button>

                    <Typography textAlign='center'>
                        {/* eslint-disable-next-line react/jsx-child-element-spacing */}
                        Don&apos;t have any scan?

                        <span className={classes.trySample}>
                            &nbsp;Try Samples
                            <ArrowRightAlt className={classes.noImage} />
                        </span>
                    </Typography>
                </CardContent>
            </Paper>
        </FadeIn>
    );
};
export default UploadCard;
