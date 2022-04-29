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
            <p><strong>Completed Scavenger Hunts:</strong></p>
            <ul key="completedHunts" style={{borderBottom: '1px solid #000'}}>
                {(!user.completedHunts || user.completedHunts.length === 0) ? (<p><em>No completed scavenger hunts</em></p>) : ''}
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
            <p><strong>Found Scavenger Hunt Locations:</strong></p>
            <ul key="foundHuntItems" style={{borderBottom: '1px solid #000'}}>
                {(!user.foundHuntItems || user.foundHuntItems.length === 0) ? (<p><em>No found scavenger hunt locations</em></p>) : ''}
                {user.foundHuntItems && user.foundHuntItems.map(huntItem => (
                    <li key={huntItem._id}>
                        <div>
                            <p>Name: {huntItem.name}</p>
                            <p>City: {huntItem.city}</p>
                            <p>Category: {huntItem.category}</p>
                            <p>Solution Location: {huntItem.solutionLocation}</p>
                            <p>Solution Description: {huntItem.solutionDescription}</p>
                            <p>Solution Image:<br />
                                <img src={huntItem.solutionImg} alt={huntItem.solutionImg} style={{width: '100px', border: '1px solid #000'}} />
                            </p>
                            <p>Guestbook:</p>
                                {(!huntItem.guestbook || huntItem.guestbook.length === 0) ? (<p><em>No guestbook entries</em></p>) : ''}
                                {huntItem.guestbook && huntItem.guestbook.map(message => (
                                    <div>{ReactHtmlParser(message)}</div>
                                ))}
                        </div>
                    </li>
                ))}
            </ul>
            <p><strong>Badges:</strong></p>
            <ul key="badges">
                {(!user.badges || user.badges.length === 0) ? (<p><em>No badges</em></p>) : ''}
                {user.badges && user.badges.map(badge => (
                    <li key={badge._id}>
                        <div>
                            <p>Name: {badge.name}</p>
                            <p>Icon:<br />
                                <img src={`/img/badges/${badge.icon}`} alt={badge.icon} style={{ width: '100px', border: '1px solid #000' }} />
                            </p>
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