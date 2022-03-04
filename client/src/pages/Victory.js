import React from 'react'
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Confetti from 'react-confetti'
import { useQuery } from '@apollo/client';
import { GET_HUNT_ITEM_BY_QR_ID } from '../utils/queries';
import { useParams } from 'react-router-dom';


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
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const { qrId } = useParams();
    console.log('qrId: ', qrId)
    const { loading, data } = useQuery(GET_HUNT_ITEM_BY_QR_ID, {
        // pass URL parameter
        variables: { qrId: qrId },
    });
    console.log('Hunt Item Data: ', data)

    const huntItem = data?.huntItemByQrCode || {};
 


    if (loading) {
        return <h2>LOADING.....</h2>
    } 
   console.log('HUNT ITEM: ', huntItem)
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
                            overline={'You did it!'}
                            heading={'CONGRATULATIONS'}
                            body={<div>
                                <p>Congratulations on completing your hunt! You found the {huntItem.name}!</p>
                                <p>You just earned {huntItem.points} points!</p>
                                </div>
                            }
                        />
                    </CardContent>
                </Card>
            </main>
            <Confetti />
        </motion.div>
    );
};

export default Victory