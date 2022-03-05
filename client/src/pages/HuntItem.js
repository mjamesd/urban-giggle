import React, { useState } from 'react'
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_HUNT_ITEM, QUERY_ME } from '../utils/queries';
import { USER_ASKS_FOR_HINT, CHANGE_POINTS } from '../utils/mutations';

   
const useStyles = makeStyles(() => ({
    root: {
        maxWidth: 500,
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
    console.log(huntItemId)
    const { data: huntItemData, loading: huntItemLoading } = useQuery(GET_HUNT_ITEM, {
        // pass URL parameter
        variables: { huntItemId: huntItemId },
    });
    const { data: userData, loading: userLoading } = useQuery(QUERY_ME) 
    const [userAsksForHint, { error: userAsksForHintError }] = useMutation(USER_ASKS_FOR_HINT);

    const huntItem = huntItemData?.huntItem || {};
    const currentUser = userData?.me || {};
    console.log(huntItem, "HUNT ITEM")
    console.log(currentUser, "CURRENT USER!!")

    const [hintState, setHintState] = useState({
        _id: huntItemId,
        hint2: hint2DisplayedTo,
        hint3: huntItem.hint3,
    });

    console.log(hintState)

    const HintOneBody = () => {
        return (
            <div>
                <h2>HINT NUMBER 1</h2>
                <p>{huntItem.hint1}</p>
                <Button className={buttonStyles} onClick={hintTwo}>Need another hint? (-1 pt)</Button>
            </div>
        )
    }  

    const HintTwoBody = () => {
        return (
            <div>
                <h2>HINT NUMBER 1</h2>
                <p>{huntItem.hint2}</p>
                <Button className={buttonStyles} onClick={hintThree}>Need another hint? (-1 pt)</Button>
            </div>
        )
    } 

    const HintThreeBody = () => {
        return (
            <div>
                <h2>HINT NUMBER 1</h2>
                <p>{huntItem.hint3}</p>  
                    <Button className={buttonStyles} onClick={huntItemSolution}>Need another hint? (-1 pt)</Button>
            </div>
        )
    } 

    const DisplayHintTwo = async () => {
        console.log("HINT ONE CLICKED!!!")
        // const { data: hintData } = await userAsksForHint({
        //     variables: { ...hintState,
        //     points: deductPoint },
        // });
    }

    const displayHintThree = async () => {
        console.log("HINT TWO CLICKED!!!")
        // const { data: hintData } = await userAsksForHint({
        //     variables: { ...hintState,
        //     points: deductPoint },
        // });
    }

    if (huntItemLoading) {
        return <h2>LOADING.....</h2>
    } 



    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
    >
        <main>
                <Card className={cx(styles.root, shadowStyles.root)}>
                    <CardContent>
                        <TextInfoContent
                        classes={textCardContentStyles}
                            overline={'SEATTLE'}
                            heading={'SECRET RESTAURANT'}
                            body={<CardOneBody />} />
                        />
                    </CardContent>
                </Card>
            </main>
        </motion.div>
    );
};

export default HuntItem