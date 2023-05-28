import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function LoadingListAcc() {
    return (
        <div
            style={{
                display: 'flex',
                position: 'absolute',
                top: '0',
                right: '0',
                bottom: '0',
                left: '0',
                margin: 'auto',
            }}
        >
            <Box sx={{ display: 'flex', margin: 'auto' }}>
                <CircularProgress />
            </Box>
        </div>
    );
}
