// React Imports
import  React from 'react';
import { Link } from 'react-router-dom';

// Styling
import cx from 'clsx';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { CardActionArea, CardContent, CardMedia, Box, Card, Button } from '@material-ui/core';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';

// Components
import TopMarquee from '../modules/TopMarquee'
import Experiences from '../modules/Experiences';

// Styles
const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  root: {
    maxWidth: '80%',
    margin: 'auto',
    position: 'relative',
    borderRadius: spacing(2), // 16px
    transition: '0.3s',
    boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
    [breakpoints.up('md')]: {
      flexDirection: 'row',
      paddingTop: spacing(2),
    },
  },
  content: {
    padding: 24,
  },
  links : {
    textDecoration: 'none',
  },
}));

// main export function
export const Home = () => {
  const styles = useStyles();
  const {
    button: buttonStyles,
  } = useBlogTextInfoContentStyles();
  const mediaStyles = useCoverCardMediaStyles();
  const shadowStyles = useOverShadowStyles();

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
    >
    <TopMarquee />

    <Card className={cx(styles.root, shadowStyles.root)}>
      <CardMedia
        classes={mediaStyles}
        image={
          'https://uploads.visitseattle.org/2017/02/30115610/IMG_1491.jpg'
        }
      />
      <CardActionArea>
        <CardContent className={styles.content}>
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            minHeight={360}
            color={'common.white'}
            textAlign={'center'}
          >
            <Button className={buttonStyles} component={Link} to={'/start'}>START HERE</Button>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
    <Experiences />
    </motion.div>
  );
};

export default Home