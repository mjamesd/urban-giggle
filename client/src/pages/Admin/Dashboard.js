import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box } from '@mui/system';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';

export const Dashboard = React.memo(function SolidGameCard() {
    const navigate = useNavigate();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
        >
            <Box style={{ marginLeft: '2em' }}>
                <h1>Total Quest Administrator Panel</h1>
                <p><Button onClick={() => navigate(`./hunts`)} className={buttonStyles}>Hunts</Button></p>
                <p><Button onClick={() => navigate(`./huntItems`)} className={buttonStyles}>HuntItems</Button></p>
                <p><Button onClick={() => navigate(`./badges`)} className={buttonStyles}>Badges</Button></p>
                <p><Button onClick={() => navigate(`./users`)} className={buttonStyles}>Users</Button></p>
            </Box>

        </motion.div >
    );
});
export default Dashboard;