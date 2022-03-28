// IMPORTS
import React from 'react';
import cx from 'clsx';
import Color from 'color';
import { motion } from 'framer-motion';
import ReactHtmlParser from 'react-html-parser';
import { Link, useParams } from 'react-router-dom';
// import { useNavigate, useParams } from 'react-router-dom';
// MUI
import { Box } from '@mui/system';
// Material-UI
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Card, CardActionArea, CardContent, CardMedia } from '@material-ui/core';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// MUI Treasury
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
// import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
// GraphQL
import { useQuery } from '@apollo/client';
import { GET_HUNTS_BY_CITY } from '../utils/queries';
// Components
import Auth from '../utils/auth';
import Loading from '../components/Loading';


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
        fontSize: '2rem',
        color: '#fff',
        textTransform: 'uppercase',
        justifyContent: 'center'
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

const CustomCard = ({ classes, image, title, subtitle }) => {
    const mediaStyles = useFourThreeCardMediaStyles();
    return (
        <CardActionArea className={classes.actionArea}>
            <Card className={classes.card}>
                <CardMedia classes={mediaStyles} image={image} />
                <CardContent className={classes.content}>
                    <Typography className={classes.title}>
                        {ReactHtmlParser(title)}
                    </Typography>
                    <Typography className={classes.subtitle}>{ReactHtmlParser(subtitle)}</Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    );
};

export const Hunts = () => {
    // const navigate = useNavigate();
    const gridStyles = useGridStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    // const { button: buttonStyles } = useBlogTextInfoContentStyles();
    // const styles = useStyles({ color: '#0b3954' });
    // const styles2 = useStyles({ color: '#FF6F00' });
    // const styles3 = useStyles({ color: '#c81d25' });
    const styles = useStyles({ color: '#c81d25' });
    const { huntCity } = useParams();
    const { loading, data } = useQuery(GET_HUNTS_BY_CITY, {
        // pass URL parameter
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