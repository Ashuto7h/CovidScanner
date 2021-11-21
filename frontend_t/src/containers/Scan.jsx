import {
    Button,
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Box } from '@mui/system';
import UploadCard from '../components/UploadCard';
import PredictDialog from '../components/PredictDialog';

const useScanStyles = createUseStyles({
    scanDiv: { minHeight: '90vh' },
    uploaderCard: {
        borderRadius: '15px !important'
    }
});

const Scan = () => {
    const classes = useScanStyles();
    const [batchInfo, setBatchInfo] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openPredictDialog, setOpenPredictDialog] = useState(false);
    const [dialogDetails, setDialogDetails] = useState({});
    const getMaxLabel = (predictions) => {
        const x = Object.entries(predictions).sort((a, b) => b[1] - a[1]);
        const labels = { covid: 'Covid', ncovid: 'Non Covid', other: 'Pneumonia/Other' };
        return `${labels[x[0][0]]} - ${x[0][1]}%`;
    };
    return (
        <div className={classes.scanDiv}>
            <Grid container marginTop={10}>
                <Grid display='flex' item justifyContent='center' xs={12}>
                    <UploadCard
                        className={classes.uploaderCard}
                        upload
                        {...{ batchInfo, setBatchInfo }}
                    />
                </Grid>

                {batchInfo.status?.length > 0 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Paper
                            elevation={15}
                            sx={{ maxWidth: '900px', mb: 10, mt: 8, mx: 5, width: '100%' }}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: 'bold' }}>
                                                File Name
                                            </TableCell>

                                            <TableCell align='center' sx={{ fontWeight: 'bold' }}>
                                                Predictions
                                            </TableCell>

                                            <TableCell align='center' />
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {batchInfo.status
                                            ?.slice(
                                                page * rowsPerPage,
                                                page * rowsPerPage + rowsPerPage
                                            )
                                            ?.map((row) => (
                                                <TableRow
                                                    key={row.filename}
                                                    hover
                                                    sx={{
                                                        '&:last-child td, &:last-child th': {
                                                            border: 0
                                                        }
                                                    }}>
                                                    <TableCell component='th' scope='row'>
                                                        {row.filename}
                                                    </TableCell>

                                                    {row.error ? (
                                                        <TableCell align='center' colSpan={2}>
                                                            {row.error}
                                                        </TableCell>
                                                    ) : (
                                                        <TableCell align='center'>
                                                            {getMaxLabel(row.predictions)}
                                                        </TableCell>
                                                    )}

                                                    {row.error ? (
                                                        ''
                                                    ) : (
                                                        <TableCell align='center'>
                                                            <Button
                                                                onClick={() => {
                                                                    setDialogDetails(row);
                                                                    setOpenPredictDialog(true);
                                                                }}>
                                                                View Details
                                                            </Button>
                                                        </TableCell>
                                                    )}
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <TablePagination
                                component='div'
                                count={batchInfo.status?.length}
                                onPageChange={(e, np) => {
                                    setPage(np);
                                }}
                                onRowsPerPageChange={(e) => {
                                    setRowsPerPage(parseInt(e.target.value, 10));
                                    setPage(0);
                                }}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                rowsPerPageOptions={[5, 10, 25]}
                            />
                        </Paper>

                        <PredictDialog
                            details={{ batchId: batchInfo.batchId, status: dialogDetails }}
                            open={openPredictDialog}
                            setOpen={setOpenPredictDialog}
                        />
                    </Box>
                )}
            </Grid>
        </div>
    );
};
export default Scan;
