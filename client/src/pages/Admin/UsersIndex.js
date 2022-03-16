import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { GET_USERS } from '../../utils/queries';
// import { REMOVE_USER } from '../../utils/mutations';

const UsersIndex = () => {
    const navigate = useNavigate();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();
    const { loading, data, error } = useQuery(GET_USERS);
    // const [removeUser, { error: rUerror }] = useMutation(REMOVE_USER);

    if (error) console.log('GET_USERS query error:', error);
    const users = data?.users || [];

    if (loading || users.length === 0) {
        return <h2>LOADING.....</h2>
    }

    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <h1>Hunt Items</h1>
            <Button onClick={() => navigate('./add')} className={buttonStyles}>Add User</Button>
            <table>
                <thead>
                    <tr key="head">
                        <th>Username</th>
                        <th>User Type</th>
                        <th>Email</th>
                        <th>Points</th>
                        <th># of Completed Hunts</th>
                        <th># of Found Hunt Items</th>
                        <th># of Badges</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.username}</td>
                            <td>{user.userType}</td>
                            <td>{user.email}</td>
                            <td>{user.points}</td>
                            <td>{user.completedHuntsCount}</td>
                            <td>{user.foundHuntItemsCount}</td>
                            <td>{user.badges.length}</td>
                            <td>
                                <Button onClick={() => navigate(`./view/${user._id}`)} className={buttonStyles}>View</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default UsersIndex;