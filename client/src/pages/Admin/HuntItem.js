import React from 'react'
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Box } from '@mui/system';
import { useQuery } from '@apollo/client';
import { GET_HUNT_ITEM } from '../../utils/queries';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 400,
    margin: 'auto',
    borderRadius: 12,
    padding: 12,
  },
  media: {
    borderRadius: 6,
  },
}));


const HuntItemAdmin = () => {
  const styles = useStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });


  const { huntItemId } = useParams();
  console.log(huntItemId)
  const { loading, data } = useQuery(GET_HUNT_ITEM, {
    // pass URL parameter
    variables: { huntItemId: huntItemId },
  });

  const huntItem = data?.huntItem || {};
  console.log(huntItem)


  const CardBody = () => {

    return (
      <>
      <p style={{ textAlign: "center" }}><button>Update</button></p>
      <p style={{ textAlign: "left" }}><b>City:</b> {huntItem.city}</p>
      <p style={{ textAlign: "left" }}><b>Hint 1:</b> {huntItem.hint1}</p>
      <p style={{ textAlign: "left" }}><b>Hint 2:</b> {huntItem.hint2}</p>
      <p style={{ textAlign: "left" }}><b>Hint 3:</b> {huntItem.hint3}</p>
      <p style={{ textAlign: "left" }}><b>Location:</b> {huntItem.solutionLocation}</p>
      <p style={{ textAlign: "left" }}><b>Description:</b> {huntItem.solutionDescription}</p>
      <p style={{ textAlign: "left" }}><b>Solution Image:</b> IMAGE HERE</p>
      <p style={{ textAlign: "left" }}><b>Point Value:</b> {huntItem.points}</p></>
      


    )

  }

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
    

      <Card className={cx(styles.root, shadowStyles.root)}>
        <CardContent>
          <TextInfoContent
            classes={textCardContentStyles}
            overline={'Hunt Location'}
            heading={`${huntItem.name}`}
            body={<CardBody />}
          />
        </CardContent>
      </Card>

    </motion.div >
  );
}

export default HuntItemAdmin