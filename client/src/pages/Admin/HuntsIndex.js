import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { GET_HUNTS } from '../../utils/queries';
import { REMOVE_HUNT } from '../../utils/mutations';

const Hunts = () => {
    const navigate = useNavigate();
    const { loading, data } = useQuery(GET_HUNTS);
    const [removeHunt, { rHerror }] = useMutation(REMOVE_HUNT);

    // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
    const hunts = data?.hunts || [];

    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    if (loading) {
        return <h2>LOADING.....</h2>
    }

    const deleteHunt = async (huntId, huntName) => {
        // eslint-disable-next-line no-restricted-globals
        let confirmDelete = confirm(`Are you sure you want to delete the Scavenger Hunt "${huntName}"?`);
        if (confirmDelete) {
            try {
                const { data } = await removeHunt({
                    variables: { huntId: huntId },
                });
                alert(`Scavenger Hunt named "${data.removeHunt.name}" has been deleted.`);
            } catch (err) {
                console.log(err, rHerror);
            }
            window.location.reload();
        }
    }

    return (
        <div>
            <h1>Hunts</h1>
            <Button onClick={() => navigate('./add')} className={buttonStyles}>Add Hunt</Button>
            <table>
                <thead>
                    <tr key="head">
                        <th>ID</th>
                        <th>Title</th>
                        <th>City</th>
                        <th>Description</th>
                        <th>Points</th>
                        <th>Hunt Items</th>
                        <th>Rewards</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hunts.map(hunt => (
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
                                <Button onClick={() => deleteHunt(hunt._id, hunt.name)} className={buttonStyles}>Delete</Button>
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