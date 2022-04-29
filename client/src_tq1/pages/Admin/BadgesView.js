import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { GET_BADGE } from '../../utils/queries';

const BadgesView = () => {
    const navigate = useNavigate();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    const { badgeId } = useParams();
    const { loading, data } = useQuery(GET_BADGE, {
        variables: { badgeId: badgeId }
    });
    const badge = data?.badge || [];

    if (loading) {
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
            <Button onClick={()=> navigate('../admin')} className={buttonStyles}>Admin Panel Home</Button>
            <Button onClick={()=> navigate('../admin/badges')} className={buttonStyles}>Badges</Button>
            <h1>{badge.name}</h1>
            <p>Description: {badge.description}</p>
            <p>Icon: <img src={`/img/badges/${badge.icon}`} alt={badge.icon} style={{ width: '100px', border: '1px solid black' }} /></p>
            <p>Points awarded when completed: {badge.points}</p>
        </div>
    )
}

export default BadgesView;