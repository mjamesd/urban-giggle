import React, { useState } from 'react';
import cx from 'clsx';
import { motion } from 'framer-motion';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';
// import { Link } from 'react-router-dom';
// import { useMutation } from '@apollo/client';

import Auth from '../utils/auth';
import SignUpForm from '../components/SignUpForm'

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

const Signup = () => {

  const styles = useStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });

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
              overline={'Welcome'}
              heading={'Signup'}
              body={
                <SignUpForm />
              }
            />
          </CardContent>
        </Card>
      </main>
    </motion.div>
  );
};

export default Signup;
