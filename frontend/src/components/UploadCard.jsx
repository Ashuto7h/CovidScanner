import { ArrowRightAlt, Upload } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { CardContent, FormControlLabel, Paper, Radio, RadioGroup, Typography } from '@mui/material';
import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router';
import { ALLOWED_EXTENSIONS, API_URL } from '../constants';
import Dropzone from './Dropzone';
import FadeIn from './FadeIn';

const useUploadCardStyles = createUseStyles(() => ({
    noImage: { left: '2px', position: 'relative', top: '6px' },
    trySample: {
        '&:hover': {
            '& svg': { left: '6px', transition: '0.2s ease-in' },
            cursor: 'pointer',
            textDecoration: 'underline'
        }
    }
}));

const UploadCard = ({ batchInfo, className, disabled, setBatchInfo, upload }) => {
    const history = useHistory();
    const classes = useUploadCardStyles();
    const [labelType, setLabelType] = useState('ncovid');
    const [hiddenSamples, setHiddenSamples] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [files, setFiles] = useState([]);
    const uploadFiles = async () => {
        setIsUploading(true);
        if (files.length <= 0) return;
        const formData = new FormData();
        let numFiles = 0;
        const errors = [];
        files.map((file, index) => {
            const nameSplit = file.name.split('.');
            if (ALLOWED_EXTENSIONS.includes(nameSplit[nameSplit.length - 1])) {
                formData.append(`file_${index}`, file, file.name);
                numFiles += 1;
            } else {
                errors.push({
                    error: `Unsupported Format (.${nameSplit[nameSplit.length - 1]})`,
                    filename: file.name
                });
            }
            return errors;
        });
        if (numFiles > 0) {
            await fetch(`${API_URL}/upload`, {
                body: formData,
                method: 'POST'
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    const newData = { ...data };
                    newData.status = [...errors, ...data.status];
                    setBatchInfo(newData);
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            setBatchInfo({ status: error });
        }
        console.log(batchInfo);
        setIsUploading(false);
    };
    return (
        <FadeIn ms={upload ? 600 : 1600}>
            <Paper
                className={className}
                elevation={24}
                onClick={upload ? undefined : () => history.push('/try')}
                raised>
                <CardContent
                    sx={{
                        alignItems: 'center',
                        background: upload
                            ? '#ffffff'
                            : 'linear-gradient(180deg, rgba(37,123,224,1) 10%, rgba(100,198,247,1) 90%)',
                        borderRadius: '15px',
                        cursor: upload ? 'auto' : 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                    <Typography
                        gutterBottom
                        sx={{
                            color: upload ? '#010739' : '#ffffff',
                            fontSize: '24px'
                        }}
                        textAlign='center'>
                        Upload Your CT Scan
                    </Typography>

                    <Dropzone
                        disabled={disabled}
                        files={files}
                        setFiles={setFiles}
                        upload={upload}
                    />

                    <LoadingButton
                        disabled={files.length <= 0}
                        loading={isUploading}
                        loadingPosition='start'
                        onClick={uploadFiles}
                        startIcon={<Upload />}
                        sx={{ backgroundColor: upload && '#04123acc', marginTop: '10px' }}
                        variant='contained'>
                        Upload
                    </LoadingButton>

                    <Typography textAlign='center'>
                        {/* eslint-disable-next-line react/jsx-child-element-spacing */}
                        Don&apos;t have any scan?

                        <span
                            className={classes.trySample}
                            onClick={() => setHiddenSamples(false)}
                            role='button'>
                            &nbsp;Try Samples
                            <ArrowRightAlt className={classes.noImage} />
                        </span>
                    </Typography>

                    <div hidden={hiddenSamples}>
                        <RadioGroup
                            onChange={(e) => {
                                setLabelType(e.target.value);
                            }}
                            row
                            value={labelType}>
                            <FormControlLabel
                                control={<Radio />}
                                label='Non Covid'
                                value='ncovid'
                            />

                            <FormControlLabel control={<Radio />} label='Covid' value='covid' />

                            <FormControlLabel
                                control={<Radio />}
                                label='Pneumonia/Other'
                                value='other'
                            />
                        </RadioGroup>
                    </div>
                </CardContent>
            </Paper>
        </FadeIn>
    );
};
export default UploadCard;
