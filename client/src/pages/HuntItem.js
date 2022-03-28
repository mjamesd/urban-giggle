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
import ClueCard from '../components/cards/ClueCard'
import ClueSolution from '../components/cards/ClueSolution'


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

    // Searching to see if this user has already completed this hunt location 
    let huntItemSearch = currentUser.foundHuntItems
    let userFound = false

    if (huntItemSearch) {
        huntItemSearch.forEach(huntItem => {
            console.log('CURRENT USER IN SEARCH: ', currentUser)
            console.log("HUNTITEM IN SEARCH: ", huntItem)
            if (huntItem._id === huntItemId) {
                userFound = true
                return
            }
        }
        )
    }

    // display if the user has found this item previously, so they cannot complete it for points twice
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

    // mapping to see where this user is in their clues 
    var hintTwoDisplayedTo = []
    var hintThreeDisplayedTo = []
    var solutionDisplayed = []

    if (huntItem.hint2DisplayedTo) {
        hintTwoDisplayedTo = huntItem.hint2DisplayedTo.map(user => user._id)
    }
    if (huntItem.hint3DisplayedTo) {
        hintThreeDisplayedTo = huntItem.hint3DisplayedTo.map(user => user._id)
    }
    if (huntItem.solutionDisplayedTo) {
        solutionDisplayed = huntItem.solutionDisplayedTo.map(user => user._id)
    }

    // conditional displaying of which clues the user sees when this item location is loaded 
    const hintBody = () => {
        // if they have expanded all clues until solution
        if (solutionDisplayed.includes(currentUser._id)) {
            return (

                <>
                <ClueHeader huntItemName={huntItem.name} huntItemCategory={huntItem.category} huntItemCity={huntItem.city} />
                <ClueCard huntItemCategory={huntItem.Category} huntItemClue={huntItem.hint1} clueNumber={1} showButton={false} />
                <ClueCard huntItemCategory={huntItem.Category} huntItemClue={huntItem.hint2} clueNumber={2} showButton={false} />
                <ClueCard huntItemCategory={huntItem.Category} huntItemClue={huntItem.hint3} clueNumber={3} showButton={false} />
                <ClueSolution huntItemCategory={huntItem.Category} huntItemSolution={huntItem.solutionDescription} huntItemLocation={huntItem.solutionLocation} />
                </>
            )
        }

        // if they have expanded all clues except for the solution
        if (hintThreeDisplayedTo.includes(currentUser._id)) {
            return (
                <>
                    <ClueHeader huntItemName={huntItem.name} huntItemCategory={huntItem.category} huntItemCity={huntItem.city} />
                    <ClueCard huntItemCategory={huntItem.Category} huntItemClue={huntItem.hint1} clueNumber={1} showButton={false} />
                    <ClueCard huntItemCategory={huntItem.Category} huntItemClue={huntItem.hint2} clueNumber={2} showButton={false} />
                    <ClueCard huntItemCategory={huntItem.Category} huntItemClue={huntItem.hint3} clueNumber={3} showButton={true} />
                </>
            )
        }

        // if they have two clues expanded
        if (hintTwoDisplayedTo.includes(currentUser._id)) {
            return (
                <>
                    <ClueHeader huntItemName={huntItem.name} huntItemCategory={huntItem.category} huntItemCity={huntItem.city} />
                    <ClueCard huntItemCategory={huntItem.Category} huntItemClue={huntItem.hint1} clueNumber={1} showButton={false} />
                    <ClueCard huntItemCategory={huntItem.Category} huntItemClue={huntItem.hint2} clueNumber={2} showButton={true} />
                </>
            )
        }

        // if they have no clues expanded except for the original clue
        else {
            return (
                <>
                    <ClueHeader huntItemName={huntItem.name} huntItemCategory={huntItem.category} huntItemCity={huntItem.city} />
                    <ClueCard huntItemCategory={huntItem.Category} huntItemClue={huntItem.hint1} clueNumber={1} showButton={true} />
                </>
            )
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