import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';

import {
    FormControl,
    TextField,
} from '@mui/material/'
import { NoEncryption } from '@mui/icons-material';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
    root: {
        maxWidth: 343,
        margin: 'auto',
        borderRadius: 12,
        padding: 12,
        boxShadow: 0
    },
    img: {
        maxWidth: '80%',
        maxHeight: '90%',
        margin: 'auto',
        borderRadius: 0,
        position: 'relative',
        borderRadius: spacing(2), // 16px
        transition: '0.3s',
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        [breakpoints.up('md')]: {
            flexDirection: 'row',
            padding: spacing(10),
        },
    },
    media: {
        borderRadius: 6,
    },
    selection: {
        margin: 10,
    }
}));


const Start = () => {

    const styles = useStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const mediaStyles = useCoverCardMediaStyles();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    const [city, setCity] = React.useState('');

    const handleChange = (event) => {
        setCity(event.target.value);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
        >
            <Card className={cx(styles.img, shadowStyles.root)}>
                <CardMedia
                    classes={mediaStyles}
                    image={
                        'https://uploads.visitseattle.org/2017/02/30115610/IMG_1491.jpg'
                    }
                />
                <CardActionArea>
                    <Card className={styles.root}>
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
                                <Button className={buttonStyles}>Next</Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Card>
        </motion.div >
    );
};

export default Start;
