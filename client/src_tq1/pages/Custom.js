// React Imports
import { React } from 'react'

// Apollo Imports and Auth

// Styling
import { motion } from 'framer-motion';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useN04TextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/n04';

// Components

// main export function
const CustomHunt = () => {
  const textCardContentStyles = useN04TextInfoContentStyles();

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 2 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
            <TextInfoContent
              classes={textCardContentStyles}
              overline={'SEATTLE'}
              heading={'CUSTOM HUNT'}
              body={
                <div>
                  <h2>COMING SOON!!</h2>
                </div>
              }
            />
      </motion.div>
    </>
  );
};


export default CustomHunt