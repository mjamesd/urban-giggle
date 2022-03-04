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
// imports for select menus
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// imports for GQL
import { GET_HUNT_ITEM, GET_BADGES } from '../../utils/queries';
import { UPDATE_HUNT_ITEM } from '../../utils/mutations';

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

const HuntItemsEdit = React.memo(() => {
    const navigate = useNavigate();
    const theme = useTheme();
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
    const [updateHuntItem, { error: updateError }] = useMutation(UPDATE_HUNT_ITEM);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const pointsInt = parseInt(formState.points);
            const { data } = await updateHuntItem({
                variables: { ...formState, points: pointsInt },
            });
            alert(`Scavenger Hunt Item "${formState.name}" updated!`);
        } catch (err) {
            console.log(err);
        }
        navigate('../admin/huntItems '); // go to index page
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
    const { huntItemId } = useParams();
    const { loading: loadingHuntItem, data: huntItemData } = useQuery(GET_HUNT_ITEM, {
        variables: { huntItemId: huntItemId }
    });
    const { loading: loadingBadges, data: badgesData } = useQuery(GET_BADGES);

    // get response or nothing
    const huntItem = huntItemData?.huntItem || {};
    const badges = badgesData?.badges || [];

    // check if any are still loading
    if (loadingHuntItem || loadingBadges) {
        return <h2>LOADING.....</h2>; // will reload/rerender here until data is loaded...
    } else if (!loadingHuntItem && !loadingBadges && !formState.name) {
        // by now we have the specified HuntItem and can update the formState with its values
        setFormState({...huntItem, huntItemId: huntItem._id, rewards: huntItem.rewards.map(reward => reward._id)});
    }

    console.log('THIS HUNT ITEM:', huntItem);

    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <Button onClick={()=> navigate('../admin/huntItems')} className={buttonStyles}>Hunt Items</Button>
            <h1>Edit Hunt Item "{huntItem.name}"</h1>
            <form onSubmit={handleFormSubmit}>
                <FormControl variant='outlined'>
                    <TextField variant='outlined' label="name" name="name" type="text" value={formState.name} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="city" name="city" type="text" value={formState.city} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="category" name="category" type="text" value={formState.category} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="points" name="points" type="number" value={formState.points} onChange={handleChange} /><br />
                    <FormGroup variant='outlined' key="rewards">
                        <h3>Choose Badge(s) as reward for completing the Scavenger Hunt</h3>
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
                        <Button className={buttonStyles} type="submit">Update Hunt Item</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    )
});

export default HuntItemsEdit;