import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';


export default function Loading() {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
      );
}

// Need to create something more creative loading