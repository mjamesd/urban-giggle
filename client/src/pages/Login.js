// React Imports
import React from 'react';

// Styling
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { motion } from 'framer-motion';
import { Card, CardContent }from '@material-ui/core';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

// Components
import LoginForm from '../components/forms/LoginForm'

// Styles
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

// main export function
const Login = (props) => {

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
            overline={'Welcome Back'}
            heading={'Login'}
            body={
              <LoginForm />
            }
          />
        </CardContent>
      </Card>
    </main>
    </motion.div>
  );
};

export default Login;
