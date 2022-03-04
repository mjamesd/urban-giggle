import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import {
    FormControl,
    FormGroup,
    // FormControlLabel,
    // Checkbox,
    // InputAdornment,
    // InputLabel,
    // OutlinedInput,
    // IconButton,
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

const HuntAdd = React.memo(() => {
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
    const [createHunt, { error: createError }] = useMutation(CREATE_HUNT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const pointsInt = parseInt(formState.points);
            const { data } = await createHunt({
                variables: { ...formState, points: pointsInt },
            });
            alert(`Scavenger Hunt "${formState.name}" added!`);
        } catch (err) {
            console.log(err);
        }
        navigate('../admin/hunts '); // go to index page
    };

    const handleChange = (event) => {
        let { name, value } = event.target;
        console.log('changed: ', name, ': ', value);

        setFormState({ ...formState, [name]: value });
        console.log('STATE CHANGED!!!!', formState);
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
            console.log(badge._id);
            console.log(badgeId);
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
    // else if (!loadingHuntItems && !loadingBadges) {
    //     // by now we have the specified Hunt and can update the formState with its values
    //     setFormState({
    //         huntId: hunt._id,
    //         name: hunt.name,
    //         city: hunt.city,
    //         description: hunt.description,
    //         points: hunt.points,
    //         huntItems: hunt.huntItems.map(huntItem => huntItem._id),
    //         rewards: hunt.rewards.map(reward => reward._id),
    //     });
    // }
    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <h1>Add a New Hunt</h1>
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
});

export default HuntAdd;