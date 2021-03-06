/* eslint-disable react/jsx-child-element-spacing */
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { createUseStyles } from 'react-jss';

const useDropzoneStyles = createUseStyles((theme) => ({
    centerDiv: {},
    dropzone: {
        alignItems: 'center',
        background: theme.upload ? '#04123a' : '#01073994',
        border: '#00fffe',
        borderRadius: '60px',
        borderStyle: 'dashed',
        color: '#6bbafb',
        display: 'flex',
        height: '200px',
        justifyContent: 'center',
        padding: '5px 30px',
        width: '400px'
    },
    scrollDiv: {
        '&::-webkit-scrollbar': {
            display: 'none'
        },
        alignItems: 'center',
        display: 'flex',
        height: '100%',
        margin: '4px',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
        width: '100%'
    }
}));

const Dropzone = ({ disabled, files, setFiles, upload }) => {
    const classes = useDropzoneStyles({ theme: { upload } });
    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles);
    }, []);
    const { fileRejections, getInputProps, getRootProps } = useDropzone({
        maxFiles: 10,
        multiple: true,
        onDrop
    });
    useEffect(() => {
        if (fileRejections?.length > 0) {
            // eslint-disable-next-line
            alert(`Currently more than 10 files are not supported\nPlease try again`);
        }
    }, [fileRejections]);
    return (
        <div {...getRootProps()} className={classes.dropzone}>
            <input {...getInputProps()} disabled={disabled} />

            {files?.length > 0 ? (
                <div className={classes.scrollDiv}>
                    {files.map((file) => (
                        <>
                            {file.name}

                            <br />
                        </>
                    ))}
                </div>
            ) : (
                'Drop Files or Click to Upload Them'
            )}
        </div>
    );
};
export default Dropzone;
