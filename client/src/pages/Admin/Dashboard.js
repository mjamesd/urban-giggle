import React from 'react';
import { useNavigate } from 'react-router-dom';
// import Color from 'color';
// import { makeStyles } from '@material-ui/core/styles';
// import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { Box } from '@mui/system';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useQuery } from '@apollo/client';
import { GET_HUNT_ITEMS } from '../../utils/queries';

// const useGridStyles = makeStyles(({ breakpoints }) => ({
//     root: {
//         [breakpoints.up('md')]: {
//             justifyContent: 'center',
//         },
//     },
// }));

// const useStyles = makeStyles(() => ({
//     actionArea: {
//         borderRadius: 16,
//         transition: '0.2s',
//         '&:hover': {
//             transform: 'scale(1.1)',
//         },
//     },
//     card: ({ color }) => ({
//         marginTop: 10,
//         width: 256,
//         borderRadius: 16,
//         boxShadow: 'none',
//         '&:hover': {
//             boxShadow: `0 6px 12px 0 ${Color(color)
//                 .rotate(-12)
//                 .darken(0.2)
//                 .fade(0.5)}`,
//         },
//     }),
//     content: ({ color }) => {
//         return {
//             backgroundColor: color,
//             padding: '1rem 1.5rem 1.5rem',
//         };
//     },
//     title: {
//         fontFamily: 'Keania One',
//         fontSize: '2rem',
//         color: '#fff',
//         textTransform: 'uppercase',
//         justifyContent: 'center'
//     },
//     subtitle: {
//         color: '#fff',
//         opacity: 0.87,
//         marginTop: '2rem',
//         fontWeight: 500,
//         fontSize: 14,
//     },
// }));


export const Admin = React.memo(function SolidGameCard() {
    const navigate = useNavigate();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();
    // const gridStyles = useGridStyles();
    // const styles = useStyles({ color: '#0b3954' });
    // const styles2 = useStyles({ color: '#FF6F00' });
    // const styles3 = useStyles({ color: '#c81d25' });

    // Execute the query on component load
    const { loading, data } = useQuery(GET_HUNT_ITEMS)

    // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
    const huntItems = data?.huntItems || [];

    console.log(huntItems)

    if (loading) {
        return <h2>LOADING.....</h2>
    }

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
export default Admin