import React from 'react'
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import CardContent from '@material-ui/core/CardContent';
import TextareaAutosize from '@mui/material/TextareaAutosize';
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

const Contact = () => {
    const styles = useStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });

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
                            overline={'We Need To Talk...'}
                            heading={'CONTACT'}
                            body={
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        '& > :not(style)': { m: 1 },
                                    }}
                                >
                                    <TextField id="demo-helper-text-misaligned-no-helper" label="Name" />
                                    <br />
                                    <TextField id="demo-helper-text-misaligned-no-helper" label="Email" />
                                    <br />
                                    <TextareaAutosize
                                        aria-label="empty textarea"
                                        placeholder="..."
                                        style={{ width: 200, height: 100 }}
                                    />
                                </Box>
                            }
                        />
                    </CardContent>
                </Card>
            </main>
        </motion.div>
    );
};

export default Contact