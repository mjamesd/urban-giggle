// React Imports
import React from 'react'
import { useParams, Link } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize';

// Apollo Imports and Auth
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_HUNT_ITEM_BY_QR_ID, QUERY_ME } from '../utils/queries';
import { USER_FOUND_HUNT_ITEM } from '../utils/mutations'

// Styling
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti'
import { Card, CardContent, Button } from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';

// Components
import Wall from '../components/Wall'
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
}));

const Victory = () => {
    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const { button: buttonStyles } = useBlogTextInfoContentStyles();
    const { qrId } = useParams();
    const { width, height } = useWindowSize();
    
    const { loading, data } = useQuery(QUERY_ME);

    const currentUser = data?.me || {};

    const { loading: qrLoading, data: qrData } = useQuery(GET_HUNT_ITEM_BY_QR_ID, {
        // pass URL parameter
        variables: { qrId: qrId },
    });

    const [userFoundHuntItem, { error }] = useMutation(USER_FOUND_HUNT_ITEM);

    const huntItem = qrData?.huntItemByQrCode || {};

    console.log('THE HUNT ITEM: ', huntItem);

    if (qrLoading || loading) {
        return (<Loading />);
    }

    let huntItemId = huntItem._id;

    console.log("huntItemId: ", huntItemId);

    var huntItemsSearch = []
    if (currentUser.foundHuntItems) {
        huntItemsSearch = currentUser.foundHuntItems;
        console.log("huntItemsSearch Populated: ", huntItemsSearch);
    }
    let userFound = false;

    console.log('huntItemsSearch: ', huntItemsSearch);


    
    huntItemsSearch.forEach(huntItemsSearch => {
        console.log(huntItemsSearch, "In THE FOR EACH!!");
        if (huntItemsSearch._id === huntItemId) {
            userFound = true;
            console.log("found it! userFound: ", userFound);
            return;
        }
    }
    )

    console.log(userFound)
    const userCompletedHuntItem = () => {
        if (userFound) {
            return (<><h3>You have previously found and claimed coins for this location.</h3><br /><br /></>);
        }
        else {
            return (<><Button onClick={claimPrize} className={buttonStyles}>Claim Your Prize!</Button><br /><br /></>);
        }
    }

    const claimPrize = async () => {
        try {
            const { data: foundData } = await userFoundHuntItem({
                variables: { huntItemId: huntItem._id },
            });
            Auth.setToken(foundData.userFoundHuntItem.token);
        }
        catch (e) {
            console.log('CLAIM PRIZE ERROR:', e);
        }
    }


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >

            <main style={{ backgroundImage: `url(https://uploads.visitseattle.org/2017/02/30115610/IMG_1491.jpg)`, backgroundSize: 'cover', overflow: 'hidden', padding: '10vh' }}>
                {Auth.loggedIn() ? (
                    <> <Card className={cx(styles.root, shadowStyles.root)}>

                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={'You did it!'}
                                heading={'CONGRATULATIONS'}
                                body={<>
                                    <h1>🎉🎉🎉</h1>
                                    <h2>You found: {huntItem.solutionDescription}!</h2><br></br>

                                    {userCompletedHuntItem()}

                                    <Button component={Link} to={`../`} className={buttonStyles}>Start Again</Button>
                                </>
                                }
                            />
                        </CardContent>
                    </Card>
                        <br />
                        <Wall huntItemId={huntItem._id} huntItem={huntItem} />
                        <Confetti
                            width={width}
                            height={height}
                        /></>
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
            </main>

        </motion.div>
    );
};

export default Victory;