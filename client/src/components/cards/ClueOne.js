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

const ClueOne = ({ huntItemCategory, huntItemClueOne, showButton }) => {
    // style variables
    const styles = useStyles()
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    // database and mutation variables
    const { huntItemId } = useParams()
    const [userAsksForHint, { error: userAsksForHintError }] = useMutation(USER_ASKS_FOR_HINT);

    // states
    const [errorMessage, setErrorMessage] = useState('');

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

    const displayButton = () => {
        if (showButton) {
            return (<Button className={buttonStyles} onClick={displayHintTwo}>Need another hint? (-1 pt)</Button>)
        }
    }

    return (
        <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
            <CardContent>
                <TextInfoContent
                    component="div"
                    classes={textCardContentStyles}
                    overline={huntItemCategory}
                    heading={`CLUE NUMBER 1`}
                />
                <div style={{ textAlign: 'center' }}>
                    <p>{ReactHtmlParser(huntItemClueOne)}</p>
                    <p>{displayButton()}</p>
                    {errorMessage && (

                        <p>{errorMessage}</p>)}
                </div>
            </CardContent>
        </Card>
    )
}

export default ClueOne