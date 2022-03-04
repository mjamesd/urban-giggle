import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import {
    FormControl,
    FormGroup,
    TextField,
} from '@mui/material/';

// imports for GQL
import { CREATE_USER } from '../../utils/mutations';

const UsersAdd = React.memo(() => {
    const navigate = useNavigate();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    // state for form
    const [formState, setFormState] = useState({
        username: '',
        userType: '',
        email: '',
        password: '',
    });

    // mutation
    const [createUser, { error: createError }] = useMutation(CREATE_USER);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
        try {
            const pointsInt = parseInt(formState.points);
            const { data } = await createUser({
                variables: { ...formState, points: pointsInt },
            });
            alert(`User "${formState.username}" added!`);
        } catch (err) {
            console.log(err);
        }
        navigate('../admin/users '); // go to index page
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };


    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <Button onClick={()=> navigate('../admin/users')} className={buttonStyles}>Users</Button>
            <h1>Add a New User</h1>
            <form onSubmit={handleFormSubmit}>
                <FormControl variant='outlined'>
                    <TextField variant='outlined' label="username" name="username" type="text" value={formState.username} onChange={handleChange} /><br />
                    <p>Note: must be one of these: "hunter", "organizer", or "admin".</p>
                    <TextField variant='outlined' label="userType" name="userType" type="text" value={formState.userType} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="email" name="email" type="text" value={formState.email} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="password" name="password" type="password" value={formState.password} onChange={handleChange} /><br />
                    <FormGroup variant='outlined' key="submitForm">
                        <Button className={buttonStyles} type="submit">Create Hunt Item</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
  )
});

export default UsersAdd;