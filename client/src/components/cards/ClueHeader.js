//react
import React from 'react'
// import ReactHtmlParser from 'react-html-parser';

// styles
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

const useStyles = makeStyles(() => ({
    root: {
        Width: '250',
        margin: 'auto',
        borderRadius: 12,
        padding: 12,
    },
}));

const ClueHeader = ({ huntItemName, huntItemCategory, huntItemCity }) => {

    // style variables
    const styles = useStyles()
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });

    // formatting variables
    const category = huntItemCategory.charAt(0).toUpperCase() + huntItemCategory.slice(1)

    return (
        <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
            <CardContent>
                <TextInfoContent
                    classes={textCardContentStyles}
                    overline={huntItemCity}
                    // heading={ReactHtmlParser(huntItemName)} 
                    heading={huntItemName} 
                />
                {/* <h2 style={{ textAlign: 'center' }}>{ReactHtmlParser(category)}</h2> */}
                <h2 style={{ textAlign: 'center' }}>{category}</h2>
            </CardContent>
        </Card>
    )
}

export default ClueHeader