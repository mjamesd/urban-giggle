import React from 'react'
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';


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

const KerryPark = () => {
    const styles = useStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

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
                            heading={'SECRET GEM'}
                            body={
                                <>
                                    <h2>HINT NUMBER 1</h2>
                                    <p>Royal view of Seattle</p>
                                    <Button className={buttonStyles}>Need another hint? (-1 pt)</Button>
                                </>
                            }
                        />
                    </CardContent>
                </Card>
            </main>
        </motion.div>
    );
};

export default KerryPark