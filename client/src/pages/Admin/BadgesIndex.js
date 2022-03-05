import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { GET_BADGES } from '../../utils/queries';
import { REMOVE_BADGE } from '../../utils/mutations';

const BadgesIndex = () => {
    const navigate = useNavigate();
    const { loading, data } = useQuery(GET_BADGES);
    const [removeBadge, { error: rBerror }] = useMutation(REMOVE_BADGE);

    const badges = data?.badges || [];

    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    const deleteBadge = async (badgeId, badgeName) => {
        // eslint-disable-next-line no-restricted-globals
        let confirmDelete = confirm(`Are you sure you want to delete the Badge "${badgeName}"?`);
        if (confirmDelete) {
            try {
                const { data } = await removeBadge({
                    variables: { badgeId: badgeId },
                });
                alert(`Badge named "${data.removeBadge.name}" has been deleted.`);
            } catch (err) {
                console.log(err, rBerror);
            }
            window.location.reload();
        }
    }

    if (loading || badges.length === 0) {
        return <h2>LOADING.....</h2>
    }

    /*
       __typename
        _id
        name
        icon
        description
        points
    */

    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={() => navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <h1>Badges</h1>
            <Button onClick={() => navigate('./add')} className={buttonStyles}>Add Badge</Button>
            <table >
                <thead>
                    <tr key="head">
                        <th>Name</th>
                        <th>Icon</th>
                        <th>Description</th>
                        <th>Points</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {badges.map(badge => (
                        <tr key={badge._id}>
                            <td>{badge.name}</td>
                            <td><img src={badge.icon} alt={badge.icon} style={{width: '100px', border: '1px solid black'}} /></td>
                            <td>{badge.description}</td>
                            <td>{badge.points}</td>
                            <td>
                                <Button onClick={() => navigate(`./view/${badge._id}`)} className={buttonStyles}>View</Button>
                                <Button onClick={() => navigate(`./edit/${badge._id}`)} className={buttonStyles}>Edit</Button>
                                <Button onClick={() => deleteBadge(badge._id, badge.name)} className={buttonStyles}>Delete</Button>
                            </td>
                        </tr>
                    )
                    )}
                </tbody>
            </table>
        </div>
    );

}

export default BadgesIndex;