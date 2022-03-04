import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import Button from '@material-ui/core/Button';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { GET_HUNT } from '../../utils/queries';
import { UPDATE_HUNT } from '../../utils/mutations';

const HuntsEdit = () => {
    const navigate = useNavigate();
    const { button: buttonStyles } = useBlogTextInfoContentStyles();

    const { huntId } = useParams();
    const { loading, data } = useQuery(GET_HUNT, {
        variables: { huntId: huntId }
    });
    const hunt = data?.hunt || [];


    const editHunt = async () => {
        
    };

    
    if (loading) {
        return <h2>LOADING.....</h2>
    }

    console.log(hunt);
  return (
    <div>HuntsEdit</div>
  )
}

export default HuntsEdit