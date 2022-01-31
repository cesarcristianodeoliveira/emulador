import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const Loading = ({ message }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <CircularProgress style={{ width: 64, height: 64 }} />
            <Typography variant='subtitle2' sx={{ mt: 2 }}>{ message }</Typography>
        </Box>
    )
};

export default Loading;
