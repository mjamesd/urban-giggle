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
    const [removeHunt, { error: rHerror }] = useMutation(REMOVE_HUNT);
    const hunts = data?.hunts || [];

    const { button: buttonStyles } = useBlogTextInfoContentStyles();

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

    if (loading || hunts.length === 0) {
        return <h2>LOADING.....</h2>
    }

    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <h1>Scavenger Hunts</h1>
            <Button onClick={() => navigate('./add')} className={buttonStyles}>Add Hunt</Button>
            <table>
                <thead>
                    <tr key="head">
                        <th>Title</th>
                        <th>City</th>
                        <th>Points</th>
                        <th># of Hunt Items</th>
                        <th># of Rewards</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {hunts.map(hunt => (
                        <tr key={hunt._id}>
                            <td>{hunt.name}</td>
                            <td>{hunt.city}</td>
                            <td>{hunt.points}</td>
                            <td>{hunt.huntItems.length}</td>
                            <td>{hunt.rewards.length}</td>
                            <td>
                                <Button onClick={() => navigate(`./view/${hunt._id}`)} className={buttonStyles}>View</Button>
                                <Button onClick={() => navigate(`./viewQRcodes/${hunt._id}`)} className={buttonStyles}>QR Codes</Button>
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