//react
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

// queries, mutations, and auth 
import { useMutation } from '@apollo/client';
import { USER_ASKS_FOR_HINT } from '../../utils/mutations';

// styles
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Button, CardContent } from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';

const useStyles = makeStyles(() => ({
    root: {
        Width: '250',
        margin: 'auto',
        borderRadius: 12,
        padding: 12,
    },
}));

const ClueCard = ({ huntItemCategory, huntItemClue, clueNumber, showButton }) => {
    // style variables
    const styles = useStyles()
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    // database and mutation variables
    const { huntItemId } = useParams()
    const [userAsksForHint] = useMutation(USER_ASKS_FOR_HINT);

    // states
    const [errorMessage, setErrorMessage] = useState('');


    // deciding which hint to display 
    const handleNewHint = async () => {
        if (clueNumber == 1) {
            displayHintTwo()
        } 
        
        if (clueNumber == 2) {
            displayHintThree() 
        } 

        if (clueNumber == 3 ) {
            displaySolution()
        }
    }


    // validation for points
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

    // The display button for getting the next hint
    const displayButton = () => {
        if (showButton) {
            return (<Button className={buttonStyles} onClick={handleNewHint}>Need another hint? (-1 pt)</Button>)
        }
    }

    return (
        <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
            <CardContent>
                <TextInfoContent
                    component="div"
                    classes={textCardContentStyles}
                    overline={huntItemCategory}
                    heading={`CLUE NUMBER ${clueNumber}`}
                />
                <div style={{ textAlign: 'center' }}>
                    <p>{ReactHtmlParser(huntItemClue)}</p>
                    <p>{displayButton()}</p>
                    {errorMessage && (

                        <p>{errorMessage}</p>)}
                </div>
            </CardContent>
        </Card>
    )
}

export default ClueCard