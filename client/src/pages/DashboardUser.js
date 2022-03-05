import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';

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

const DashboardUser = () => {
    const styles = useStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const navigate = useNavigate();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    return (

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
        >
            <main>
                <Card className={cx(styles.root, shadowStyles.root)}>
                    <CardContent>
                        <TextInfoContent
                            classes={textCardContentStyles}
                            overline={'Total Quest'}
                            heading={'User Dashboard'}
                            body={
                                <>
                                    <p><Button onClick={() => navigate(`./hunts`)} className={buttonStyles}>Completed Hunts</Button></p>
                                    <p><Button onClick={() => navigate(`./badges`)} className={buttonStyles}>Badges</Button></p>
                                </>
                            }
                        />
                    </CardContent>
                </Card>
            </main>
        </motion.div >
    );
};
export default DashboardUser;