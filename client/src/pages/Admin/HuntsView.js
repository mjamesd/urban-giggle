import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import ReactHtmlParser from 'react-html-parser';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { GET_HUNT } from '../../utils/queries';

const HuntsView = () => {
    const navigate = useNavigate();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    const { huntId } = useParams();
    const { loading, data } = useQuery(GET_HUNT, {
        variables: { huntId: huntId }
    });
    const hunt = data?.hunt || [];
    
    if (loading) {
        return <h2>LOADING.....</h2>
    }

    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <Button onClick={()=> navigate('../admin/hunts')} className={buttonStyles}>Hunts</Button>
            <h1>{hunt.name}</h1>
            <p>City: {hunt.city}</p>
            <p>Description: {hunt.description}</p>
            <p>Points awarded when completed: {hunt.points}</p>
            <p>Locations to find in this Scavenger Hunt:</p>
            {hunt.huntItems.length === 0 ? 'No locations for this scavenger hunt.' : ''}
            <ul key={`${hunt._id}-huntItems`}>
                {hunt.huntItems.map(huntItem => (
                    <li key={huntItem._id}>
                        <div>
                            <p>Title: {huntItem.name}</p>
                            <p>City: {huntItem.city}</p>
                            <p>Category: {huntItem.category}</p>
                            <p>Points awarded when found: {huntItem.points}</p>
                            <p>QR Code:</p>
                            <p><img src={huntItem.qrCode} alt={huntItem.qrCode} /></p>
                            <p>Hint #1: {huntItem.hint1}</p>
                            <p>Hint #2: {huntItem.hint2}</p>
                            <p>Hint #3: {huntItem.hint3}</p>
                            <p>Solution Location: {huntItem.solutionLocation}</p>
                            <p>Solution Description: {huntItem.solutionDescription}</p>
                            <p><img src={huntItem.solutionImg} alt="solution" style={{width: '100px', border: '1px solid black'}} /></p>
                            <p>Guestbook:</p>
                                {(huntItem.guestbook.length === 0) ? 'No guestbook entries.' : ''}
                                {huntItem.guestbook && huntItem.guestbook.map(message => (
                                    <div>{ReactHtmlParser(message)}</div>
                                ))}
                        </div>
                    </li>
                ))}
            </ul>
            <p>Rewards for completing this Scavenger Hunt:</p>
            <ul key={`${hunt._id}-rewards`}>
                {(hunt.rewards.length === 0) ? 'No rewards for this scavenger hunt.' : ''}
                {hunt.rewards && hunt.rewards.map(badge => (
                    <li key={badge._id}>
                        <div>
                            <p>Name: {badge.name}</p>
                            <p><img src={badge.icon} alt={badge.icon} style={{width: '100px', border: '1px solid black'}} /></p>
                            <p>Description{badge.description}</p>
                            <p>Points awarded when receive badge: {badge.points}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HuntsView;