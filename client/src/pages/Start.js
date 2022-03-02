import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import {FormControl} from '@mui/material/'

import City from './City'

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

    const [city, setCity] = React.useState(true);

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                {city ?

                    <Card className={cx(styles.root, shadowStyles.root)}>
                        <CardContent>
                            <TextInfoContent
                                classes={textCardContentStyles}
                                overline={'Welcome'}
                                heading={'Choose a City'} />
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">City</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={city}
                                    label="City"
                                    className={styles.selection}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Seattle</MenuItem>
                                    <br />
                                    <MenuItem value={20}>Spokane</MenuItem>

                                </Select>
                                <Button onClick={() => setCity(false)} className={buttonStyles}>Next</Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                    : <City />}
            </motion.div >
            );
        </>
    );
};

export default Start;
