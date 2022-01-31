import React from 'react';
import { Box } from '@mui/material';

const AdUrl = () => {
    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#333333' }}>
            <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FEmulador-100126765918698&width=300&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=667962850869978" width="300" scrolling="no" frameborder="0" allowfullscreen="true" style={{ overflow: 'hidden' }}></iframe>
        </Box>
    )
};

export default AdUrl;
