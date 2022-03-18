//react
import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

// Apollo Imports and Auth
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_HUNT_ITEM, QUERY_ME } from '../utils/queries';
import { USER_ASKS_FOR_HINT } from '../utils/mutations';
import Auth from '../utils/auth';

//styling 
import { motion } from 'framer-motion';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, CardContent } from '@material-ui/core';
import Stack from '@mui/material/Stack';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

// components
import ClueHeader from '../components/cards/ClueHeader'


const useStyles = makeStyles(() => ({
    root: {
        Width: '250',
        margin: 'auto',
        borderRadius: 12,
        padding: 12,
    },
    media: {
        borderRadius: 6,
    },
}));


const HuntItem = () => {
    const styles = useStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    const { huntItemId } = useParams()
    const { data: huntItemData, loading: huntItemLoading } = useQuery(GET_HUNT_ITEM, {
        variables: { huntItemId: huntItemId },
    })
    const { data: userData, loading: userLoading } = useQuery(QUERY_ME)
    const [userAsksForHint, { error: userAsksForHintError }] = useMutation(USER_ASKS_FOR_HINT);

    const huntItem = huntItemData?.huntItem || {};
    const currentUser = userData?.me || {};
    console.log('HUNTITEM: ', huntItem)
    console.log('CURRENTUSER: ', currentUser)

    const [errorMessage, setErrorMessage] = useState('');

    if (huntItemLoading) {
        return <h2>LOADING.....</h2>
    }

    if (userLoading) {
        return <h2>LOADING.....</h2>
    }

    let huntItemSearch = currentUser.foundHuntItems
    let userFound = false
    console.log('HUNT ITEM SEARCH: ', huntItemSearch)

    if (huntItemSearch){

    huntItemSearch.forEach(huntItem => {
        console.log('CURRENT USER IN SEARCH: ', currentUser)
        console.log("HUNTITEM IN SEARCH: ", huntItem)
        if (huntItem._id === huntItemId) {
            userFound = true
            return
        }
    }
    )}
    console.log('USERFOUND: ', userFound)
    if (userFound) {
        return (
            <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                <CardContent>
                    <TextInfoContent
                        classes={textCardContentStyles}
                        overline={`${huntItem.solutionLocation}`}
                        heading={'Congratulations! 🎉 '}
                        body={<div>

                            <p>You have found this location!</p>
                            <p>{huntItem.solutionDescription}</p>
                            <Button component={Link} to={`../`} className={buttonStyles}>Start Again</Button>
                        </div>} />
                </CardContent>
            </Card>
        )
    }

    var hintTwoDisplayedTo = []
    var hintThreeDisplayedTo = []
    var solutionDisplayed = []

    if(huntItem.hint2DisplayedTo){
        hintTwoDisplayedTo = huntItem.hint2DisplayedTo.map(user => user._id)
    }
    if(huntItem.hint3DisplayedTo){
        hintThreeDisplayedTo = huntItem.hint3DisplayedTo.map(user => user._id)
    }
    if(huntItem.solutionDisplayedTo){
        solutionDisplayed = huntItem.solutionDisplayedTo.map(user => user._id)
    }

    const hintBody = () => {
        if (solutionDisplayed.includes(currentUser._id)) {
            return (
                <>
                    <ClueHeader huntItemName={huntItem.name} huntItemCategory={huntItem.category} huntItemCity={huntItem.city} />

                    <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={huntItem.category}
                                heading={`HINT NUMBER 1`}
                                body={<div>
                                    <p>{ReactHtmlParser(huntItem.hint1)}</p>

                                </div>} />

                        </CardContent>

                    </Card>
                    <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={huntItem.category}
                                heading={`HINT NUMBER 2`}
                                body={<div>
                                    <p>Category: {ReactHtmlParser(huntItem.hint2)}</p>

                                </div>} />

                        </CardContent>

                    </Card><Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={huntItem.category}
                                heading={`HINT NUMBER 3`}
                                body={<div>
                                    <p>{ReactHtmlParser(huntItem.hint3)}</p>

                                </div>} />

                        </CardContent>
                    </Card>
                    <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={huntItem.category}
                                heading={`FINAL HINT`}
                                body={<div>
                                    <p>{ReactHtmlParser(huntItem.solutionDescription)}</p>
                                    <p>{ReactHtmlParser(huntItem.solutionLocation)}</p>
                                </div>} />
                        </CardContent>
                    </Card></>
            )
        }


        if (hintThreeDisplayedTo.includes(currentUser._id)) {
            return (
                <>
                    <ClueHeader huntItemName={huntItem.name} huntItemCategory={huntItem.category} huntItemCity={huntItem.city} />

                    <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={huntItem.category}
                                heading={`HINT NUMBER 1`}
                                body={<div>
                                    <p>{ReactHtmlParser(huntItem.hint1)}</p>

                                </div>} />
                        </CardContent>
                    </Card>
                    <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={huntItem.category}
                                heading={`HINT NUMBER 2`}
                                body={<div>
                                    <p>{ReactHtmlParser(huntItem.hint2)}</p>

                                </div>} />
                        </CardContent>
                    </Card><Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={huntItem.category}
                                heading={`HINT NUMBER 3`}
                                body={<div>
                                    <p>{ReactHtmlParser(huntItem.hint3)}</p>
                                    <Button className={buttonStyles} onClick={displaySolution}>Need Final Hint? (-1 pt)</Button>
                                </div>} />{errorMessage && (

                                    <p>{errorMessage}</p>

                                )}
                        </CardContent>
                    </Card></>
            )
        }


        if (hintTwoDisplayedTo.includes(currentUser._id)) {
            return (
                <>
                    <ClueHeader huntItemName={huntItem.name} huntItemCategory={huntItem.category} huntItemCity={huntItem.city} />

                    <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={huntItem.category}
                                heading={`HINT NUMBER 1`}
                                body={<div>
                                    <p>{ReactHtmlParser(huntItem.hint1)}</p>

                                </div>} />
                        </CardContent>
                    </Card><Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={huntItem.category}
                                heading={`HINT NUMBER 2`}
                                body={<div>
                                    <p>{ReactHtmlParser(huntItem.hint2)}</p>
                                    <Button className={buttonStyles} onClick={displayHintThree}>Need another hint? (-1 pt)</Button>
                                </div>} />{errorMessage && (

                                    <p>{errorMessage}</p>

                                )}
                        </CardContent>
                    </Card></>
            )
        }

        else {
            return (
                <>
                  <ClueHeader huntItemName={huntItem.name} huntItemCategory={huntItem.category} huntItemCity={huntItem.city} />
                  
                    <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={huntItem.category}
                                heading={`HINT NUMBER 1`}
                                body={<div>
                                    <p>{ReactHtmlParser(huntItem.hint1)}</p>
                                    <Button className={buttonStyles} onClick={displayHintTwo}>Need another hint? (-1 pt)</Button>
                                </div>} />{errorMessage && (

                                    <p>{errorMessage}</p>

                                )}
                        </CardContent>
                    </Card>
                </>
            )
        }

    }



    const displayHintTwo = async () => {
        try {
            const { data: hintData } = await userAsksForHint({
                variables: { huntItemId: huntItemId, hint2: true },
            })
        } catch (e) {
            setErrorMessage("😭 I'm sorry, you have run out of points! 😭")

        }
    }

    const displayHintThree = async () => {
        try {
            const { data: hintData } = await userAsksForHint({
                variables: { huntItemId: huntItemId, hint3: true },
            })
        }
        catch (e) {
            setErrorMessage("😭 I'm sorry, you have run out of points! 😭")

        }
    }

    const displaySolution = async () => {
        try {
            const { data: hintData } = await userAsksForHint({
                variables: { huntItemId: huntItemId, solution: true },
            })
        } catch (e) {
            setErrorMessage("😭 I'm sorry, you have run out of points! 😭")
        }
    }




    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >

            <main>
                {Auth.loggedIn() ? (
                    <Stack spacing={2} justifyContent="center" alignItems="center">

                        {hintBody()}
                    </Stack>) : (

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
            </main>
        </motion.div>
    );
};

export default HuntItem