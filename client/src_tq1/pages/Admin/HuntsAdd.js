import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
import Auth from '../../utils/auth';

// imports for GQL
import { GET_HUNT_ITEMS, GET_BADGES } from '../../utils/queries';
import { CREATE_HUNT } from '../../utils/mutations';

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

const HuntsAdd = () => {
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
    const [createHunt] = useMutation(CREATE_HUNT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const pointsInt = parseInt(formState.points);
            const { data } = await createHunt({
                variables: { ...formState, points: pointsInt },
            });
            alert(`Scavenger Hunt "${formState.name}" added!`);
            if (Auth.getProfile().data.userType === 'organizer') {
                navigate(`./view/${data.createHunt._id}`);
            } else {
                navigate('../admin/hunts '); // go to index page
            }
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const getHuntItemName = (huntItemId) => {
        let huntItemName = '';
        huntItems.forEach(huntItem => {
            if (huntItem._id === huntItemId)
            huntItemName = huntItem.name;
        });
        return huntItemName;
    }

    const getBadgeName = (badgeId) => {
        let badgeName = '';
        badges.forEach(badge => {
            if (badge._id === badgeId)
                badgeName = badge.name;
        });
        return badgeName;
    }

    // get specified Hunt
    // need to specify unique name for loading, data, and error
    const { loading: loadingHuntItems, data: huntItemsData } = useQuery(GET_HUNT_ITEMS);
    const { loading: loadingBadges, data: badgesData } = useQuery(GET_BADGES);

    // get response or nothing
    const huntItems = huntItemsData?.huntItems || [];
    const badges = badgesData?.badges || [];

    // check if any are still loading
    if (loadingHuntItems || loadingBadges) {
        return <h2>LOADING.....</h2>; // will reload/rerender here until data is loaded...
    }
    
    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <h1>Add a New Hunt</h1>
            <p><strong>Note:</strong> It's better to <Link style={{border: '1px solid red'}} to="/admin/huntItems/add">create your Scavenger Hunt Locations first</Link>, then you can add them to the Scavenger Hunt here.</p>
            <form onSubmit={handleFormSubmit}>
                <FormControl variant='outlined'>
                    <TextField variant='outlined' label="name" name="name" type="text" value={formState.name} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="city" name="city" type="text" value={formState.city} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="description" name="description" type="text" value={formState.description} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="points" name="points" type="number" value={formState.points} onChange={handleChange} /><br />
                    <FormGroup key="huntItems">
                        <h3>Choose Hunt Items/Locations to include in the Scavenger Hunt</h3>
                        <Select
                            labelId="huntItems-label"
                            id="huntItems"
                            multiple
                            value={formState.huntItems}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-huntItems-chip" label="Chip" />}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  <Chip key={value} label={getHuntItemName(value)} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            name="huntItems"
                        >
                            {huntItems.map((huntItem) => (
                                <MenuItem
                                    key={huntItem._id}
                                    value={huntItem._id}
                                    style={getStyles(huntItem._id, formState.huntItems, theme)}
                                >
                                    {huntItem.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormGroup>
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
                        <Button className={buttonStyles} type="submit">Create Hunt</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
  )
};

export default HuntsAdd;