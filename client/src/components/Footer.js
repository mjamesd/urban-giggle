import React from 'react'
import { Link } from "react-router-dom"
import Button from '@mui/material/Button';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 0,
  },
  image: {
    maxWidth: 100,
    maxHeight: 100,
    alignItems: 'center'
  },
  links: {
    textDecoration: 'none',
    color: '#fd5238',
    padding: 20,
  },
}

const Footer = () => {
  return (
    <footer>
      <div style={styles.container}>
      <Button><Link style={styles.links} to="/contact"><h2>CONTACT</h2></Link></Button>
        <img style={styles.image} src="totalquestlogo.png" alt='logo' />
        <Button><Link style={styles.links} to="/about"><h2>ABOUT US</h2></Link></Button>
      </div>
    </footer>
  )
}

export default Footer