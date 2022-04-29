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
import { CREATE_BADGE } from '../../utils/mutations';

const BadgesAdd = () => {
    const navigate = useNavigate();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    // state for form
    const [formState, setFormState] = useState({
        name: '',
        icon: '',
        description: '',
        points: '',
    });

    // mutation
    const [createBadge] = useMutation(CREATE_BADGE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const pointsInt = parseInt(formState.points);
            const { data } = await createBadge({
                variables: { ...formState, points: pointsInt },
            });
            alert(`Badge "${data.createBadge.name}" added!`);
        } catch (err) {
            console.log(err);
        }
        navigate('../admin/badges'); // go to index page
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };


    return (
        <div style={{ marginLeft: '2em' }}>
            <h1>Add a New Badge</h1>
            <form onSubmit={handleFormSubmit}>
                <FormControl variant='outlined'>
                    <TextField variant='outlined' label="name" name="name" type="text" value={formState.name} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="icon" name="icon" type="text" value={formState.icon} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="description" name="description" type="text" value={formState.description} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="points" name="points" type="number" value={formState.points} onChange={handleChange} /><br />
                    <FormGroup variant='outlined' key="submitForm">
                        <Button className={buttonStyles} type="submit">Create Badge</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
  )
};

export default BadgesAdd;