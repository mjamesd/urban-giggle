import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { validateEmail, validatePassword } from '../utils/helpers';

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


const UpdateUserForm = () => {
  const { button: buttonStyles } = useBlogTextInfoContentStyles();


  // state values for the password box 
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    showPassword: false,
  });
  const [createUser, { error, data }] = useMutation(CREATE_USER);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(values);

    if (!values.username) {
      setErrorMessage('Please enter a username');
      return;
    }

    if (!validateEmail(values.email)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    if (!values.password) {
      setErrorMessage('please enter a valid password');
      return;
    }

    if (values.username && values.email && values.password) {
      setSuccessMessage(
        'Welcome!! Your are now signed up!'
      )
    }


    try {
      const { data } = await createUser({
        variables: { username: values.username, email: values.email, password: values.password },
      });

      Auth.login(data.createUser.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setValues({
      username: '',
      email: '',
      password: '',
      showPassword: false,
    });

    setErrorMessage('');
  };


  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl variant="outlined">
        <TextField variant="outlined" label="Username" type="text" value={values.username} onChange={handleChange('username')} /><br />

        <TextField variant="outlined" label="Email" type="email" value={values.email} onChange={handleChange('email')} /><br />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            variant="outlined"
            id="password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl><br />
        <Button className={buttonStyles} type="submit" value="send">Signup</Button></FormControl><br />
      {errorMessage && (

        <p>{errorMessage}</p>

      )}
      {successMessage && (

        <p>{successMessage}</p>

      )}</form>
  )
}

export default UpdateUserForm