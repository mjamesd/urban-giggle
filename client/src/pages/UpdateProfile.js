import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
import { Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_USER, QUERY_ME } from '../utils/queries';

// import Auth from '../utils/auth';
import UpdateUserForm from '../components/UpdateUserForm'

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 343,
    margin: 'auto',
    borderRadius: 12,
    padding: 12,
  },
  media: {
    borderRadius: 6,
  },
}));


const UpdateProfile = (props) => {
    const { _id } = useParams();

    const { loading, data } = useQuery(
        _id ? GET_USER : QUERY_ME,
        {
          variables: { _id: _id },
        }
      );

      const user = data?.me || data?.profile || {};
      console.log(user)


  const styles = useStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });

  if (loading) {
    return <h2>LOADING.....</h2>
  }

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 2 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
    >

    <main>
      <Card className={cx(styles.root, shadowStyles.root)}>
        <CardContent>
          <TextInfoContent
            classes={textCardContentStyles}
            overline={`Hello, ${user.username}` }
            heading={'Update Profile'}
            body={
              <UpdateUserForm user={user}/>
            }
          />
        </CardContent>
      </Card>
    </main>
    </motion.div>
  );
};

export default UpdateProfile;
