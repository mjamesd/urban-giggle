// react imports
import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';

// auth and apollo imports
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../utils/mutations';

// styling
import Button from '@material-ui/core/Button';
import { FormControl, InputAdornment, InputLabel, OutlinedInput, IconButton, TextField } from '@mui/material/'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';

// helpers and other modules
import { validateEmail, validatePassword } from '../../utils/helpers';
import { init, sendForm } from '@emailjs/browser';

init("NZ0ltP_Q1eOniKe9w");

//main export function
const SignUpForm = () => {
  const { button: buttonStyles } = useBlogTextInfoContentStyles();

  // ref for the email confirmation variables
  const form = useRef();

  // form states
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // mutation for creating the user
  const [createUser] = useMutation(CREATE_USER);

  // validation messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('')

  // handling the onchange as information is being inputed into the form
  const handleChange = (event) => {
    const { target } = event;
    const inputType = target.name;
    const inputValue = target.value.trim();

    if (inputType === 'username') {
      setUsername(inputValue);
    } else if (inputType === 'email') {
      setEmail(inputValue);
    } else if (inputType === 'password') {
      setPassword(inputValue);
    }
  };

  // handles the show of the password when eyeball is clicked
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // submition of the signup form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // console.log("form?", form);

    // validation process
    if (!username) {
      setErrorMessage('Please enter a username');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (!password) {
      setErrorMessage('please enter a valid password');
      return;
    }

    // creating the new user
    try {
      const { data } = await createUser({
        variables: { username: username, email: email, password: password },
      });
      Auth.signup(data.createUser.token);
      setSuccessMessage('Welcome!! Your are now signed up!')
      sendForm("service_k0uycid", "template_0jr5hbi", form.current, "NZ0ltP_Q1eOniKe9w")
      
    } catch (e) {
      setErrorMessage("I'm sorry, something has gone wrong. Please try again")
    }


    // clear form values
    setUsername('')
    setEmail('')
    setPassword('')
    setShowPassword(false)
  };


  return (
    <><form ref={form} onSubmit={handleFormSubmit}>
      <FormControl variant="outlined">
        <TextField variant="outlined" label="Username" name="username" type="text" value={username} onChange={handleChange} /><br />
        <TextField variant="outlined" label="Email" name="email" type="email" value={email} onChange={handleChange} /><br />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
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
            label="Password" />
        </FormControl><br />
        <Button className={buttonStyles} type="submit" value="send">Signup</Button></FormControl><br />
      {errorMessage && (

        <p>{errorMessage}</p>

      )}
      {successMessage && (

        <p>{successMessage}</p>

      )}</form><br /><span>Already have an account? <Link to="/login">Login Here!</Link></span></>
  )
}

export default SignUpForm