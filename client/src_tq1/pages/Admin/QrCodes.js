import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { GET_HUNT } from '../../utils/queries';

const QrCodes = () => {
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
            <Button onClick={()=> navigate('../admin/hunts')} className={buttonStyles}>Hunts</Button>
            <h1>QR Codes for Scavenger Hunt "{hunt.name}"</h1>
            <p>This scavenger hunt has {hunt.huntItems.length} location{hunt.huntItems.length > 1 && "s"}.</p>
            {hunt.huntItems.map((huntItem) => (
                <div key={huntItem.qrId} style={{borderBottom: '5px solid black'}}>
                    <p>Title: {huntItem.name}</p>
                    <p><img src={huntItem.qrCode} alt={huntItem.qrCode} style={{width: '400px', p: '5px', border: '1px solid black'}} /></p>
                    <p>Solution Location: {huntItem.solutionLocation}</p>
                    <p>Solution Description: {huntItem.solutionDescription}</p>
                </div>
            ))}
        </div>
    )
}

export default QrCodes;