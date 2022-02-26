import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import SignUpForm from '../components/SignUpForm'

const Signup = () => {
  
  return (
      <main>
    <h1>SIGN UP PAGE!!!</h1>
    <SignUpForm/>
    </main>
  );
};

export default Signup;
