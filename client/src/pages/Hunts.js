// React Imports
import React from 'react';
import { Link, useParams } from 'react-router-dom';
// import ReactHtmlParser from 'react-html-parser';

// Apollo Imports and Auth
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_HUNTS_BY_CITY } from '../utils/queries';

// Styling
import cx from 'clsx';
import Color from 'color';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
import { Box } from '@mui/system';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

// Components
import Loading from '../components/Loading';

// Styles
const useGridStyles = makeStyles(({ breakpoints }) => ({
    root: {
        MarginTop: '10px',
        [breakpoints.up('sm')]: {
            justifyContent: 'center',
        },
    },
}));

const useStyles = makeStyles(() => ({
    actionArea: {
        borderRadius: 16,
        transition: '0.2s',
        '&:hover': {
            transform: 'scale(1.1)',
        },
    },
    card: ({ color }) => ({
        width: 256,
        borderRadius: 16,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 6px 12px 0 ${Color(color)
                .rotate(-12)
                .darken(0.5)
                .fade(0.5)}`,
        },
    }),
    content: ({ color }) => {
        return {
            backgroundColor: color,
            padding: '1rem 1.5rem 1.5rem',
        };
    },
    title: {
        fontFamily: 'Keania One',
        fontSize: '1.5rem',
        color: '#fff',
        // textTransform: 'uppercase',
        justifyContent: 'center',
        textAlign: 'center'
    },
    subtitle: {
        color: '#fff',
        opacity: 0.87,
        marginTop: '2rem',
        marginBottom: '2rem',
        fontWeight: 500,
        fontSize: 14,

    },
}));

// I think we should move this custom card into a component
const CustomCard = ({ classes, image, title, subtitle }) => {
    const mediaStyles = useFourThreeCardMediaStyles();
    return (
        <CardActionArea className={classes.actionArea}>
            <Card className={classes.card}>
                <CardMedia classes={mediaStyles} image={image} />
                <CardContent className={classes.content}>
                    <Typography className={classes.title}>
                        {/* {ReactHtmlParser(title)} */}
                        {title}
                    </Typography>
                    {/* <Typography className={classes.subtitle}>{ReactHtmlParser(subtitle)}</Typography> */}
                    <Typography className={classes.subtitle}>{subtitle}</Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    );
};

// main export function
export const Hunts = () => {
    const gridStyles = useGridStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const styles = useStyles({ color: '#c81d25' });
    const { huntCity } = useParams();
    const { loading, data } = useQuery(GET_HUNTS_BY_CITY, {
        variables: { city: huntCity },
    });

    const hunts = data?.huntsByCity || [];

    // should this be a useEffect() ?
    if (loading) {
        return (<Loading />);
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {Auth.loggedIn() ? (
                <>
                    <Box>
                        <h1 style={{ textAlign: "center" }}>CHOOSE YOUR SCAVENGER HUNT</h1>
                        <h2 style={{ textAlign: "center" }}>{huntCity}</h2>
                    </Box>
                    {/* SCAVENGER HUNT CARDS: */}
                    <Grid classes={gridStyles} container spacing={4} justifyContent={'center'} wrap={'wrap'}>
                        {hunts && hunts.map((hunt) => (
                            <Grid item key={hunt._id}>
                                <Link style={{ textDecoration: 'none' }} to={`./${hunt._id}`}>
                                    <CustomCard
                                        classes={styles}
                                        title={hunt.name}
                                        subtitle={hunt.description}
                                        image={`/img/hunts/${hunt.image}`}
                                    />
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </>
            ) : (

                <Card className={cx(styles.root, shadowStyles.root)}>
                    <CardContent>
                        <TextInfoContent
                            classes={textCardContentStyles}
                            overline={'Ooops...'}
                            heading={'Sign in to join the fun!'}
                            body={<>You need to be logged in view this page. Please{' '}
                                <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.</>} />

                    </CardContent>
                </Card>
            )}
        </motion.div>
    );
};
export default Hunts;