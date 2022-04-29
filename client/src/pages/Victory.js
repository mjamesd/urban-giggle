// React Imports
import React from 'react'
import { useParams } from 'react-router-dom';
import useWindowSize from 'react-use/lib/useWindowSize';
import ReactHtmlParser from 'react-html-parser';

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

// Components
import Wall from '../components/Wall'
import Loading from '../components/Loading';
import NeedToSignIn from '../components/NeedToSignIn';

const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 343,
        margin: 'auto',
        borderRadius: 12,
        padding: 12,
    },
    pointsImg: {
        textAlign: 'center',
        width: '5rem',
    },
}));

const Victory = () => {
    const styles = useStyles();
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

    const [userFoundHuntItem] = useMutation(USER_FOUND_HUNT_ITEM);

    const huntItem = qrData?.huntItemByQrCode || {};

    console.log('THE HUNT ITEM: ', huntItem);

    if (qrLoading || loading) {
        return (<Loading />);
    }

    // let huntItemId = huntItem._id;
    console.log("huntItemId: ", huntItem._id);

    var huntItemsSearch = []
    if (currentUser.foundHuntItems) {
        huntItemsSearch = currentUser.foundHuntItems;
        console.log("huntItemsSearch Populated: ", huntItemsSearch);
    }
    let userFound = false;
    console.log('huntItemsSearch: ', huntItemsSearch);

    huntItemsSearch.forEach(huntItemsSearch => {
        console.log(huntItemsSearch, "In THE FOR EACH!!");
        if (huntItemsSearch._id === huntItem._id) {
            userFound = true;
            console.log("found it! userFound: ", userFound);
            return;
        }
    });
    console.log(userFound)

    const claimPrize = async () => {
        try {
            const { data: foundData } = await userFoundHuntItem({
                variables: { huntItemId: huntItem._id },
            });
            Auth.setToken(foundData.userFoundHuntItem.token);
            window.location.reload()
        }
        catch (e) {
            console.log('CLAIM PRIZE ERROR:', e);
        }
    }

    const displayPointsImg = (points) => {
        const thisStyle = { textAlign: 'center', width: '5rem', };
        return (
            <p>
                {points > 0 && points < 4 && (
                    <img src="/img/coins/singlecoin.png" alt="one TQoin" style={thisStyle} />
                )}
                {points > 3 && points < 10 && (
                    <img src="/img/coins/coinstack.png" alt="stack of TQoin" style={thisStyle} />
                )}
                {points > 9 && (
                    <img src="/img/coins/bigcoinstack.png" alt="lots of TQoin" style={thisStyle} />
                )}
            </p>
        );
    };

    const displayRewards = (rewards) => {
        if (rewards.length > 0) {
            return (
                <div style={{ textAlign: 'center' }}>
                    {/* <h3>You earned these badges:</h3> */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {rewards && rewards.map((badge, i) => (
                            <div key={i} style={{ maxWidth: '90%', border: '1px solid #000', borderRadius: '67px' }}>
                                <h3>{ReactHtmlParser(badge.name)}</h3>
                                <p>{ReactHtmlParser(badge.description)}</p>
                                <div style={{ border: '1px solid #000', borderRadius: '67px', }}>
                                    <p>+{badge.points} TQoin{badge.points > 1 && `s`}</p>
                                    {displayPointsImg(badge.points)}
                                </div>
                                <p><img src={`/img/badges/${badge.icon}`} alt={`${badge.name} badge`} style={{ width: '75%', border: '1px solid #000', borderRadius: '67px' }} /></p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return (<p><em>This hunt location didn't award any badges</em></p>);
    };

    const userCompletedHuntItem = (huntItem) => {
        if (userFound) {
            return (
                <div style={styles.pointsDiv}>
                    <h2>You previously found and claimed these rewards:</h2>
                    <div style={{ maxWidth: '85%', border: '1px solid #000', borderRadius: '67px', }}>
                        <h3>{huntItem.points} TQoin{huntItem.points > 1 && `s`}!</h3>
                        {displayPointsImg(huntItem.points)}
                    </div>
                    <p>{displayRewards(huntItem.rewards)}</p>
                </div>
            );
        }
        else {
            return (
                <div>
                    <h2>{huntItem.solutionRewardText}</h2>
                    <Button onClick={claimPrize} className={buttonStyles} style={{ marginBottom: '25px' }}>Claim Your Prize!</Button>
                </div>
            );
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >

            {/* IS THIS BETTER? <main style={{ backgroundImage: `url(/img/huntItems/${huntItem.solutionImg})`, backgroundSize: 'cover', overflow: 'hidden', padding: '10vh' }}> */}
            <main>
                {Auth.loggedIn() ? [(
                        <Card className={cx(styles.root, shadowStyles.root)}>
                            <CardContent style={{ textAlign: 'center' }}>
                                <TextInfoContent
                                    classes={textCardContentStyles}
                                    overline={'Congratulations'}
                                />
                                <h1>You Found {ReactHtmlParser(huntItem.solutionName)}!</h1>
                                <p>{ReactHtmlParser(huntItem.solutionLocation)}</p>
                                <p>{userCompletedHuntItem(huntItem)}</p>
                                <p>
                                    <img src={`/img/huntItems/${huntItem.solutionImg}`} alt={huntItem.name} style={{ width: '100%' }} />
                                </p>
                                {/* <Button component={Link} to={`../`} className={buttonStyles}>Start Again</Button> */}
                            </CardContent>
                        </Card>),(
                        <br />),(
                        <Wall huntItemId={huntItem._id} huntItem={huntItem} />),(
                        <Confetti
                            width={width}
                            height={height}
                        />
                )] : (
                    <NeedToSignIn />
                )}
            </main>
        </motion.div>
    );
};

export default Victory;