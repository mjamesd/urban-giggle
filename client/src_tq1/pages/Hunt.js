// React Imports
import { React } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

// Apollo Imports and Auth
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_HUNT } from '../utils/queries';

// Styling
import cx from 'clsx';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, Grid, CardContent } from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

// Components
import Loading from '../modules/Loading';


// Styles
const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 343,
    margin: 'auto',
    borderRadius: 12,
    padding: 12,
    paddingTop: 50,
  },
  media: {
    borderRadius: 6,
  },
}));

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
}));

// main export function
const Hunt = () => {
  const { huntId } = useParams();
  const navigate = useNavigate()
  const styles = useStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });
  const gridStyles = useGridStyles();
  const { button: buttonStyles } = useBlogTextInfoContentStyles();

  const { loading, data } = useQuery(GET_HUNT, {
    variables: { huntId: huntId },
});

    const hunt = data?.hunt || [];

    if (loading) {
        return (<Loading />);
    }

    const goToItem = (huntId) => {
      navigate(`../hints/${huntId}`)
    }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >

{Auth.loggedIn() ? (
            <><TextInfoContent
            classes={textCardContentStyles}
            overline={hunt.city}
            heading={hunt.name}
            body={<div>
              <h1>{hunt.description}</h1>
              <h2>FIND YER BOOTY!</h2>
            </div>} /><Grid classes={gridStyles} container spacing={2}>
              {hunt &&
                hunt.huntItems.map((huntItem) => (
                  <Grid item xs={12} sm={6} md={4}>
                    <Card className={cx(styles.root, shadowStyles.root)}>
                      <CardContent>
                        <TextInfoContent
                          classes={textCardContentStyles}
                          overline={huntItem.city}
                          heading={ReactHtmlParser(`Category: ${huntItem.category}<br /> "${huntItem.name}"`)}
                          body={<div>
                            <Button onClick={() => goToItem(huntItem._id)} className={buttonStyles}>Start Now!</Button><br/><br/>
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
    </>
  );
};


export default Hunt