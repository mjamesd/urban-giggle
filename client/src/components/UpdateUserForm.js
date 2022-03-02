import React, { useState, useRef } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useMutation } from '@apollo/client';

import { UPDATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { validateEmail, validatePassword } from '../utils/helpers';
import { init, sendForm } from '@emailjs/browser';

import {
    FormControl,
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


init("NZ0ltP_Q1eOniKe9w");

const UpdateUserForm = ({ user }) => {
    const { button: buttonStyles } = useBlogTextInfoContentStyles();


    // form ref for sending any emails
    const form = useRef();
    const { _id } = useParams();
    const navigate = useNavigate()

    // username states
    const [username, setUsername] = useState(`${user.username}`)

    // email states
    const [email, setEmail] = useState(`${user.email}`)

    // password states
    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    // showing the password or not when clicking the eyeball
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    // mutation for update user
    const [updateUser, { error, data }] = useMutation(UPDATE_USER);

    // validation messages
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('')


    // handling the input changes as typed into the form
    const handleChange = (event) => {
        const { target } = event;
        const inputType = target.name;
        const inputValue = target.value;

        if (inputType === 'username') {
            setUsername(inputValue);
        } else if (inputType === 'email') {
            setEmail(inputValue);
        } else if (inputType === 'password') {
            setPassword(inputValue);
        } else if (inputType === 'confirmpassword') {
            setNewPassword(inputValue);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowPasswordConfirm = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!username) {
            setErrorMessage('Please enter a username');
            return;
        }

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address');
            return;
        }

        if (!password) {
            setErrorMessage('Your current password is required for update')
        }
        if (username && email && password && !newPassword) {
            try {
                const { data } = await updateUser({
                    variables: { username: username, email: email, password: password },
                });
                setShowPassword(false)
                setErrorMessage('');
                await navigate("/dashboard");
            } catch (e) {
                setErrorMessage("I'm sorry, something has gone wrong. Please try again")
                console.error(e);
            }
            return
        }

        if (password && newPassword && email && username) {
            try {
                const { data } = await updateUser({
                    variables: { username: username, email: email, password: password, newPassword: newPassword },
                });
                setShowPassword(false)
                setErrorMessage('');
                await navigate("/dashboard");
            } catch (e) {
                setErrorMessage("I'm sorry, something has gone wrong. Please try again")
                console.error(e);
            }
            return
        }


    //     try {
    //         const { data } = await updateUser({ ...data });
    //         setShowPassword(false)
    //         setErrorMessage('');
    //         await navigate("/dashboard");
    //     } catch (e) {
    //         setErrorMessage("I'm sorry, something has gone wrong. Please try again")
    //         console.error(e);
    //     }

    }


    return (
        <div>
            {Auth.loggedIn() ? (
                <form ref={form} onSubmit={handleFormSubmit}>
                    <FormControl variant="outlined">
                        Update Your Username
                        <TextField variant="outlined" name="username" type="text" value={username} onChange={handleChange} /><br /><br />
                        Update Your Email
                        <TextField variant="outlined" name="email" type="email" value={email} onChange={handleChange} /><br /><br />
                        Update Your Password
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Current Password</InputLabel>
                            <OutlinedInput
                                name="password"
                                variant="outlined"
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handleChange}
                                endAdornment={<InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>}
                                label="New Password" />
                        </FormControl><br />
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">New Password</InputLabel>
                            <OutlinedInput
                                name="confirmpassword"
                                variant="outlined"
                                id="password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={newPassword}
                                onChange={handleChange}
                                endAdornment={<InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPasswordConfirm}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>}
                                label="Confirm New Password" />
                        </FormControl><br />
                        <Button className={buttonStyles} type="submit" value="send">Submit Changes</Button></FormControl><br />
                    {errorMessage && (

                        <p>{errorMessage}</p>

                    )}
                    {successMessage && (

                        <p>{successMessage}</p>

                    )}</form>) : (
                <p>
                    You need to be logged in to update your profile. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
    )
}

export default UpdateUserForm