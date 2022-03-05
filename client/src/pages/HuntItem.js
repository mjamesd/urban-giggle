import React from 'react'
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
import { USER_ASKS_FOR_HINT } from '../utils/mutations';
import Stack from '@mui/material/Stack';


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
    console.log(huntItemId)
    const { data: huntItemData, loading: huntItemLoading } = useQuery(GET_HUNT_ITEM, {
        // pass URL parameter
        variables: { huntItemId: huntItemId },
    });
    const { data: userData, loading: userLoading } = useQuery(QUERY_ME)
    const [userAsksForHint, { error: userAsksForHintError }] = useMutation(USER_ASKS_FOR_HINT);

    const huntItem = huntItemData?.huntItem || {};
    const currentUser = userData?.me || {};

    if (huntItemLoading) {
        return <h2>LOADING.....</h2>
    }

    if (userLoading) {
        return <h2>LOADING.....</h2>
    }


    console.log(huntItem, "HUNT ITEM")
    console.log(currentUser, "CURRENT USER!!")

    const hintTwoDisplayedTo = huntItem.hint2DisplayedTo.map(user => user._id)
    const hintThreeDisplayedTo = huntItem.hint3DisplayedTo.map(user => user._id)
    const solutionDisplayed = huntItem.solutionDisplayedTo.map(user => user._id)




    const hintBody = () => {
        
        if (solutionDisplayed.includes(currentUser._id)) {
            return (
              <>  
              <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
            <CardContent>
                <TextInfoContent
                    classes={textCardContentStyles}
                    overline={`Unknown ${huntItem.category}`}
                    heading={`HINT NUMBER 1`}
                    body={<div>
                        <p>{huntItem.hint1}</p>
                        
                    </div>} />
            </CardContent>
        </Card>
              <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={`Unknown ${huntItem.category}`}
                                heading={`HINT NUMBER 2`}
                                body={<div>
                                    <p>{huntItem.hint2}</p>
                                   
                                </div>} />
                        </CardContent>
                    </Card><Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                            <CardContent>
                                <TextInfoContent
                                    classes={textCardContentStyles}
                                    overline={`Unknown ${huntItem.category}`}
                                    heading={`HINT NUMBER 3`}
                                    body={<div>
                                        <p>{huntItem.hint3}</p>
                                        
                                    </div>} />
                            </CardContent>
                        </Card>
            <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                <CardContent>
                    <TextInfoContent
                        classes={textCardContentStyles}
                        overline={`Unknown ${huntItem.category}`}
                        heading={`FINAL HINT`}
                        body={<div>
                            <p>{huntItem.solutionDescription}</p>
                            <p>{huntItem.solutionLocation}</p>
                        </div>} />
                </CardContent>
            </Card></>
            )
        }
           

        if (hintThreeDisplayedTo.includes(currentUser._id)) {
                return( 
                    <>
                    <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
            <CardContent>
                <TextInfoContent
                    classes={textCardContentStyles}
                    overline={`Unknown ${huntItem.category}`}
                    heading={`HINT NUMBER 1`}
                    body={<div>
                        <p>{huntItem.hint1}</p>
                        
                    </div>} />
            </CardContent>
        </Card>
                    <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={`Unknown ${huntItem.category}`}
                                heading={`HINT NUMBER 2`}
                                body={<div>
                                    <p>{huntItem.hint2}</p>
                                    
                                </div>} />
                        </CardContent>
                    </Card><Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                            <CardContent>
                                <TextInfoContent
                                    classes={textCardContentStyles}
                                    overline={`Unknown ${huntItem.category}`}
                                    heading={`HINT NUMBER 3`}
                                    body={<div>
                                        <p>{huntItem.hint3}</p>
                                        <Button className={buttonStyles} onClick={displaySolution}>Need Final Hint? (-1 pt)</Button>
                                    </div>} />
                            </CardContent>
                        </Card></>
            )
        }


        if (hintTwoDisplayedTo.includes(currentUser._id)) {
            return( 
                <><Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                    <CardContent>
                        <TextInfoContent
                            classes={textCardContentStyles}
                            overline={`Unknown ${huntItem.category}`}
                            heading={`HINT NUMBER 1`}
                            body={<div>
                                <p>{huntItem.hint1}</p>
                                
                            </div>} />
                    </CardContent>
                </Card><Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={`Unknown ${huntItem.category}`}
                                heading={`HINT NUMBER 2`}
                                body={<div>
                                    <p>{huntItem.hint2}</p>
                                    <Button className={buttonStyles} onClick={displayHintThree}>Need another hint? (-1 pt)</Button>
                                </div>} />
                        </CardContent>
                    </Card></>
             )
         }

         else {
             return(
            <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
            <CardContent>
                <TextInfoContent
                    classes={textCardContentStyles}
                    overline={`Unknown ${huntItem.category}`}
                    heading={`HINT NUMBER 1`}
                    body={<div>
                        <p>{huntItem.hint1}</p>
                        <Button className={buttonStyles} onClick={displayHintTwo}>Need another hint? (-1 pt)</Button>
                    </div>} />
            </CardContent>
        </Card>
             )
         }
        
    }



    const displayHintTwo = async () => {
        console.log("HINT ONE CLICKED!!!")
        const { data: hintData } = await userAsksForHint({
            variables: { huntItemId: huntItemId, hint2: true },
        });
        console.log(hintData)
    }

    const displayHintThree = async () => {
        console.log("HINT TWO CLICKED!!!")
        const { data: hintData } = await userAsksForHint({
            variables: { huntItemId: huntItemId, hint3: true },
        });
        console.log(hintData)
    }

    const displaySolution = async () => {
        console.log("Solution CLICKED!!!")
        const { data: hintData } = await userAsksForHint({
            variables: { huntItemId: huntItemId, solution: true },
        });
        console.log(hintData)
    }




    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >

            <main>
                <Stack spacing={2} justifyContent="center" alignItems="center">
                    
                   {hintBody()}
                </Stack>
            </main>
        </motion.div>
    );
};

export default HuntItem