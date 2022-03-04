import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import {
    FormControl,
    FormGroup,
    TextField,
} from '@mui/material/';

// imports for GQL
import { GET_BADGE } from '../../utils/queries';
import { UPDATE_BADGE } from '../../utils/mutations';


const BadgesEdit = React.memo(() => {
    const navigate = useNavigate();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    // state for form
    const [formState, setFormState] = useState({
        name: '',
        city: '',
        description: '',
        points: '',
        huntItems: [],
        rewards: [],
    });

    // mutation
    const [updateBadge, { error: updateError }] = useMutation(UPDATE_BADGE);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const pointsInt = parseInt(formState.points);
            const { data } = await updateBadge({
                variables: { ...formState, points: pointsInt },
            });
            alert(`Badge "${formState.name}" updated!`);
        } catch (err) {
            console.log(err);
        }
        navigate('../admin/badges '); // go to index page
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    // get specified Badge
    // need to specify unique name for loading, data, and error
    const { badgeId } = useParams();
    const { loading, data } = useQuery(GET_BADGE, {
        variables: { badgeId: badgeId }
    });

    // get response or nothing
    const badge = data?.badge || [];

    // check if any are still loading
    if (loading) {
        return <h2>LOADING.....</h2>; // will reload/rerender here until data is loaded...
    }
    if (!loading && !formState.name) {
        // by now we have the specified Badge and can update the formState with its values
        setFormState({...badge, badgeId: badge._id});
    }

    console.log('THIS BADGE:', badge);

    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <Button onClick={()=> navigate('../admin/badges')} className={buttonStyles}>Badges</Button>
            <h1>Edit Badge "{badge.name}"</h1>
            <form onSubmit={handleFormSubmit}>
                <FormControl variant='outlined'>
                    <TextField variant='outlined' label="name" name="name" type="text" value={formState.name} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="icon" name="icon" type="text" value={formState.icon} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="description" name="description" type="text" value={formState.description} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="points" name="points" type="number" value={formState.points} onChange={handleChange} /><br />
                    <FormGroup variant='outlined' key="submitForm">
                        <Button className={buttonStyles} type="submit">Update Badge</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    )
});

export default BadgesEdit;