import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { GET_HUNT_ITEM } from '../../utils/queries';

const HuntItemsView = () => {
    const navigate = useNavigate();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    const { huntItemId } = useParams();
    const { loading, data } = useQuery(GET_HUNT_ITEM, {
        variables: { huntItemId: huntItemId }
    });
    const huntItem = data?.huntItem || [];

    
    if (loading) {
        return <h2>LOADING.....</h2>
    }

    /*
    _id
    nam
    qrId 
    qrCode
    city
    category
    hint1
    hint2
    hint2DisplayedTo{
      __typename
      _id
      username
    }
    hint3
    hint3DisplayedTo{
      __typename
      _id
      username
    }
    solutionLocation
    solutionDescription
    solutionDisplayedTo{
      __typename
      _id
      username
    }
    solutionImg
    rewards {
        __typename
        _id
        name
        icon
        description
        points
    }
    points
    */

    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <Button onClick={()=> navigate('../admin/huntItems')} className={buttonStyles}>Hunt Items</Button>
            <h1>{huntItem.name}</h1>
            <p>QR Code:</p>
            <p><img src={huntItem.qrCode} alt={huntItem.qrCode} style={{width: '400px'}} /></p>
            <p>City: {huntItem.city}</p>
            <p>Category: {huntItem.category}</p>
            <p>Points awarded when found: {huntItem.points}</p>
            <p>Hint 1: {ReactHtmlParser(huntItem.hint1)}</p>
            <p>Hint 2: {ReactHtmlParser(huntItem.hint2)}</p>
            <p>Hint 3: {ReactHtmlParser(huntItem.hint3)}</p>
            <p>Solution Location: {huntItem.solutionLocation}</p>
            <p>Solution Description: {huntItem.solutionDescription}</p>
            <p>Solution Image: <img src={huntItem.solutionImg} alt={huntItem.solutionImg} style={{width: '100px', border: '1px solid black'}} /></p>
            <p>Guestbook:</p>
                {(huntItem.guestbook.length === 0) ? 'No guestbook entries.' : ''}
                {huntItem.guestbook && huntItem.guestbook.map(message => (
                    <div>{ReactHtmlParser(message)}</div>
                ))}
            <p>Rewards for finding this Scavenger Hunt Item:</p>
            <ul key={`${huntItem._id}-rewards`}>
                {(huntItem.rewards.length === 0) ? 'No rewards.' : ''}
                {huntItem.rewards && huntItem.rewards.map(badge => (
                    <li key={badge._id}>
                        <div>
                            <p>Name: {badge.name}</p>
                            <p><img src={badge.icon} alt={badge.icon} style={{width: '100px', border: '1px solid black'}} /></p>
                            <p>Description: {badge.description}</p>
                            <p>Points awarded when receive badge: {badge.points}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HuntItemsView;