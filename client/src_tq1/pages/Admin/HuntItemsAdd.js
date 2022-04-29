import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import {
    FormControl,
    FormGroup,
    TextField,
} from '@mui/material/';
// imports for select menus
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// imports for GQL
import { GET_BADGES } from '../../utils/queries';
import { CREATE_HUNT_ITEM } from '../../utils/mutations';

import Auth from '../../utils/auth';

// MenuProps for multiple select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

function getStyles(item, collection, theme) {
    return {
        fontWeight:
            collection.indexOf(item) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
        mx: '5px',
    };
}

const HuntItemsAdd = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    // state for form
    const [formState, setFormState] = useState({
        name: '',
        city: '',
        category: '',
        hint1: '',
        hint2: '',
        hint3: '',
        solutionLocation: '',
        solutionDescription: '',
        solutionImg: '',
        points: null,
        rewards: [],
    });

    // mutation
    const [createHuntItem] = useMutation(CREATE_HUNT_ITEM);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const pointsInt = parseInt(formState.points);
            const { data } = await createHuntItem({
                variables: { ...formState, points: pointsInt },
            });
            alert(`Scavenger Hunt Item "${data.createHuntItem.name}" added!`);
            if (Auth.getProfile().data.userType === 'organizer') {
                navigate(`./view/${data.createHuntItem._id}`);
            } else {
                navigate('../admin/huntItems '); // go to index page
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const getBadgeName = (badgeId) => {
        let badgeName = '';
        badges.forEach(badge => {
            if (badge._id === badgeId)
                badgeName = badge.name;
        });
        return badgeName;
    }

    // get specified HuntItem
    // need to specify unique name for loading, data, and error
    const { loading: loadingBadges, data: badgesData } = useQuery(GET_BADGES);

    // get response or nothing
    const badges = badgesData?.badges || [];

    // check if any are still loading
    if (loadingBadges || badges.length === 0) {
        return <h2>LOADING.....</h2>; // will reload/rerender here until data is loaded...
    }

    return (
        <div style={{ marginLeft: '2em' }}>
            <h1>Add a New Hunt Item</h1>
            <form onSubmit={handleFormSubmit}>
                <FormControl variant='outlined'>
                    <TextField variant='outlined' label="name" name="name" type="text" value={formState.name} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="city" name="city" type="text" value={formState.city} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="category" name="category" type="text" value={formState.category} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="hint1" name="hint1" type="text" value={formState.hint1} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="hint2" name="hint2" type="text" value={formState.hint2} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="hint3" name="hint3" type="text" value={formState.hint3} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="points" name="points" type="number" value={formState.points} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="solutionLocation" name="solutionLocation" type="text" value={formState.solutionLocation} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="solutionDescription" name="solutionDescription" type="text" value={formState.solutionDescription} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="solutionImg" name="solutionImg" type="text" value={formState.solutionImg} onChange={handleChange} /><br />
                    <FormGroup variant='outlined' key="rewards">
                        <h3>Choose Badge(s) as reward for finding the Scavenger Hunt Item</h3>
                        <Select
                            labelId="rewards-label"
                            id="rewards"
                            multiple
                            value={formState.rewards}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-rewards-chip" label="Chip" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={getBadgeName(value)} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                            name="rewards"
                        >
                            {badges.map((badge) => (
                                <MenuItem
                                    key={badge._id}
                                    value={badge._id}
                                    name={badge.name}
                                    style={getStyles(badge._id, formState.rewards, theme)}
                                >
                                    {badge.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormGroup>
                    <br />
                    <FormGroup variant='outlined' key="submitForm">
                        <Button className={buttonStyles} type="submit">Create Hunt Item</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    )
};

export default HuntItemsAdd;