import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { GET_USER } from '../../utils/queries';

const UsersView = () => {
    const navigate = useNavigate();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    const { userId } = useParams();
    const { loading, data } = useQuery(GET_USER, {
        variables: { userId: userId }
    });
    const user = data?.user || [];

    
    if (loading) {
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
            <Button onClick={()=> navigate('../admin/users')} className={buttonStyles}>Users</Button>
            <h1>{user.username}</h1>
            <p>User Type: <strong>{user.userType}</strong></p>
            <p>Email address: {user.email}</p>
            <p>Current # of Points: {user.points}</p>
            <p>Created: {user.createdAt}</p>
            <p>Completed Scavenger Hunts:</p>
            <ul key="completedHunts">
                {(user.completedHunts.length === 0) ? 'No completed scavenger hunts.' : ''}
                {user.completedHunts && user.completedHunts.map(hunt => (
                    <li key={hunt._id}>
                        <div>
                            <p>Name: {hunt.name}</p>
                            <p>City: {hunt.city}</p>
                            <p>Description: {hunt.description}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <p>Found Scavenger Hunt Locations:</p>
            <ul key="foundHuntItems">
                {(user.foundHuntItems.length === 0) ? 'No found scavenger hunt locations.' : ''}
                {user.foundHuntItems && user.foundHuntItems.map(huntItem => (
                    <li key={huntItem._id}>
                        <div>
                            <p>Name: {huntItem.name}</p>
                            <p>City: {huntItem.city}</p>
                            <p>Category: {huntItem.category}</p>
                            <p>Hint 1: {huntItem.hint1}</p>
                            <p>Hint 2: {huntItem.hint2}</p>
                            <p>Hint 3: {huntItem.hint3}</p>
                            <p>Solution Location: {huntItem.solutionLocation}</p>
                            <p>Solution Description: {huntItem.solutionDescription}</p>
                            <p>Solution Image: <img src={huntItem.solutionImg} alt={huntItem.solutionImg} style={{width: '100px', border: '1px solid black'}} /></p>
                            <p>Guestbook:</p>
                                {(huntItem.guestbook.length === 0) ? 'No guestbook entries.' : ''}
                                {huntItem.guestbook && huntItem.guestbook.map(message => (
                                    <div>{ReactHtmlParser(message)}</div>
                                ))}
                        </div>
                    </li>
                ))}
            </ul>
            <p>Badges:</p>
            <ul key="badges">
                {(user.badges.length === 0) ? 'No badges.' : ''}
                {user.badges && user.badges.map(badge => (
                    <li key={badge._id}>
                        <div>
                            <p>Name: {badge.name}</p>
                            <p>Icon: <img src={`/img/badges/${badge.icon}`} alt={badge.icon} style={{ width: '100px', border: '1px solid black' }} /></p>
                            <p>Description: {badge.description}</p>
                            <p>Points: {badge.points}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default UsersView;