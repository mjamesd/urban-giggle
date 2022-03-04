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

export const Seattle = React.memo(function SolidGameCard() {
    const gridStyles = useGridStyles();
    const styles = useStyles({ color: '#0b3954' });
    const styles2 = useStyles({ color: '#FF6F00' });
    const styles3 = useStyles({ color: '#c81d25' });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <Box>
                <h1 style={{ textAlign: "center" }}>SEATTLE</h1>
                <h2 style={{ textAlign: "center" }}>CHOOSE YOUR HUNT</h2>
            </Box>
            <Grid style={{ justifyContent: 'center' }} classes={gridStyles} container spacing={4}>
                <Grid item>
                    <Link style={{ textDecoration: 'none' }} to='./explore'>
                        <CustomCard
                            classes={styles}
                            title={'EXPLORE'}
                            subtitle={'Looking to explore the city? Try our EXPLORE experience to find the local spots, sightsee and EXPLORE the city the best way!'}
                            image={
                                'https://s31606.pcdn.co/wp-content/uploads/2019/10/young-traveler-woman-in-kuala-lumpur-chinatown-district-picture-id1063308558.jpg'
                            }
                        /></Link>
                </Grid>
                <Grid item>
                <Link style={{ textDecoration: 'none' }} to='./indulge'>
                    <CustomCard
                        classes={styles2}
                        title={'INDULGE'}
                        subtitle={'If you are a foodie this experience is for you. INDULGE yourself with hunting down the best bars and restaurants in the city'}
                        image={'https://seattlerefined.com/resources/media/59384af0-18fb-4310-b25f-5cc0492a7513-large16x9__H9A1307.jpg?1629912946061'}
                    /></Link>
                </Grid>
                <Grid item>
                <Link style={{ textDecoration: 'none' }} to='./custom'>
                    <CustomCard
                        classes={styles3}
                        title={'CREATE'}
                        subtitle={'Celebrating a Bachelorette? Planning a birthday party or event? Build your own scavenger hunt with the CREATE experience!'}
                        image={
                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbZJUOurbvAWIWA2CvDEknsve876BJBXrd-Q&usqp=CAU'
                        }
                    /></Link>
                </Grid>
            </Grid>
        </motion.div>
    );
});
export default Seattle