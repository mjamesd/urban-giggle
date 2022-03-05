import React, { useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useMutation } from '@apollo/client';
import { UPDATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { validateEmail, validatePassword } from '../utils/helpers';
import { init, sendForm } from '@emailjs/browser';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import Confetti from 'react-confetti'
import { useQuery } from '@apollo/client';
import { GET_HUNT_ITEM_BY_QR_ID } from '../utils/queries';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { SIGN_GUEST_BOOK } from '../utils/mutations'

import {
    FormControl,
    Input,
    FormHelperText,
    FormGroup,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    IconButton,
    TextField,
} from '@mui/material/'
import {
    Visibility,
    VisibilityOff
} from '@mui/icons-material'

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



const Wall = ({ huntItemId}) => {

    const styles = useStyles();
    const mediaStyles = useCoverCardMediaStyles();
    const textCardContentStyles = useN04TextInfoContentStyles();
    const shadowStyles = useOverShadowStyles({ inactive: true });
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    // const [values, setValues] = useState({
    //     name: '',
    //     message: '',
    // });
    const [post, { error, data }] = useMutation(SIGN_GUEST_BOOK);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')
    const [message, setMessage] = useState('')

    const handleChange = (event) => {
        const { target } = event
        console.log('EVENT: ', event)
        const inputValue = target.value;
        setMessage(inputValue)
        console.log("CHANGE: ", message)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('EVENT ON CLICK: ', event)
        console.log('MESSAGE: ', message);


        try {
            const { data } = await post({
                variables: { huntItemId,  message: message },
            });

        } catch (err) {
            console.error(err);
            setErrorMessage('That did not work.');
        }

        setMessage('')
        setErrorMessage('');

    };



    return (
        <Card className={cx(styles.root, shadowStyles.root)}>
            <CardContent>
                <FormGroup>
                <FormControl>
                    <InputLabel htmlFor="note-input">Sign the wall!</InputLabel>
                    <Input id="note-input" aria-describedby="note-helper-text" onChange={handleChange}/>
                    <FormHelperText id="note-helper-text">Leave a note for those who will come later.</FormHelperText>
                    <Button onClick={handleFormSubmit} className={buttonStyles}>Submit</Button>
                </FormControl>
                </FormGroup>
            </CardContent>
        </Card>)
}

export default Wall