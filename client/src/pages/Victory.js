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
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import CardMedia from '@material-ui/core/CardMedia';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import Wall from '../components/Wall'


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

            <main style={{ backgroundImage: `url(https://uploads.visitseattle.org/2017/02/30115610/IMG_1491.jpg)`, backgroundSize: 'cover', overflow: 'hidden', padding: '10vh' }}>
                <Card className={cx(styles.root, shadowStyles.root)}>

                    <CardContent>
                        <TextInfoContent
                            classes={textCardContentStyles}
                            overline={'You did it!'}
                            heading={'CONGRATULATIONS'}
                            body={<div>
                                <p>Congratulations on completing your hunt! You found the {huntItem.name}!</p>
                                <p>You just earned {huntItem.points} points!</p>
                                <p>{huntItem.rewards}</p>
                                <Button component={Link} to={`../`} className={buttonStyles}>Start Again</Button>
                            </div>
                            }
                        />
                    </CardContent>
                </Card>
                            <br />
                <Wall huntItemId={huntItem._id} />

            </main>
            <Confetti />
        </motion.div>
    );
};

export default Victory