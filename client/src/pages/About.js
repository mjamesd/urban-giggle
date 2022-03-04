import React from 'react'
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
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

const About = () => {
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
                            overline={'Get to know us'}
                            heading={'ABOUT'}
                            body={
                                <>
                                <p>Just some cool devs doing cool things! 
                                    <br/> Graduates of the University of Washington Full-Stack Coding program, to be changers of the WORLD!!</p>
                                <h2><a href="https://github.com/DanPGolden">Dan Golden</a></h2>
                                <h2><a href="https://github.com/JustinM099">Justin Meredith</a></h2>
                                <h2><a href='https://github.com/lyssg2'>Lyss Garcia</a></h2>
                                <h2><a href='https://github.com/mjamesd'>Mark Drummond</a></h2>
                                <h2><a href="https://github.com/m-sherrill">Morgan Sherrill</a></h2>
                                </>
                            }
                        />
                    </CardContent>
                </Card>
            </main>
        </motion.div>
    );
};

export default About