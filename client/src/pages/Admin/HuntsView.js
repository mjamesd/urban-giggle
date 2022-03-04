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

    console.log(hunt);

    return (
        <div style={{ marginLeft: '2em' }}>
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <Button onClick={()=> navigate('../admin/hunts')} className={buttonStyles}>Hunts</Button>
            <h1>{hunt.name}</h1>
            <p>City: {hunt.city}</p>
            <p>{hunt.description}</p>
            <p>Points awarded when completed: {hunt.points}</p>
            <p>Locations to find in this Scavenger Hunt:</p>
            <ul key={`${hunt._id}-huntItems`}>
                {hunt.huntItems.map(huntItem => (
                    <li key={huntItem._id}>
                        <div>
                            <p>{huntItem._id}</p>
                            <p>{huntItem.name}</p>
                            <p>{huntItem.city}</p>
                            <p>{huntItem.category}</p>
                            <p>Points awarded when found: {huntItem.points}</p>
                            <p>{huntItem.hint1}</p>
                            <p>{huntItem.hint2}</p>
                            <p>{huntItem.hint3}</p>
                            <p>{huntItem.solutionLocation}</p>
                            <p>{huntItem.solutionDescription}</p>
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
                {(hunt.rewards.length === 0) ? 'No rewards.' : ''}
                {hunt.rewards && hunt.rewards.map(badge => (
                    <li key={badge._id}>
                        <div>
                            <p>{badge._id}</p>
                            <p>{badge.name}</p>
                            <p>{badge.icon}</p>
                            <p>{badge.description}</p>
                            <p>Points awarded when receive badge: {badge.points}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HuntsView;