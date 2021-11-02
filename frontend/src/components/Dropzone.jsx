/* eslint-disable react/jsx-child-element-spacing */
import { useCallback } from "react";
import { useDropzone } from 'react-dropzone';
import { createUseStyles } from "react-jss";

const useDropzoneStyles = createUseStyles({
    dropzone: {
        alignItems: 'center',
        background: '#01073994',
        border: "#00fffe",
        borderRadius: '60px',
        borderStyle: 'dashed',
        color: '#6bbafb',
        display: 'flex',
        height: '200px',
        justifyContent: 'center',
        width: '400px'
    }
})

const Dropzone = ({ disabled }) => {
    const classes = useDropzoneStyles();
    const onDrop = useCallback((acceptedFiles) => {
        console.log(acceptedFiles)
    }, []);

    const { getInputProps, getRootProps } = useDropzone({ onDrop });
    return (
        <div {...getRootProps()} className={classes.dropzone}>
            <input {...getInputProps()} disabled={disabled} />

            Drop Files or Click here to upload them
        </div>

    );
}
export default Dropzone;