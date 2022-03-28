//react
import React from 'react'
import ReactHtmlParser from 'react-html-parser';

// styles
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent } from '@material-ui/core';
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


const ClueSolution = ({ huntItemSolution, huntItemLocation, huntItemCategory }) => {
    const styles = useStyles()
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });

    return (
        <Card style={{ width: '400px' }} className={cx(styles.root, shadowStyles.root)}>
            <CardContent>
                <TextInfoContent
                    classes={textCardContentStyles}
                    overline={huntItemCategory}
                    heading={`FINAL HINT`}
                    />
                    <div style={{ textAlign: 'center' }}>
                        <p>{ReactHtmlParser(huntItemSolution)}</p>
                        <p>{ReactHtmlParser(huntItemLocation)}</p>
                    </div>
            </CardContent>
        </Card>
    )
}

export default ClueSolution