import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Grid from '@material-ui/core/Grid';
import { Box } from '@mui/system';
import { useQuery } from '@apollo/client';
import { GET_HUNT_ITEM } from '../../utils/queries';

const useGridStyles = makeStyles(({ breakpoints }) => ({
    root: {
        [breakpoints.up('md')]: {
            justifyContent: 'center',
        },
    },
}));

const HuntItemAdmin = () => {
    const gridStyles = useGridStyles();
    const { huntItemId } = useParams();
    console.log(huntItemId)
    const { loading, data } = useQuery(GET_HUNT_ITEM, {
        // pass URL parameter
        variables: { huntItemId: huntItemId },
      });

      const huntItem = data?.huntItem || {};
      console.log(huntItem)


    if (loading) {
        return <h2>LOADING.....</h2>
    }

  return (
    <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <Box>
                <h1 style={{ textAlign: "center" }}></h1>
            </Box>
            <Grid classes={gridStyles} container spacing={4} wrap={'wrap'}>
                {huntItem.name}
                
                <button></button>
            </Grid>
            </motion.div >
    );
}

export default HuntItemAdmin