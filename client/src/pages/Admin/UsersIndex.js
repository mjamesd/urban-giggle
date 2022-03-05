import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { GET_USERS } from '../../utils/queries';
// import { REMOVE_USER } from '../../utils/mutations';

const UsersIndex = () => {
    const navigate = useNavigate();
    const { loading, data } = useQuery(GET_USERS);
    // const [removeUser, { error: rUerror }] = useMutation(REMOVE_USER);

    // Use optional chaining to check if data exists and if it has a thoughts property. If not, return an empty array to use.
    const users = data?.users || [];

    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    if (loading || users.length === 0) {
        return <h2>LOADING.....</h2>
    }

    /*

        __typename
        _id
        userType
        username
        email
        password
        points
        foundHuntItems {
            __typename
            _id
            name
        }
        completedHunts {
            __typename
            _id
            name
        }
        badges {
            __typename
            _id
            name
            icon
            description
            points
        }
        createdAt
    */

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
                            <td>{user.completedHunts.length}</td>
                            <td>{user.foundHuntItems.length}</td>
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