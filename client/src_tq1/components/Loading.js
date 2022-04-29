// react imports
import React from 'react';

// styling
import CircularProgress from '@mui/material/CircularProgress';

// main export function
const Loading = () => {
    return (
        <div className="loadingDiv">
            <CircularProgress size={'4rem'} sx={{ color:"#fd5238" }} />
        </div>
    );
};

export default Loading;