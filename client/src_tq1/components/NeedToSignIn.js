// React Imports
import React from 'react'
import { Link } from 'react-router-dom';

// Styling
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

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

const NeedToSignIn = () => {
    const styles = useStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });

    return (
        <Card className={cx(styles.root, shadowStyles.root)} style={{ textAlign: 'center' }}>
            <CardContent>
                <TextInfoContent
                    classes={textCardContentStyles}
                    overline={'Oops...'}
                />
                <h1>Sign in to join the hunt!</h1>
                <div>
                    <p>You need to be logged in view this page. Please <Link to="/login">login</Link> or <Link to="/signup">signup</Link>.</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default NeedToSignIn