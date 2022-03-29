import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
    return (
        <div className="loadingDiv">
            <CircularProgress size={'4rem'} sx={{ color:"#fd5238" }} />
        </div>
    );
};

export default Loading;