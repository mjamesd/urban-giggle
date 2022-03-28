// React Imports
import React from 'react';
import { Link } from 'react-router-dom';

// Apollo Imports and Auth
import { useQuery } from '@apollo/client';
import { GET_HUNTS } from '../utils/queries';
import Auth from '../utils/auth';

// Styling
import cx from 'clsx';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from '@mui/material/'
import { Card, Button, CardContent }  from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';

// Components
import Loading from '../components/Loading';


const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 343,
        margin: 'auto',
        borderRadius: 12,
        padding: 12,
    },
    media: {
        borderRadius: 6,
    },
    selection: {
        margin: 10,
    },
    container: {
        width: 150,
        height: 150,
        background: 'white',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
}));


const Start = () => {

    const styles = useStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const textCardContentStyles = useN04TextInfoContentStyles();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    // Execute the query on component load
    const { loading, data } = useQuery(GET_HUNTS)

    // Assigns the query data to "hunts" if available. If it is not available then it assigns an empty array. 
    const hunts = data?.hunts || [];

    // making sure the data is loaded before things start being assigned to the page. 
    if (loading) {
        return (<Loading />);
    }

    // Removes duplicates in the cities
    const cities = [...new Map(hunts.map(hunt => [hunt.city, hunt])).values()]

    return (
        <><motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
    >
        {Auth.loggedIn() ? (
                <Card className={cx(styles.root, shadowStyles.root)}>
                    <CardContent>
                        <TextInfoContent
                            classes={textCardContentStyles}
                            overline={'Welcome'}
                            heading={'Choose a City'} />
                        <FormControl fullWidth>
                            {
                                cities.map((city) => (
                                    <><Button component={Link} to={`../city/${city.city}`} className={buttonStyles}>{city.city}</Button><br /></>
                                ))}
                        </FormControl>
                    </CardContent>
                </Card>
            
            ) : (

                <Card className={cx(styles.root, shadowStyles.root)}>
                    <CardContent>
                        <TextInfoContent
                            classes={textCardContentStyles}
                            overline={'Ooops...'}
                            heading={'Sign in to join the fun!'}
                            body={<>You need to be logged in view this page. Please{' '}
                            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link></>} />
                        
                    </CardContent>
                </Card>
            )}
            </motion.div >
        </>
    );
};

export default Start;
