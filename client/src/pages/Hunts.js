import React from 'react';
import Color from 'color';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import { Box } from '@mui/system';
import { useQuery } from '@apollo/client';
import { GET_HUNTS_BY_CITY } from '../utils/queries';
import { useNavigate, useParams } from 'react-router-dom';
import cx from 'clsx';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import Button from '@material-ui/core/Button';
import Auth from '../utils/auth';

const useGridStyles = makeStyles(({ breakpoints }) => ({
    root: {
        [breakpoints.up('md')]: {
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
        marginTop: 10,
        width: 256,
        borderRadius: 16,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: `0 6px 12px 0 ${Color(color)
                .rotate(-12)
                .darken(0.2)
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
                    <Typography className={classes.title} >
                        {title}
                    </Typography>
                    <Typography className={classes.subtitle}>{subtitle}</Typography>
                </CardContent>
            </Card>
        </CardActionArea>
    );
};

export const Hunts = React.memo(function SolidGameCard() {
    const navigate = useNavigate()
    const gridStyles = useGridStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const { button: buttonStyles } = useBlogTextInfoContentStyles();
    const styles = useStyles({ color: '#0b3954' });
    const styles2 = useStyles({ color: '#FF6F00' });
    const styles3 = useStyles({ color: '#c81d25' });
    const { huntCity } = useParams();
    const { loading, data } = useQuery(GET_HUNTS_BY_CITY, {
        // pass URL parameter
        variables: { city: huntCity },
    });
    let exploreFilter
    let indulgeFilter 

    // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
    const hunts = data?.huntsByCity || [];

    if (loading) {
        return <h2>LOADING.....</h2>
    }

    hunts.forEach(hunt => {
        if(hunt.name === `Explore ${huntCity}`) {
            console.log(hunt)
            exploreFilter = hunt
            return
        }
    }
    )
    
   hunts.forEach(hunt => {
        if(hunt.name === `Indulge ${huntCity}`) {
            console.log(hunt)
            indulgeFilter = hunt
            return
        }
    }
    )


    const goToHunt = (huntId) => {
        console.log(huntId)
        navigate(`./${huntId}`)
      }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            {Auth.loggedIn() ? (
            <><Box>
                    <h1 style={{ textAlign: "center" }}>{huntCity}</h1>
                    <h2 style={{ textAlign: "center" }}>CHOOSE YOUR HUNT</h2>
                </Box><Grid style={{ justifyContent: 'center' }} classes={gridStyles} container center spacing={4} wrap={'wrap'}>
                        {exploreFilter && (
                            <Grid item>
                                <Link style={{ textDecoration: 'none' }} to={`./${exploreFilter._id}`}>
                                    <CustomCard
                                        classes={styles}
                                        title={'EXPLORE'}
                                        subtitle={'Looking to explore the city? Try our EXPLORE experience to find the local spots, sightsee and EXPLORE the city the best way!'}
                                        image={'https://s31606.pcdn.co/wp-content/uploads/2019/10/young-traveler-woman-in-kuala-lumpur-chinatown-district-picture-id1063308558.jpg'} /></Link>
                            </Grid>
                        )}
                        {indulgeFilter && (
                            <Grid item>
                                <Link style={{ textDecoration: 'none' }} to={`./${indulgeFilter._id}`}>
                                    <CustomCard
                                        classes={styles2}
                                        title={'INDULGE'}
                                        subtitle={'If you are a foodie this experience is for you. INDULGE yourself with hunting down the best bars and restaurants in the city'}
                                        image={'https://seattlerefined.com/resources/media/59384af0-18fb-4310-b25f-5cc0492a7513-large16x9__H9A1307.jpg?1629912946061'} /></Link>
                            </Grid>
                        )}
                        <Grid item>
                            <Link style={{ textDecoration: 'none' }} to='../admin/hunts/add'>
                                <CustomCard
                                    classes={styles3}
                                    title={'CREATE'}
                                    subtitle={'Celebrating a Bachelorette? Planning a birthday party or event? Build your own scavenger hunt with the CREATE experience!'}
                                    image={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbZJUOurbvAWIWA2CvDEknsve876BJBXrd-Q&usqp=CAU'} /></Link>
                        </Grid>
                    </Grid><br /><br /><h1 style={{ textAlign: "center" }}>All Available Scavenger Hunts...</h1><br /><br /><Grid style={{ justifyContent: 'center' }} classes={gridStyles} container spacing={4} wrap={'wrap'}>
                        {hunts &&
                            hunts.map((hunt) => (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card className={cx(styles.root, shadowStyles.root)}>
                                        <CardContent>
                                            <TextInfoContent
                                                classes={textCardContentStyles}
                                                overline={hunt.city}
                                                heading={hunt.name}
                                                body={<div>
                                                    <p>{hunt.description}</p>
                                                    <Button className={buttonStyles} onClick={() => goToHunt(hunt._id)}>Start Now!</Button>
                                                </div>} />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                    </Grid></>
) : (

    <Card className={cx(styles.root, shadowStyles.root)}>
        <CardContent>
            <TextInfoContent
                classes={textCardContentStyles}
                overline={'Ooops...'}
                heading={'Sign in to join the fun!'}
                body={<p>You need to be logged in view this page. Please{' '}
                <Link to="/login">login</Link> or <Link to="/signup">signup.</Link></p>} />
            
        </CardContent>
    </Card>
)}
        </motion.div>
    );
});
export default Hunts