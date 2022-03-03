import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import {FormControl} from '@mui/material/'


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
    selection: {
        margin: 10,
    },
    container: {
        width: 150,
        height: 150,
        background: 'white',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
}));


const Start = () => {

    const styles = useStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const textCardContentStyles = useN04TextInfoContentStyles();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                    <Card className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={'Welcome'}
                                heading={'Choose a City'} />
                            <FormControl fullWidth>
                                <Button component={Link} to={'/seattle'} className={buttonStyles}>Seattle</Button>
                                <br/>
                                <Button component={Link} to={'/spokane'} className={buttonStyles}>Spokane</Button>
                            </FormControl>
                        </CardContent>
                    </Card>
            </motion.div >
            );
        </>
    );
};

export default Start;
