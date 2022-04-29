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
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

// imports for GQL
import { GET_USER, GET_HUNTS, GET_HUNT_ITEMS, GET_BADGES } from '../../utils/queries';
import { UPDATE_USER } from '../../utils/mutations';

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
    if (collection && collection.length > 0) {
        return {
            fontWeight:
                collection.indexOf(item) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
            mx: '5px',
        };
    }
    return null;
}

const UsersEdit = () => {
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
    const [updateUser, { error: updateError }] = useMutation(UPDATE_USER);

    // queries
    // need to specify unique name for loading, data, and error
    const { userId } = useParams();
    const { loading: loadingUser, data: userData } = useQuery(GET_USER, {
        variables: { userId: userId }
    });
    const { loading: loadingHunts, data: huntsData } = useQuery(GET_HUNTS);
    const { loading: loadingHuntItems, data: huntItemsData } = useQuery(GET_HUNT_ITEMS);
    const { loading: loadingBadges, data: badgesData } = useQuery(GET_BADGES);
    
    // get response or nothing
    const user = userData?.user || {};
    const hunts = huntsData?.hunts || [];
    const huntItems = huntItemsData?.huntItems || [];
    const badges = badgesData?.badges || [];

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const pointsInt = parseInt(formState.points);
            const { data } = await updateUser({
                variables: { ...formState, points: pointsInt },
            });
            alert(`User "${formState.name}" updated!`);
        } catch (err) {
            console.log(err);
        }
        navigate('../admin/huntItems '); // go to index page
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        setFormState({ ...formState, [name]: value });
    };

    const getHuntName = (huntId) => {
        let huntName = '';
        hunts.forEach(hunt => {
            if (hunt._id === huntId)
                huntName = hunt.name;
        });
        return huntName;
    }

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


    // check if any are still loading
    if (loadingHunts || loadingHuntItems || loadingBadges) {
        return <h2>LOADING.....</h2>; // will reload/rerender here until data is loaded...
    } else if (!loadingHunts && !loadingHuntItems && !loadingBadges && !formState.username) {
        // by now we have the specified HuntItem and can update the formState with its values
        setFormState({
            ...user,
            userId: user._id,
            foundHuntItems: user.foundHuntItems.map(item => item._id),
            completedHunts: user.completedHunts.map(item => item._id),
            badges: user.badges.map(item => item._id)
        });
    }

    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <Button onClick={()=> navigate('../admin/users')} className={buttonStyles}>Users</Button>
            <h1>Edit User "{user.username}"</h1>
            <form onSubmit={handleFormSubmit}>
                <FormControl variant='outlined'>
                    <TextField variant='outlined' label="username" name="username" type="text" value={formState.username} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="userType" name="userType" type="text" value={formState.userType} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="email" name="email" type="text" value={formState.email} onChange={handleChange} /><br />
                    <TextField variant='outlined' label="password" name="password" type="password" value={formState.password} onChange={handleChange} /><br />
                    <FormGroup variant='outlined' key="completedHunts">
                        <h3>Choose completed Scavenger Hunts</h3>
                        <Select
                            labelId="completedHunts-label"
                            id="completedHunts"
                            multiple
                            value={formState.completedHunts}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-completedHunts-chip" label="Chip" />}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  <Chip key={value} label={getHuntName(value)} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            name="completedHunts"
                        >
                            {hunts.map((hunt) => (
                                <MenuItem
                                    key={hunt._id}
                                    value={hunt._id}
                                    name={hunt.name}
                                    style={getStyles(hunt._id, formState.completedHunts, theme)}
                                >
                                    {hunt.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup variant='outlined' key="foundHuntItems">
                        <h3>Choose found Scavenger Hunt Locations</h3>
                        <Select
                            labelId="foundHuntItems-label"
                            id="foundHuntItems"
                            multiple
                            value={formState.foundHuntItems}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-foundHuntItems-chip" label="Chip" />}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  <Chip key={value} label={getHuntItemName(value)} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            name="foundHuntItems"
                        >
                            {huntItems.map((huntItem) => (
                                <MenuItem
                                    key={huntItem._id}
                                    value={huntItem._id}
                                    name={huntItem.name}
                                    style={getStyles(huntItem._id, formState.foundHuntItems, theme)}
                                >
                                    {huntItem.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup variant='outlined' key="badges">
                        <h3>Choose Badges</h3>
                        <Select
                            labelId="badges-label"
                            id="badges"
                            multiple
                            value={formState.badges}
                            onChange={handleChange}
                            input={<OutlinedInput id="select-multiple-badges-chip" label="Chip" />}
                            renderValue={(selected) => (
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                  <Chip key={value} label={getBadgeName(value)} />
                                ))}
                              </Box>
                            )}
                            MenuProps={MenuProps}
                            name="badges"
                        >
                            {badges.map((badge) => (
                                <MenuItem
                                    key={badge._id}
                                    value={badge._id}
                                    name={badge.name}
                                    style={getStyles(badge._id, formState.badges, theme)}
                                >
                                    {badge.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormGroup>
                    <br />
                    <FormGroup variant='outlined' key="submitForm">
                        <Button className={buttonStyles} type="submit">Update User</Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    )
};

export default UsersEdit;