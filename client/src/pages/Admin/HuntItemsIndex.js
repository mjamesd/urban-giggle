import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { GET_HUNT_ITEMS } from '../../utils/queries';
import { REMOVE_HUNT_ITEM } from '../../utils/mutations';

const Hunts = () => {
    const navigate = useNavigate();
    const { loading, data } = useQuery(GET_HUNT_ITEMS);
    const [removeHuntItem, { error: rHIerror }] = useMutation(REMOVE_HUNT_ITEM);

    // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
    const huntItems = data?.huntItems || [];

    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    if (loading) {
        return <h2>LOADING.....</h2>
    }

    const deleteHuntItem = async (huntItemId, huntItemName) => {
        // eslint-disable-next-line no-restricted-globals
        let confirmDelete = confirm(`Are you sure you want to delete the Scavenger Hunt Item "${huntItemName}"?`);
        if (confirmDelete) {
            try {
                const { data } = await removeHuntItem({
                    variables: { huntItemId: huntItemId },
                });
                alert(`Scavenger Hunt Item named "${data.removeHuntItem.name}" has been deleted.`);
            } catch (err) {
                console.log(err, rHIerror);
            }
            window.location.reload();
        }
    }

    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <h1>Hunt Items</h1>
            <Button onClick={() => navigate('./add')} className={buttonStyles}>Add Hunt Item</Button>
            <table>
                <thead>
                    <tr key="head">
                        <th>ID</th>
                        <th>Title</th>
                        <th>City</th>
                        <th>Category</th>
                        <th>Points</th>
                        <th>Hint 1</th>
                        <th>Hint 2</th>
                        <th>Hint 3</th>
                        <th>Solution Location</th>
                        <th>Solution Description</th>
                        <th>Solution Image</th>
                        <th>Rewards</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {huntItems.map(hunt => (
                        <tr key={hunt._id}>
                            <td>{hunt._id}</td>
                            <td>{hunt.name}</td>
                            <td>{hunt.city}</td>
                            <td>{hunt.description}</td>
                            <td>{hunt.points}</td>
                            <td>{hunt.huntItems.length}</td>
                            <td>{hunt.rewards.length}</td>
                            <td>
                                <Button onClick={() => navigate(`./view/${hunt._id}`)} className={buttonStyles}>View</Button>
                                <Button onClick={() => navigate(`./edit/${hunt._id}`)} className={buttonStyles}>Edit</Button>
                                <Button onClick={() => deleteHuntItem(hunt._id, hunt.name)} className={buttonStyles}>Delete</Button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    );

}

export default Hunts;